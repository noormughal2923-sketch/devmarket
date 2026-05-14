import type {
  backendInterface,
  _ImmutableObjectStorageCreateCertificateResult,
  _ImmutableObjectStorageRefillInformation,
  _ImmutableObjectStorageRefillResult,
} from "../backend";
import {
  OrderStatus,
  PaymentMethod,
  ProductCategory,
  UserRole,
  ExternalBlob,
} from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

export const mockBackend: backendInterface = {
  _immutableObjectStorageBlobsAreLive: async (_hashes: Array<Uint8Array>) => [] as boolean[],

  _immutableObjectStorageBlobsToDelete: async () => [] as Uint8Array[],

  _immutableObjectStorageConfirmBlobDeletion: async (_blobs: Array<Uint8Array>) => undefined,

  _immutableObjectStorageCreateCertificate: async (_blobHash: string): Promise<_ImmutableObjectStorageCreateCertificateResult> => ({
    method: "POST",
    blob_hash: _blobHash,
  }),

  _immutableObjectStorageRefillCashier: async (_info: _ImmutableObjectStorageRefillInformation | null): Promise<_ImmutableObjectStorageRefillResult> => ({}),

  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,

  _initializeAccessControl: async () => undefined,

  adminApproveOrder: async (_orderId) => "download-token-abc123",

  adminCreateProduct: async () => BigInt(1),

  adminDashboardStats: async () => ({
    totalProducts: BigInt(12),
    totalOrders: BigInt(47),
    pendingOrders: BigInt(5),
    approvedOrders: BigInt(38),
    totalUsers: BigInt(130),
  }),

  adminGetUserProfile: async () => ({
    displayName: "Admin User",
    isBlocked: false,
    createdAt: now,
  }),

  adminListAuditLogs: async () => [
    {
      id: BigInt(1),
      action: "approve_order",
      adminPrincipal: { toText: () => "aaaaa-aa" } as any,
      timestamp: now,
      details: "Order #3 approved",
      targetId: "3",
    },
    {
      id: BigInt(2),
      action: "create_product",
      adminPrincipal: { toText: () => "aaaaa-aa" } as any,
      timestamp: now - BigInt(3600_000_000_000),
      details: "Created product: React Dashboard Kit",
      targetId: "5",
    },
  ],

  adminListOrders: async () => [
    {
      id: BigInt(1),
      status: OrderStatus.PendingVerification,
      paymentMethod: PaymentMethod.JazzCash,
      createdAt: now - BigInt(7200_000_000_000),
      productId: BigInt(1),
      updatedAt: now - BigInt(3600_000_000_000),
      buyerPrincipal: { toText: () => "user1-principal" } as any,
    },
    {
      id: BigInt(2),
      status: OrderStatus.Approved,
      paymentMethod: PaymentMethod.ABL,
      createdAt: now - BigInt(86400_000_000_000),
      productId: BigInt(2),
      updatedAt: now - BigInt(43200_000_000_000),
      buyerPrincipal: { toText: () => "user2-principal" } as any,
    },
  ],

  adminRejectOrder: async () => undefined,

  adminSeedProducts: async () => undefined,

  adminSetProductActive: async () => undefined,

  adminSetUserBlocked: async () => undefined,

  adminUpdateProduct: async () => undefined,

  assignCallerUserRole: async () => undefined,

  getCallerUserProfile: async () => ({
    displayName: "Ali Hassan",
    isBlocked: false,
    createdAt: now,
  }),

  getCallerUserRole: async () => UserRole.user,

  getOrder: async (id) => ({
    id,
    status: OrderStatus.PendingVerification,
    paymentMethod: PaymentMethod.JazzCash,
    createdAt: now,
    productId: BigInt(1),
    updatedAt: now,
    buyerPrincipal: { toText: () => "user1-principal" } as any,
  }),

  getProduct: async (id) => ({
    id,
    title: "React Admin Dashboard Pro",
    createdAt: now,
    tags: ["react", "typescript", "dashboard"],
    description: "A fully-featured React admin dashboard with charts, tables, and authentication.",
    isActive: true,
    category: ProductCategory.WebApp,
    priceUsd: BigInt(29),
  }),

  isCallerAdmin: async () => false,

  listMyDownloadTokens: async () => [
    {
      id: BigInt(1),
      token: "tok_abc123xyz",
      expiresAt: now + BigInt(86400_000_000_000),
      isUsed: false,
      orderId: BigInt(2),
      downloadCount: BigInt(0),
    },
  ],

  listMyOrders: async () => [
    {
      id: BigInt(2),
      status: OrderStatus.Approved,
      paymentMethod: PaymentMethod.ABL,
      createdAt: now - BigInt(86400_000_000_000),
      productId: BigInt(2),
      updatedAt: now - BigInt(43200_000_000_000),
      buyerPrincipal: { toText: () => "user1-principal" } as any,
    },
  ],

  listProducts: async () => [
    {
      id: BigInt(1),
      title: "React Admin Dashboard Pro",
      createdAt: now,
      tags: ["react", "typescript", "tailwind"],
      description: "A fully-featured React admin dashboard with analytics, user management, and dark mode.",
      isActive: true,
      category: ProductCategory.WebApp,
      priceUsd: BigInt(29),
    },
    {
      id: BigInt(2),
      title: "Next.js E-Commerce Starter",
      createdAt: now - BigInt(86400_000_000_000),
      tags: ["nextjs", "stripe", "prisma"],
      description: "Production-ready e-commerce template with Stripe integration, Prisma ORM, and full-stack auth.",
      isActive: true,
      category: ProductCategory.WebApp,
      priceUsd: BigInt(49),
    },
    {
      id: BigInt(3),
      title: "Python Web Scraper Toolkit",
      createdAt: now - BigInt(172800_000_000_000),
      tags: ["python", "scraping", "automation"],
      description: "Advanced web scraping toolkit with proxy rotation, anti-detection, and data export features.",
      isActive: true,
      category: ProductCategory.Script,
      priceUsd: BigInt(19),
    },
    {
      id: BigInt(4),
      title: "Mobile UI Kit – Flutter",
      createdAt: now - BigInt(259200_000_000_000),
      tags: ["flutter", "mobile", "ui-kit"],
      description: "200+ premium Flutter components with dark/light themes, animations, and responsive layouts.",
      isActive: true,
      category: ProductCategory.MobileApp,
      priceUsd: BigInt(39),
    },
    {
      id: BigInt(5),
      title: "WordPress Portfolio Plugin",
      createdAt: now - BigInt(345600_000_000_000),
      tags: ["wordpress", "plugin", "portfolio"],
      description: "Drag-and-drop portfolio builder plugin with 15+ grid layouts and smooth animations.",
      isActive: true,
      category: ProductCategory.Plugin,
      priceUsd: BigInt(15),
    },
    {
      id: BigInt(6),
      title: "Tailwind Landing Page Template",
      createdAt: now - BigInt(432000_000_000_000),
      tags: ["tailwind", "landing-page", "template"],
      description: "Stunning SaaS landing page template with hero sections, pricing tables, and CTA blocks.",
      isActive: true,
      category: ProductCategory.Template,
      priceUsd: BigInt(12),
    },
  ],

  placeOrder: async () => BigInt(3),

  redeemDownloadToken: async () => null,

  saveCallerUserProfile: async () => undefined,

  submitPaymentProof: async () => undefined,
};
