import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Storage "mo:caffeineai-object-storage/Storage";
import CommonTypes "../types/common";
import MarketTypes "../types/marketplace";
import MarketLib "../lib/marketplace";
import Nat "mo:core/Nat";
import Int "mo:core/Int";

// Public API mixin — all marketplace endpoints exposed to the frontend
mixin (
  accessControlState : AccessControl.AccessControlState,
  products : Map.Map<CommonTypes.ProductId, MarketTypes.Product>,
  orders : Map.Map<CommonTypes.OrderId, MarketTypes.Order>,
  downloadTokens : Map.Map<CommonTypes.DownloadTokenId, MarketTypes.DownloadToken>,
  userProfiles : Map.Map<Principal, MarketTypes.UserProfile>,
  auditLogs : List.List<MarketTypes.AdminAuditLog>,
  state : {
    var nextProductId : Nat;
    var nextOrderId : Nat;
    var nextTokenId : Nat;
    var nextLogId : Nat;
    var isSeeded : Bool;
  },
) {

  // ── Internal helpers ───────────────────────────────────────────────────────

  /// Trap if caller is anonymous
  func requireAuthenticated(caller : Principal) {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: must be authenticated");
    };
  };

  /// Trap if caller is not admin
  func requireAdmin(caller : Principal) {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
  };

  /// Trap if caller is blocked
  func requireNotBlocked(caller : Principal) {
    switch (userProfiles.get(caller)) {
      case (?profile) {
        if (profile.isBlocked) {
          Runtime.trap("Forbidden: your account has been blocked");
        };
      };
      case null {};
    };
  };

  // ──────────────────────────────────────────────────────────────────────────
  // PRODUCT — public read
  // ──────────────────────────────────────────────────────────────────────────

  /// List all active products (public, no auth required)
  public query func listProducts() : async [MarketTypes.ProductView] {
    MarketLib.listActiveProducts(products);
  };

  /// Get a single product by id (public)
  public query func getProduct(id : CommonTypes.ProductId) : async ?MarketTypes.ProductView {
    MarketLib.getProduct(products, id);
  };

  // ──────────────────────────────────────────────────────────────────────────
  // PRODUCT — admin write
  // ──────────────────────────────────────────────────────────────────────────

  /// Create a new product (admin only)
  public shared ({ caller }) func adminCreateProduct(
    title : Text,
    description : Text,
    priceUsd : Nat,
    category : CommonTypes.ProductCategory,
    tags : [Text],
    previewImageBlob : ?Storage.ExternalBlob,
    fileStorageBlob : ?Storage.ExternalBlob,
  ) : async CommonTypes.ProductId {
    requireAdmin(caller);
    let id = state.nextProductId;
    state.nextProductId += 1;
    let product = MarketLib.newProduct(id, title, description, priceUsd, category, tags, previewImageBlob, fileStorageBlob);
    products.add(id, product);
    id;
  };

  /// Update product metadata (admin only)
  public shared ({ caller }) func adminUpdateProduct(
    id : CommonTypes.ProductId,
    title : Text,
    description : Text,
    priceUsd : Nat,
    category : CommonTypes.ProductCategory,
    tags : [Text],
    previewImageBlob : ?Storage.ExternalBlob,
    fileStorageBlob : ?Storage.ExternalBlob,
  ) : async () {
    requireAdmin(caller);
    switch (products.get(id)) {
      case null { Runtime.trap("Product not found") };
      case (?p) {
        // Update mutable field in place; rebuild a new record for immutable fields
        let updated : MarketTypes.Product = {
          id = p.id;
          title;
          description;
          priceUsd;
          category;
          tags;
          previewImageBlob;
          fileStorageBlob;
          createdAt = p.createdAt;
          var isActive = p.isActive;
        };
        products.add(id, updated);
      };
    };
  };

  /// Toggle product active/inactive (admin only)
  public shared ({ caller }) func adminSetProductActive(
    id : CommonTypes.ProductId,
    isActive : Bool,
  ) : async () {
    requireAdmin(caller);
    switch (products.get(id)) {
      case null { Runtime.trap("Product not found") };
      case (?p) { p.isActive := isActive };
    };
  };

  // ──────────────────────────────────────────────────────────────────────────
  // USER PROFILE
  // ──────────────────────────────────────────────────────────────────────────

  /// Get the caller's own profile
  public query ({ caller }) func getCallerUserProfile() : async ?MarketTypes.UserProfile {
    requireAuthenticated(caller);
    userProfiles.get(caller);
  };

  /// Save the caller's own profile
  public shared ({ caller }) func saveCallerUserProfile(profile : MarketTypes.UserProfile) : async () {
    requireAuthenticated(caller);
    // Preserve isBlocked flag — callers cannot unblock themselves
    let isBlocked = switch (userProfiles.get(caller)) {
      case (?existing) existing.isBlocked;
      case null false;
    };
    userProfiles.add(caller, { profile with isBlocked });
  };

  /// Get any user profile by principal (admin only)
  public query ({ caller }) func adminGetUserProfile(user : Principal) : async ?MarketTypes.UserProfile {
    requireAdmin(caller);
    userProfiles.get(user);
  };

  /// Block or unblock a user (admin only)
  public shared ({ caller }) func adminSetUserBlocked(user : Principal, blocked : Bool) : async () {
    requireAdmin(caller);
    switch (userProfiles.get(user)) {
      case null {
        // Create a minimal profile entry so the block is persisted
        userProfiles.add(user, { displayName = ""; isBlocked = blocked; createdAt = Time.now() });
      };
      case (?p) {
        userProfiles.add(user, { p with isBlocked = blocked });
      };
    };
  };

  // ──────────────────────────────────────────────────────────────────────────
  // ORDERS — user
  // ──────────────────────────────────────────────────────────────────────────

  /// Place a new order; returns the new order id
  public shared ({ caller }) func placeOrder(
    productId : CommonTypes.ProductId,
    paymentMethod : CommonTypes.PaymentMethod,
    paymentProofBlob : ?Storage.ExternalBlob,
  ) : async CommonTypes.OrderId {
    requireAuthenticated(caller);
    requireNotBlocked(caller);
    // Verify the product exists and is active
    switch (products.get(productId)) {
      case null { Runtime.trap("Product not found") };
      case (?p) {
        if (not p.isActive) { Runtime.trap("Product is not available") };
      };
    };
    let id = state.nextOrderId;
    state.nextOrderId += 1;
    let order = MarketLib.newOrder(id, caller, productId, paymentMethod, paymentProofBlob);
    orders.add(id, order);
    id;
  };

  /// Upload / replace payment proof for an existing pending order
  public shared ({ caller }) func submitPaymentProof(
    orderId : CommonTypes.OrderId,
    paymentProofBlob : Storage.ExternalBlob,
  ) : async () {
    requireAuthenticated(caller);
    requireNotBlocked(caller);
    switch (orders.get(orderId)) {
      case null { Runtime.trap("Order not found") };
      case (?o) {
        if (not Principal.equal(o.buyerPrincipal, caller)) {
          Runtime.trap("Unauthorized: not your order");
        };
        switch (o.status) {
          case (#PendingVerification) {};
          case _ { Runtime.trap("Order is not pending verification") };
        };
        // Replace the order record with updated proof (paymentProofBlob is immutable)
        let updated : MarketTypes.Order = {
          id = o.id;
          buyerPrincipal = o.buyerPrincipal;
          productId = o.productId;
          paymentMethod = o.paymentMethod;
          paymentProofBlob = ?paymentProofBlob;
          var status = o.status;
          var rejectionReason = o.rejectionReason;
          createdAt = o.createdAt;
          var updatedAt = Time.now();
        };
        orders.add(orderId, updated);
      };
    };
  };

  /// List the caller's own orders
  public query ({ caller }) func listMyOrders() : async [MarketTypes.OrderView] {
    requireAuthenticated(caller);
    MarketLib.listOrdersByBuyer(orders, caller);
  };

  /// Get a single order (caller must own it or be admin)
  public query ({ caller }) func getOrder(id : CommonTypes.OrderId) : async ?MarketTypes.OrderView {
    requireAuthenticated(caller);
    switch (orders.get(id)) {
      case null null;
      case (?o) {
        if (Principal.equal(o.buyerPrincipal, caller) or AccessControl.isAdmin(accessControlState, caller)) {
          ?MarketLib.orderToView(o);
        } else {
          Runtime.trap("Unauthorized: not your order");
        };
      };
    };
  };

  // ──────────────────────────────────────────────────────────────────────────
  // ORDERS — admin
  // ──────────────────────────────────────────────────────────────────────────

  /// List all orders (admin only)
  public query ({ caller }) func adminListOrders() : async [MarketTypes.OrderView] {
    requireAdmin(caller);
    MarketLib.listAllOrders(orders);
  };

  /// Approve an order and generate a download token (admin only)
  public shared ({ caller }) func adminApproveOrder(orderId : CommonTypes.OrderId) : async Text {
    requireAdmin(caller);
    switch (orders.get(orderId)) {
      case null { Runtime.trap("Order not found") };
      case (?o) {
        switch (o.status) {
          case (#PendingVerification) {};
          case _ { Runtime.trap("Order is not pending verification") };
        };
        // Generate secure token
        let seed = Int.abs(Time.now()) + state.nextTokenId;
        let tokenText = MarketLib.generateTokenText(seed, orderId);
        let tokenId = state.nextTokenId;
        state.nextTokenId += 1;
        let now = Time.now();
        let expiry : Int = now + 24 * 60 * 60 * 1_000_000_000; // 24 h
        let dlToken : MarketTypes.DownloadToken = {
          id = tokenId;
          orderId;
          token = tokenText;
          expiresAt = expiry;
          var downloadCount = 0;
          var isUsed = false;
        };
        downloadTokens.add(tokenId, dlToken);
        // Update order status
        o.status := #Approved;
        o.updatedAt := now;
        // Audit log
        let logId = state.nextLogId;
        state.nextLogId += 1;
        let entry = MarketLib.newAuditLog(
          logId, caller, "approve_order",
          ?orderId.toText(),
          "Order approved; token " # tokenId.toText() # " issued",
        );
        auditLogs.add(entry);
        tokenText;
      };
    };
  };

  /// Reject an order with a reason (admin only)
  public shared ({ caller }) func adminRejectOrder(
    orderId : CommonTypes.OrderId,
    reason : Text,
  ) : async () {
    requireAdmin(caller);
    switch (orders.get(orderId)) {
      case null { Runtime.trap("Order not found") };
      case (?o) {
        switch (o.status) {
          case (#PendingVerification) {};
          case _ { Runtime.trap("Order is not pending verification") };
        };
        o.status := #Rejected;
        o.rejectionReason := ?reason;
        o.updatedAt := Time.now();
        // Audit log
        let logId = state.nextLogId;
        state.nextLogId += 1;
        let entry = MarketLib.newAuditLog(
          logId, caller, "reject_order",
          ?orderId.toText(),
          "Order rejected: " # reason,
        );
        auditLogs.add(entry);
      };
    };
  };

  // ──────────────────────────────────────────────────────────────────────────
  // DOWNLOAD TOKENS
  // ──────────────────────────────────────────────────────────────────────────

  /// Redeem a download token; returns the product file blob (caller must own the order)
  public shared ({ caller }) func redeemDownloadToken(
    token : Text
  ) : async ?Storage.ExternalBlob {
    requireAuthenticated(caller);
    requireNotBlocked(caller);
    // Find the token
    let found = downloadTokens.values().find(func(t : MarketTypes.DownloadToken) : Bool {
      t.token == token
    });
    switch (found) {
      case null { Runtime.trap("Invalid download token") };
      case (?dt) {
        // Verify caller owns the order
        switch (orders.get(dt.orderId)) {
          case null { Runtime.trap("Order not found") };
          case (?o) {
            if (not Principal.equal(o.buyerPrincipal, caller)) {
              Runtime.trap("Unauthorized: token does not belong to your order");
            };
          };
        };
        // Validate token
        if (not MarketLib.isTokenValid(dt, Time.now())) {
          Runtime.trap("Download token expired or usage limit reached");
        };
        // Consume one download
        dt.downloadCount += 1;
        dt.isUsed := true;
        // Return the file blob from the product
        switch (orders.get(dt.orderId)) {
          case null null;
          case (?o) {
            switch (products.get(o.productId)) {
              case null null;
              case (?p) p.fileStorageBlob;
            };
          };
        };
      };
    };
  };

  /// List download tokens for the caller's orders
  public query ({ caller }) func listMyDownloadTokens() : async [MarketTypes.DownloadTokenView] {
    requireAuthenticated(caller);
    // Collect order ids owned by caller
    let myOrderIds = orders.values()
      .filter(func(o : MarketTypes.Order) : Bool { Principal.equal(o.buyerPrincipal, caller) })
      .map(func(o) { o.id })
      .toArray();
    downloadTokens.values()
      .filter(func(t : MarketTypes.DownloadToken) : Bool {
        myOrderIds.find(func(oid : CommonTypes.OrderId) : Bool { oid == t.orderId }) != null
      })
      .map<MarketTypes.DownloadToken, MarketTypes.DownloadTokenView>(func(t) { MarketLib.tokenToView(t) })
      .toArray();
  };

  // ──────────────────────────────────────────────────────────────────────────
  // ADMIN — analytics / audit
  // ──────────────────────────────────────────────────────────────────────────

  /// List recent admin audit logs (admin only)
  public query ({ caller }) func adminListAuditLogs() : async [MarketTypes.AdminAuditLog] {
    requireAdmin(caller);
    auditLogs.toArray();
  };

  /// Summarised dashboard counts (admin only)
  public query ({ caller }) func adminDashboardStats() : async {
    totalProducts : Nat;
    totalOrders : Nat;
    pendingOrders : Nat;
    approvedOrders : Nat;
    totalUsers : Nat;
  } {
    requireAdmin(caller);
    let totalProducts = products.size();
    let totalOrders = orders.size();
    var pendingOrders = 0;
    var approvedOrders = 0;
    orders.forEach(func(_ : Nat, o : MarketTypes.Order) {
      switch (o.status) {
        case (#PendingVerification) { pendingOrders += 1 };
        case (#Approved) { approvedOrders += 1 };
        case _ {};
      };
    });
    let totalUsers = userProfiles.size();
    { totalProducts; totalOrders; pendingOrders; approvedOrders; totalUsers };
  };

  // ──────────────────────────────────────────────────────────────────────────
  // SEED — one-shot initialiser
  // ──────────────────────────────────────────────────────────────────────────

  /// Populate the catalogue with seed products (idempotent, admin only)
  public shared ({ caller }) func adminSeedProducts() : async () {
    requireAdmin(caller);
    if (state.isSeeded) { return };
    let seeds = MarketLib.seedProducts(state.nextProductId);
    for (p in seeds.values()) {
      products.add(p.id, p);
      state.nextProductId += 1;
    };
    state.isSeeded := true;
  };
};
