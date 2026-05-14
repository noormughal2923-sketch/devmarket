import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface UserProfile {
    displayName: string;
    isBlocked: boolean;
    createdAt: Timestamp;
}
export interface AdminAuditLog {
    id: AuditLogId;
    action: string;
    adminPrincipal: Principal;
    timestamp: Timestamp;
    details: string;
    targetId?: string;
}
export type Timestamp = bigint;
export type AuditLogId = bigint;
export type DownloadTokenId = bigint;
export interface ProductView {
    id: ProductId;
    title: string;
    createdAt: Timestamp;
    tags: Array<string>;
    description: string;
    previewImageBlob?: ExternalBlob;
    isActive: boolean;
    category: ProductCategory;
    fileStorageBlob?: ExternalBlob;
    priceUsd: bigint;
}
export interface DownloadTokenView {
    id: DownloadTokenId;
    token: string;
    expiresAt: Timestamp;
    isUsed: boolean;
    orderId: OrderId;
    downloadCount: bigint;
}
export type ProductId = bigint;
export type OrderId = bigint;
export interface OrderView {
    id: OrderId;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    createdAt: Timestamp;
    rejectionReason?: string;
    productId: ProductId;
    paymentProofBlob?: ExternalBlob;
    updatedAt: Timestamp;
    buyerPrincipal: Principal;
}
export enum OrderStatus {
    PendingVerification = "PendingVerification",
    Approved = "Approved",
    Rejected = "Rejected"
}
export enum PaymentMethod {
    ABL = "ABL",
    JazzCash = "JazzCash"
}
export enum ProductCategory {
    WebApp = "WebApp",
    Plugin = "Plugin",
    Script = "Script",
    Template = "Template",
    MobileApp = "MobileApp"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    adminApproveOrder(orderId: OrderId): Promise<string>;
    adminCreateProduct(title: string, description: string, priceUsd: bigint, category: ProductCategory, tags: Array<string>, previewImageBlob: ExternalBlob | null, fileStorageBlob: ExternalBlob | null): Promise<ProductId>;
    adminDashboardStats(): Promise<{
        totalProducts: bigint;
        totalOrders: bigint;
        pendingOrders: bigint;
        approvedOrders: bigint;
        totalUsers: bigint;
    }>;
    adminGetUserProfile(user: Principal): Promise<UserProfile | null>;
    adminListAuditLogs(): Promise<Array<AdminAuditLog>>;
    adminListOrders(): Promise<Array<OrderView>>;
    adminRejectOrder(orderId: OrderId, reason: string): Promise<void>;
    adminSeedProducts(): Promise<void>;
    adminSetProductActive(id: ProductId, isActive: boolean): Promise<void>;
    adminSetUserBlocked(user: Principal, blocked: boolean): Promise<void>;
    adminUpdateProduct(id: ProductId, title: string, description: string, priceUsd: bigint, category: ProductCategory, tags: Array<string>, previewImageBlob: ExternalBlob | null, fileStorageBlob: ExternalBlob | null): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getOrder(id: OrderId): Promise<OrderView | null>;
    getProduct(id: ProductId): Promise<ProductView | null>;
    isCallerAdmin(): Promise<boolean>;
    listMyDownloadTokens(): Promise<Array<DownloadTokenView>>;
    listMyOrders(): Promise<Array<OrderView>>;
    listProducts(): Promise<Array<ProductView>>;
    placeOrder(productId: ProductId, paymentMethod: PaymentMethod, paymentProofBlob: ExternalBlob | null): Promise<OrderId>;
    redeemDownloadToken(token: string): Promise<ExternalBlob | null>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitPaymentProof(orderId: OrderId, paymentProofBlob: ExternalBlob): Promise<void>;
}
