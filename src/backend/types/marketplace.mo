import Storage "mo:caffeineai-object-storage/Storage";
import Types "common";

// Domain-specific type definitions for the marketplace
module {

  // ─── Product ───────────────────────────────────────────────────────────────
  public type Product = {
    id : Types.ProductId;
    title : Text;
    description : Text;
    priceUsd : Nat; // price in USD cents (e.g. 1999 = $19.99)
    category : Types.ProductCategory;
    tags : [Text];
    previewImageBlob : ?Storage.ExternalBlob;
    fileStorageBlob : ?Storage.ExternalBlob;
    createdAt : Types.Timestamp;
    var isActive : Bool;
  };

  // Public/shared view — no mutable fields, safe to return across the API
  public type ProductView = {
    id : Types.ProductId;
    title : Text;
    description : Text;
    priceUsd : Nat;
    category : Types.ProductCategory;
    tags : [Text];
    previewImageBlob : ?Storage.ExternalBlob;
    fileStorageBlob : ?Storage.ExternalBlob;
    createdAt : Types.Timestamp;
    isActive : Bool;
  };

  // ─── User Profile ─────────────────────────────────────────────────────────
  // Used with caffeineai-authorization; extended with marketplace fields
  public type UserProfile = {
    displayName : Text;
    isBlocked : Bool;
    createdAt : Types.Timestamp;
  };

  // ─── Order ────────────────────────────────────────────────────────────────
  public type Order = {
    id : Types.OrderId;
    buyerPrincipal : Principal;
    productId : Types.ProductId;
    paymentMethod : Types.PaymentMethod;
    paymentProofBlob : ?Storage.ExternalBlob;
    var status : Types.OrderStatus;
    var rejectionReason : ?Text;
    createdAt : Types.Timestamp;
    var updatedAt : Types.Timestamp;
  };

  public type OrderView = {
    id : Types.OrderId;
    buyerPrincipal : Principal;
    productId : Types.ProductId;
    paymentMethod : Types.PaymentMethod;
    paymentProofBlob : ?Storage.ExternalBlob;
    status : Types.OrderStatus;
    rejectionReason : ?Text;
    createdAt : Types.Timestamp;
    updatedAt : Types.Timestamp;
  };

  // ─── Download Token ───────────────────────────────────────────────────────
  public type DownloadToken = {
    id : Types.DownloadTokenId;
    orderId : Types.OrderId;
    token : Text; // random text; validated server-side
    expiresAt : Types.Timestamp; // 24 h from creation
    var downloadCount : Nat;
    var isUsed : Bool; // true after first successful download
  };

  public type DownloadTokenView = {
    id : Types.DownloadTokenId;
    orderId : Types.OrderId;
    token : Text;
    expiresAt : Types.Timestamp;
    downloadCount : Nat;
    isUsed : Bool;
  };

  // ─── Admin Audit Log ──────────────────────────────────────────────────────
  public type AdminAuditLog = {
    id : Types.AuditLogId;
    adminPrincipal : Principal;
    action : Text;
    targetId : ?Text; // stringified entity id
    details : Text;
    timestamp : Types.Timestamp;
  };
};
