import Map "mo:core/Map";
import Time "mo:core/Time";
import Storage "mo:caffeineai-object-storage/Storage";
import CommonTypes "../types/common";
import MarketTypes "../types/marketplace";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

// Domain logic for the marketplace (stateless module — state injected as parameters)
module {

  // 24 hours in nanoseconds
  let _TOKEN_TTL_NS : Nat = 86_400_000_000_000;
  // Download limit per token
  let MAX_DOWNLOADS : Nat = 3;

  // ─── Product helpers ──────────────────────────────────────────────────────

  /// Convert internal Product (with var fields) to shared ProductView
  public func productToView(p : MarketTypes.Product) : MarketTypes.ProductView {
    {
      id = p.id;
      title = p.title;
      description = p.description;
      priceUsd = p.priceUsd;
      category = p.category;
      tags = p.tags;
      previewImageBlob = p.previewImageBlob;
      fileStorageBlob = p.fileStorageBlob;
      createdAt = p.createdAt;
      isActive = p.isActive;
    };
  };

  /// Return all active products as views
  public func listActiveProducts(
    products : Map.Map<CommonTypes.ProductId, MarketTypes.Product>
  ) : [MarketTypes.ProductView] {
    products.values()
      .filter(func(p : MarketTypes.Product) : Bool { p.isActive })
      .map<MarketTypes.Product, MarketTypes.ProductView>(func(p) { productToView(p) })
      .toArray();
  };

  /// Return all products (admin use)
  public func listAllProducts(
    products : Map.Map<CommonTypes.ProductId, MarketTypes.Product>
  ) : [MarketTypes.ProductView] {
    products.values()
      .map<MarketTypes.Product, MarketTypes.ProductView>(func(p) { productToView(p) })
      .toArray();
  };

  /// Get a single product by id
  public func getProduct(
    products : Map.Map<CommonTypes.ProductId, MarketTypes.Product>,
    id : CommonTypes.ProductId,
  ) : ?MarketTypes.ProductView {
    switch (products.get(id)) {
      case (?p) ?productToView(p);
      case null null;
    };
  };

  /// Create a new product record (does NOT insert into map)
  public func newProduct(
    id : CommonTypes.ProductId,
    title : Text,
    description : Text,
    priceUsd : Nat,
    category : CommonTypes.ProductCategory,
    tags : [Text],
    previewImageBlob : ?Storage.ExternalBlob,
    fileStorageBlob : ?Storage.ExternalBlob,
  ) : MarketTypes.Product {
    {
      id;
      title;
      description;
      priceUsd;
      category;
      tags;
      previewImageBlob;
      fileStorageBlob;
      createdAt = Time.now();
      var isActive = true;
    };
  };

  // ─── Order helpers ────────────────────────────────────────────────────────

  /// Convert internal Order to shared OrderView
  public func orderToView(o : MarketTypes.Order) : MarketTypes.OrderView {
    {
      id = o.id;
      buyerPrincipal = o.buyerPrincipal;
      productId = o.productId;
      paymentMethod = o.paymentMethod;
      paymentProofBlob = o.paymentProofBlob;
      status = o.status;
      rejectionReason = o.rejectionReason;
      createdAt = o.createdAt;
      updatedAt = o.updatedAt;
    };
  };

  /// Create a new order record
  public func newOrder(
    id : CommonTypes.OrderId,
    buyerPrincipal : Principal,
    productId : CommonTypes.ProductId,
    paymentMethod : CommonTypes.PaymentMethod,
    paymentProofBlob : ?Storage.ExternalBlob,
  ) : MarketTypes.Order {
    let now = Time.now();
    {
      id;
      buyerPrincipal;
      productId;
      paymentMethod;
      paymentProofBlob;
      var status = #PendingVerification;
      var rejectionReason = null;
      createdAt = now;
      var updatedAt = now;
    };
  };

  /// List all orders for a given buyer
  public func listOrdersByBuyer(
    orders : Map.Map<CommonTypes.OrderId, MarketTypes.Order>,
    buyer : Principal,
  ) : [MarketTypes.OrderView] {
    orders.values()
      .filter(func(o : MarketTypes.Order) : Bool {
        Principal.equal(o.buyerPrincipal, buyer)
      })
      .map<MarketTypes.Order, MarketTypes.OrderView>(func(o) { orderToView(o) })
      .toArray();
  };

  /// List all orders (admin use)
  public func listAllOrders(
    orders : Map.Map<CommonTypes.OrderId, MarketTypes.Order>
  ) : [MarketTypes.OrderView] {
    orders.values()
      .map<MarketTypes.Order, MarketTypes.OrderView>(func(o) { orderToView(o) })
      .toArray();
  };

  // ─── Download Token helpers ───────────────────────────────────────────────

  /// Convert internal DownloadToken to shared DownloadTokenView
  public func tokenToView(t : MarketTypes.DownloadToken) : MarketTypes.DownloadTokenView {
    {
      id = t.id;
      orderId = t.orderId;
      token = t.token;
      expiresAt = t.expiresAt;
      downloadCount = t.downloadCount;
      isUsed = t.isUsed;
    };
  };

  /// Generate a pseudo-random token string from a seed (Time.now + orderId encoded as hex-like text)
  public func generateTokenText(seed : Nat, orderId : CommonTypes.OrderId) : Text {
    // Combine seed and orderId into a unique token string
    let combined = seed + orderId * 1_000_000_007;
    "tok_" # combined.toText() # "_" # orderId.toText();
  };

  /// Check if a download token is still valid (not expired and under download limit)
  public func isTokenValid(token : MarketTypes.DownloadToken, now : Time.Time) : Bool {
    let notExpired = token.expiresAt > now;
    let underLimit = token.downloadCount < MAX_DOWNLOADS;
    notExpired and underLimit;
  };

  // ─── Seed data ────────────────────────────────────────────────────────────

  /// Return 8 seed products for initial catalogue population
  public func seedProducts(startId : CommonTypes.ProductId) : [MarketTypes.Product] {
    let now = Time.now();
    [
      {
        id = startId + 0;
        title = "E-Commerce Dashboard Template";
        description = "A complete React + TypeScript dashboard template for e-commerce platforms. Includes charts, tables, order management, and analytics views. Ready for production.";
        priceUsd = 2999; // $29.99
        category = #Template;
        tags = ["react", "typescript", "dashboard", "ecommerce"];
        previewImageBlob = null;
        fileStorageBlob = null;
        createdAt = now;
        var isActive = true;
      },
      {
        id = startId + 1;
        title = "React Native Starter Kit";
        description = "Full-featured React Native boilerplate with navigation, authentication, API integration, push notifications, and dark/light mode. Works on iOS and Android.";
        priceUsd = 4999; // $49.99
        category = #MobileApp;
        tags = ["react-native", "mobile", "ios", "android", "starter"];
        previewImageBlob = null;
        fileStorageBlob = null;
        createdAt = now;
        var isActive = true;
      },
      {
        id = startId + 2;
        title = "Laravel REST API Boilerplate";
        description = "Production-ready Laravel REST API with JWT authentication, role-based access control, rate limiting, Swagger docs, and comprehensive test suite.";
        priceUsd = 3499; // $34.99
        category = #WebApp;
        tags = ["laravel", "php", "api", "rest", "jwt"];
        previewImageBlob = null;
        fileStorageBlob = null;
        createdAt = now;
        var isActive = true;
      },
      {
        id = startId + 3;
        title = "Flutter Food Delivery App";
        description = "Complete Flutter food delivery application with customer app, admin panel, real-time order tracking, payment integration, and Firebase backend.";
        priceUsd = 14999; // $149.99
        category = #MobileApp;
        tags = ["flutter", "dart", "food", "delivery", "firebase"];
        previewImageBlob = null;
        fileStorageBlob = null;
        createdAt = now;
        var isActive = true;
      },
      {
        id = startId + 4;
        title = "Python Web Scraper Pro";
        description = "Advanced Python web scraping framework with rotating proxies, headless browser support, anti-detection measures, and data export to CSV/JSON/Excel.";
        priceUsd = 1999; // $19.99
        category = #Script;
        tags = ["python", "scraper", "automation", "data"];
        previewImageBlob = null;
        fileStorageBlob = null;
        createdAt = now;
        var isActive = true;
      },
      {
        id = startId + 5;
        title = "Vue.js Admin Panel";
        description = "Modern Vue 3 admin panel with Pinia state management, role-based permissions, dynamic menus, dark mode, and 40+ pre-built pages.";
        priceUsd = 3999; // $39.99
        category = #WebApp;
        tags = ["vue", "vuejs", "admin", "dashboard"];
        previewImageBlob = null;
        fileStorageBlob = null;
        createdAt = now;
        var isActive = true;
      },
      {
        id = startId + 6;
        title = "Next.js Blog Template";
        description = "SEO-optimised Next.js 14 blog template with MDX support, tag system, search, RSS feed, dark mode, and Vercel-ready deployment configuration.";
        priceUsd = 1499; // $14.99
        category = #Template;
        tags = ["nextjs", "blog", "seo", "mdx", "vercel"];
        previewImageBlob = null;
        fileStorageBlob = null;
        createdAt = now;
        var isActive = true;
      },
      {
        id = startId + 7;
        title = "Node.js Auth Microservice";
        description = "Standalone Node.js authentication microservice with JWT, refresh tokens, OAuth2 (Google/GitHub), email verification, 2FA support, and Docker compose setup.";
        priceUsd = 2499; // $24.99
        category = #Plugin;
        tags = ["nodejs", "auth", "microservice", "jwt", "oauth"];
        previewImageBlob = null;
        fileStorageBlob = null;
        createdAt = now;
        var isActive = true;
      },
    ];
  };

  // ─── Audit log helpers ────────────────────────────────────────────────────

  /// Create a new admin audit log entry
  public func newAuditLog(
    id : CommonTypes.AuditLogId,
    adminPrincipal : Principal,
    action : Text,
    targetId : ?Text,
    details : Text,
  ) : MarketTypes.AdminAuditLog {
    {
      id;
      adminPrincipal;
      action;
      targetId;
      details;
      timestamp = Time.now();
    };
  };
};
