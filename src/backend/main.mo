import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import CommonTypes "types/common";
import MarketTypes "types/marketplace";
import MarketMixin "mixins/marketplace-api";

// Composition root — owns all stable state, includes all mixins, NO business logic
actor {
  // ── Authorization (roles) ──────────────────────────────────────────────────
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ── Object storage infrastructure ─────────────────────────────────────────
  include MixinObjectStorage();

  // ── Marketplace state ──────────────────────────────────────────────────────
  let products = Map.empty<CommonTypes.ProductId, MarketTypes.Product>();
  let orders = Map.empty<CommonTypes.OrderId, MarketTypes.Order>();
  let downloadTokens = Map.empty<CommonTypes.DownloadTokenId, MarketTypes.DownloadToken>();
  let userProfiles = Map.empty<Principal, MarketTypes.UserProfile>();
  let auditLogs = List.empty<MarketTypes.AdminAuditLog>();

  // Mutable counters and flags wrapped in a record so mixins share the reference
  let state = {
    var nextProductId : Nat = 0;
    var nextOrderId : Nat = 0;
    var nextTokenId : Nat = 0;
    var nextLogId : Nat = 0;
    var isSeeded : Bool = false;
  };

  // ── Marketplace public API ─────────────────────────────────────────────────
  include MarketMixin(
    accessControlState,
    products,
    orders,
    downloadTokens,
    userProfiles,
    auditLogs,
    state,
  );
};
