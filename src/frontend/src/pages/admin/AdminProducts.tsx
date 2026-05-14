import type { ExternalBlob } from "@/backend";
import { AdminLayout } from "@/components/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useAdminCreateProduct,
  useAdminSetProductActive,
  useListProducts,
} from "@/hooks/useBackend";
import { ProductCategory } from "@/types/marketplace";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const CATEGORY_OPTIONS: { label: string; value: ProductCategory }[] = [
  { label: "Web App", value: ProductCategory.WebApp },
  { label: "Plugin", value: ProductCategory.Plugin },
  { label: "Script", value: ProductCategory.Script },
  { label: "Template", value: ProductCategory.Template },
  { label: "Mobile App", value: ProductCategory.MobileApp },
];

interface ProductFormState {
  title: string;
  description: string;
  price: string;
  category: ProductCategory;
  tags: string;
  previewFile: File | null;
  productFile: File | null;
}

const DEFAULT_FORM: ProductFormState = {
  title: "",
  description: "",
  price: "",
  category: ProductCategory.WebApp,
  tags: "",
  previewFile: null,
  productFile: null,
};

async function fileToExternalBlob(file: File): Promise<ExternalBlob> {
  const { ExternalBlob: EB } = await import("@/backend");
  const buf = await file.arrayBuffer();
  return EB.fromBytes(new Uint8Array(buf));
}

