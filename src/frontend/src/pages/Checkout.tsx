import { ExternalBlob } from "@/backend";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { usePlaceOrder } from "@/hooks/useBackend";
import { PaymentMethod } from "@/types/marketplace";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Banknote,
  CheckCircle2,
  ImagePlus,
  Loader2,
  Package,
  ShieldCheck,
  Smartphone,
  Upload,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

function formatUsd(cents: bigint): string {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}

const PAYMENT_DETAILS = {
  jazzcash: {
    label: "JazzCash",
    icon: Smartphone,
    fields: [
      { label: "Mobile Account", value: "0300-1234567" },
      { label: "Account Name", value: "DevMarket Official" },
    ],
    instruction:
      "Send the exact amount to this JazzCash number and upload the transaction screenshot below.",
  },
  abl: {
    label: "Allied Bank (ABL)",
    icon: Banknote,
    fields: [
      { label: "Account Number", value: "01234-56789012-3" },
      { label: "Account Title", value: "DevMarket Pvt. Ltd." },
      { label: "Branch Code", value: "0142" },
      { label: "IBAN", value: "PK72ABPA0010001234567890" },
    ],
    instruction:
      "Transfer the exact amount to this Allied Bank account and upload the transfer receipt below.",
  },
} as const;

type PaymentKey = keyof typeof PAYMENT_DETAILS;

