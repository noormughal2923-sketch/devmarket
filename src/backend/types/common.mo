// Cross-cutting types shared across all marketplace domains
module {
  public type Timestamp = Int; // nanoseconds from Time.now()
  public type OrderId = Nat;
  public type ProductId = Nat;
  public type DownloadTokenId = Nat;
  public type AuditLogId = Nat;

  // Payment methods available for manual verification
  public type PaymentMethod = {
    #JazzCash;
    #ABL; // Allied Bank Limited
  };

  // Order lifecycle status
  public type OrderStatus = {
    #PendingVerification;
    #Approved;
    #Rejected;
  };

  // Product category taxonomy
  public type ProductCategory = {
    #WebApp;
    #MobileApp;
    #Script;
    #Template;
    #Plugin;
  };
};