export default function AdminProducts() {
  const { data: products, isLoading } = useListProducts();
  const setActive = useAdminSetProductActive();
  const createProduct = useAdminCreateProduct();

  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState<ProductFormState>(DEFAULT_FORM);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const previewInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function setField<K extends keyof ProductFormState>(
    key: K,
    value: ProductFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const priceFloat = Number.parseFloat(form.price);
    if (!form.title.trim() || Number.isNaN(priceFloat)) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const priceUsd = BigInt(Math.round(priceFloat * 100));
    setUploading(true);
    try {
      let previewBlob: ExternalBlob | null = null;
      let productBlob: ExternalBlob | null = null;
      if (form.previewFile) {
        const raw = await fileToExternalBlob(form.previewFile);
        previewBlob = raw.withUploadProgress((p) => setUploadProgress(p));
      }
      if (form.productFile) {
        const raw = await fileToExternalBlob(form.productFile);
        productBlob = raw.withUploadProgress((p) => setUploadProgress(p));
      }
      const tags = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      await createProduct.mutateAsync({
        title: form.title.trim(),
        description: form.description.trim(),
        priceUsd,
        category: form.category,
        tags,
        previewImageBlob: previewBlob,
        fileStorageBlob: productBlob,
      });
      toast.success("Product created successfully!");
      setCreateOpen(false);
      setForm(DEFAULT_FORM);
      setUploadProgress(0);
    } catch (err) {
      toast.error(
        `Failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleToggleActive(id: bigint, current: boolean) {
    try {
      await setActive.mutateAsync({ id, isActive: !current });
      toast.success(`Product ${!current ? "activated" : "deactivated"}.`);
    } catch (err) {
      toast.error(
        `Failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-5 fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Products
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage your digital product catalog
            </p>
          </div>
          <Button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="gap-2"
            data-ocid="admin.create_product_button"
          >
            <Plus className="w-4 h-4" />
            Create Product
          </Button>
        </div>

        {/* Table */}
        <Card data-ocid="admin.products_table">
          <CardContent className="p-0">
            {isLoading ? (
              <div
                className="p-6 space-y-3"
                data-ocid="admin.products.loading_state"
              >
                {[1, 2, 3].map((n) => (
                  <Skeleton key={n} className="h-12 w-full" />
                ))}
              </div>
            ) : (products ?? []).length === 0 ? (
              <div
                className="py-12 text-center text-muted-foreground text-sm"
                data-ocid="admin.products.empty_state"
              >
                No products yet. Click \"Create Product\" to add your first one.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      {["ID", "Title", "Category", "Price (USD)", "Active"].map(
                        (h) => (
                          <th
                            key={h}
                            className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide"
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {(products ?? []).map((p, i) => (
                      <tr
                        key={p.id.toString()}
                        className="border-b border-border/60 last:border-0 hover:bg-muted/20 transition-colors"
                        data-ocid={`admin.product.item.${i + 1}`}
                      >
                        <td className="px-5 py-3 font-mono text-xs text-muted-foreground">
                          #{p.id.toString()}
                        </td>
                        <td className="px-5 py-3 font-medium text-foreground max-w-[240px] truncate">
                          {p.title}
                        </td>
                        <td className="px-5 py-3">
                          <Badge variant="secondary" className="text-xs">
                            {p.category}
                          </Badge>
                        </td>
                        <td className="px-5 py-3 text-right font-mono text-foreground">
                          ${(Number(p.priceUsd) / 100).toFixed(2)}
                        </td>
                        <td className="px-5 py-3">
                          <Switch
                            checked={p.isActive}
                            onCheckedChange={() =>
                              handleToggleActive(p.id, p.isActive)
                            }
                            disabled={setActive.isPending}
                            aria-label={`Toggle ${p.title} active`}
                            data-ocid={`admin.product.active_toggle.${i + 1}`}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create Product Modal */}
      <Dialog
        open={createOpen}
        onOpenChange={(v) => !v && setCreateOpen(false)}
      >
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="admin.create_product_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              Create New Product
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="p-title">Title *</Label>
              <Input
                id="p-title"
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                placeholder="e.g. SaaS Boilerplate Kit"
                required
                data-ocid="admin.create_product_dialog.title_input"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="p-desc">Description</Label>
              <Textarea
                id="p-desc"
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                placeholder="Describe the product\u2026"
                rows={3}
                data-ocid="admin.create_product_dialog.description_textarea"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="p-price">Price (USD) *</Label>
                <Input
                  id="p-price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.price}
                  onChange={(e) => setField("price", e.target.value)}
                  placeholder="29.99"
                  required
                  data-ocid="admin.create_product_dialog.price_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) =>
                    setField("category", v as ProductCategory)
                  }
                >
                  <SelectTrigger data-ocid="admin.create_product_dialog.category_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="p-tags">Tags (comma-separated)</Label>
              <Input
                id="p-tags"
                value={form.tags}
                onChange={(e) => setField("tags", e.target.value)}
                placeholder="react, typescript, nextjs"
                data-ocid="admin.create_product_dialog.tags_input"
              />
            </div>

            {/* Preview Image Upload */}
            <div className="space-y-1.5">
              <Label>Preview Image</Label>
              <button
                type="button"
                onClick={() => previewInputRef.current?.click()}
                className="w-full border-2 border-dashed border-border rounded-lg py-4 flex flex-col items-center gap-2 text-muted-foreground hover:border-primary/40 hover:bg-muted/30 transition-smooth cursor-pointer"
                data-ocid="admin.create_product_dialog.preview_upload_button"
              >
                <Upload className="w-5 h-5" />
                <span className="text-sm">
                  {form.previewFile
                    ? form.previewFile.name
                    : "Click to upload preview image"}
                </span>
              </button>
              <input
                ref={previewInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setField("previewFile", e.target.files?.[0] ?? null)
                }
              />
            </div>

            {/* Product File Upload */}
            <div className="space-y-1.5">
              <Label>Product File (ZIP / Archive)</Label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-border rounded-lg py-4 flex flex-col items-center gap-2 text-muted-foreground hover:border-primary/40 hover:bg-muted/30 transition-smooth cursor-pointer"
                data-ocid="admin.create_product_dialog.file_upload_button"
              >
                <Upload className="w-5 h-5" />
                <span className="text-sm">
                  {form.productFile
                    ? form.productFile.name
                    : "Click to upload product file"}
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) =>
                  setField("productFile", e.target.files?.[0] ?? null)
                }
              />
            </div>

            {uploading && uploadProgress > 0 && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Uploading\u2026</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateOpen(false)}
                data-ocid="admin.create_product_dialog.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={uploading || createProduct.isPending}
                data-ocid="admin.create_product_dialog.submit_button"
              >
                {uploading ? "Creating\u2026" : "Create Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