export default function Checkout() {
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const placeOrder = usePlaceOrder();

  const [paymentMethod, setPaymentMethod] = useState<PaymentKey | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      setProofFile(file);
      setSubmitError(null);
      if (file) {
        setProofPreview(URL.createObjectURL(file));
      } else {
        setProofPreview(null);
      }
    },
    [],
  );

  const handleDrop = useCallback((e: React.DragEvent<Element>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] ?? null;
    if (file?.type.startsWith("image/")) {
      setProofFile(file);
      setSubmitError(null);
      setProofPreview(URL.createObjectURL(file));
    }
  }, []);

  const handleSubmit = async () => {
    if (!paymentMethod) {
      setSubmitError("Please select a payment method.");
      return;
    }
    if (!proofFile) {
      setSubmitError("Please upload your payment proof screenshot.");
      return;
    }
    if (items.length === 0) {
      setSubmitError("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setUploadProgress(0);

    try {
      const bytes = new Uint8Array(await proofFile.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });

      const backendPaymentMethod: PaymentMethod =
        paymentMethod === "jazzcash"
          ? PaymentMethod.JazzCash
          : PaymentMethod.ABL;

      for (const item of items) {
        await placeOrder.mutateAsync({
          productId: item.productId,
          paymentMethod: backendPaymentMethod,
          paymentProofBlob: blob,
        });
      }

      clearCart();
      toast.success("Orders placed successfully! Awaiting admin verification.");
      navigate({ to: "/orders" });
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to place order. Please try again.";
      setSubmitError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
        <Package className="w-16 h-16 text-muted-foreground" />
        <h2 className="text-2xl font-display font-bold">Nothing to checkout</h2>
        <p className="text-muted-foreground">
          Add some products to your cart first.
        </p>
        <Button
          type="button"
          variant="default"
          onClick={() => navigate({ to: "/products" })}
          data-ocid="checkout.browse_products_button"
        >
          Browse Products
        </Button>
      </div>
    );
  }

  const activePayment = paymentMethod ? PAYMENT_DETAILS[paymentMethod] : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <h1 className="text-3xl font-display font-bold text-foreground">
            Secure Checkout
          </h1>
        </div>
        <p className="text-muted-foreground">
          Complete your payment and upload proof &mdash; your download will be
          released after admin verification.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: payment method + proof */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Step 1 - Select payment method */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <Card className="border border-border shadow-subtle">
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  Select Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(["jazzcash", "abl"] as const).map((method) => {
                  const info = PAYMENT_DETAILS[method];
                  const Icon = info.icon;
                  const selected = paymentMethod === method;
                  return (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      data-ocid={`checkout.payment_method_${method}`}
                      className={[
                        "flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-smooth",
                        selected
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/50 hover:bg-muted/30",
                      ].join(" ")}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          selected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p
                          className={`font-semibold text-sm ${
                            selected ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {info.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {method === "jazzcash"
                            ? "Instant mobile transfer"
                            : "Bank account transfer"}
                        </p>
                      </div>
                      {selected && (
                        <CheckCircle2 className="w-4 h-4 text-primary ml-auto flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Step 2 - Payment details */}
          {activePayment && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              data-ocid="checkout.payment_details"
            >
              <Card className="border border-border shadow-subtle">
                <CardHeader className="pb-3">
                  <CardTitle className="font-display text-base flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                      2
                    </span>
                    Payment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {activePayment.instruction}
                  </p>
                  <div className="bg-muted/40 rounded-xl p-4 space-y-2">
                    {activePayment.fields.map((f) => (
                      <div
                        key={f.label}
                        className="flex justify-between text-sm gap-4"
                      >
                        <span className="text-muted-foreground">{f.label}</span>
                        <span className="font-mono font-semibold text-foreground select-all">
                          {f.value}
                        </span>
                      </div>
                    ))}
                    <Separator className="my-1" />
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-muted-foreground">
                        Amount to Send
                      </span>
                      <span className="text-accent-foreground text-base">
                        {formatUsd(totalAmount)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3 - Upload proof */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="border border-border shadow-subtle">
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  Upload Payment Proof
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileChange}
                  data-ocid="checkout.proof_upload_input"
                />

                {proofPreview ? (
                  <div
                    className="relative rounded-xl overflow-hidden border border-border"
                    data-ocid="checkout.proof_preview"
                  >
                    <img
                      src={proofPreview}
                      alt="Payment proof preview"
                      className="w-full max-h-64 object-contain bg-muted/30"
                    />
                    <div className="absolute top-2 right-2">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        data-ocid="checkout.proof_change_button"
                      >
                        Change
                      </Button>
                    </div>
                    <div className="px-4 py-2 bg-card border-t border-border">
                      <p className="text-xs text-muted-foreground truncate">
                        {proofFile?.name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    tabIndex={0}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(e) =>
                      e.key === "Enter" && fileInputRef.current?.click()
                    }
                    className="w-full border-2 border-dashed border-border hover:border-primary/60 rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-smooth bg-muted/20 hover:bg-primary/5"
                    data-ocid="checkout.proof_dropzone"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <ImagePlus className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-foreground text-sm">
                        Click or drag to upload
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        PNG, JPG, WEBP up to 10MB
                      </p>
                    </div>
                  </button>
                )}

                {isSubmitting && uploadProgress > 0 && (
                  <div
                    className="space-y-1.5"
                    data-ocid="checkout.upload_progress"
                  >
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Uploading proof...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <Label className="text-xs text-muted-foreground">
                  <Upload className="w-3 h-3 inline mr-1" />
                  Your payment screenshot will be reviewed by an admin before
                  your download is released.
                </Label>
              </CardContent>
            </Card>
          </motion.div>

          {submitError && (
            <Alert variant="destructive" data-ocid="checkout.error_state">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Right column - summary + submit */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="flex flex-col gap-4"
          data-ocid="checkout.summary_panel"
        >
          <Card className="border border-border shadow-elevated sticky top-24">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.productId.toString()}
                  className="flex justify-between text-sm gap-2"
                >
                  <span className="text-muted-foreground truncate flex-1">
                    {item.title}
                  </span>
                  <div className="text-right flex-shrink-0">
                    <Badge variant="outline" className="text-xs mb-0.5">
                      &times;{item.quantity}
                    </Badge>
                    <p className="font-medium text-foreground">
                      {formatUsd(item.priceUsd * BigInt(item.quantity))}
                    </p>
                  </div>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-display font-bold text-foreground">
                <span>Total</span>
                <span className="text-accent-foreground">
                  {formatUsd(totalAmount)}
                </span>
              </div>

              <div className="mt-2 p-3 bg-muted/40 rounded-lg text-xs text-muted-foreground space-y-1">
                <p className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  Downloads released after admin approval
                </p>
                <p className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  Secure tokenized download links
                </p>
              </div>
            </CardContent>

            <div className="px-6 pb-6 pt-0">
              <Button
                type="button"
                className="w-full gap-2 font-semibold"
                size="lg"
                onClick={handleSubmit}
                disabled={isSubmitting || !paymentMethod || !proofFile}
                data-ocid="checkout.place_order_button"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Placing Order&hellip;
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Place Order
                  </>
                )}
              </Button>
              {(!paymentMethod || !proofFile) && (
                <p
                  className="text-xs text-muted-foreground text-center mt-2"
                  data-ocid="checkout.submit_hint"
                >
                  {!paymentMethod
                    ? "Select a payment method to continue"
                    : "Upload payment proof to continue"}
                </p>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
