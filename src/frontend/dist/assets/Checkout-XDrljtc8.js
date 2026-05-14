import { c as createLucideIcon, j as jsxRuntimeExports, h as cn, i as cva, b as useCart, k as useNavigate, l as usePlaceOrder, r as reactExports, g as Package, a as Button, B as Badge, E as ExternalBlob, m as PaymentMethod } from "./index-REj_Qory.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BRsK_EN0.js";
import { L as Label } from "./label-Bg8WZHQ0.js";
import { S as Separator } from "./separator-DFFkqXKi.js";
import { u as ue } from "./index-BXafDmMA.js";
import { m as motion } from "./proxy-Bt9ftd_9.js";
import { S as ShieldCheck } from "./shield-check-PPiVwMu9.js";
import { S as Smartphone } from "./smartphone-mG7cAPCh.js";
import { C as CircleCheck } from "./circle-check-BKLBpzMw.js";
import { U as Upload } from "./upload-DWrNvc9S.js";
import { L as LoaderCircle } from "./loader-circle-CoVmjqOK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M6 12h.01M18 12h.01", key: "113zkx" }]
];
const Banknote = createLucideIcon("banknote", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
const ImagePlus = createLucideIcon("image-plus", __iconNode);
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Alert({
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: cn(alertVariants({ variant }), className),
      ...props
    }
  );
}
function AlertDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-description",
      className: cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      ),
      ...props
    }
  );
}
function formatUsd(cents) {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}
const PAYMENT_DETAILS = {
  jazzcash: {
    label: "JazzCash",
    icon: Smartphone,
    fields: [
      { label: "Mobile Account", value: "0300-1234567" },
      { label: "Account Name", value: "DevMarket Official" }
    ],
    instruction: "Send the exact amount to this JazzCash number and upload the transaction screenshot below."
  },
  abl: {
    label: "Allied Bank (ABL)",
    icon: Banknote,
    fields: [
      { label: "Account Number", value: "01234-56789012-3" },
      { label: "Account Title", value: "DevMarket Pvt. Ltd." },
      { label: "Branch Code", value: "0142" },
      { label: "IBAN", value: "PK72ABPA0010001234567890" }
    ],
    instruction: "Transfer the exact amount to this Allied Bank account and upload the transfer receipt below."
  }
};
function Checkout() {
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const placeOrder = usePlaceOrder();
  const [paymentMethod, setPaymentMethod] = reactExports.useState(null);
  const [proofFile, setProofFile] = reactExports.useState(null);
  const [proofPreview, setProofPreview] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [submitError, setSubmitError] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const handleFileChange = reactExports.useCallback(
    (e) => {
      var _a;
      const file = ((_a = e.target.files) == null ? void 0 : _a[0]) ?? null;
      setProofFile(file);
      setSubmitError(null);
      if (file) {
        setProofPreview(URL.createObjectURL(file));
      } else {
        setProofPreview(null);
      }
    },
    []
  );
  const handleDrop = reactExports.useCallback((e) => {
    var _a;
    e.preventDefault();
    const file = ((_a = e.dataTransfer.files) == null ? void 0 : _a[0]) ?? null;
    if (file == null ? void 0 : file.type.startsWith("image/")) {
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
      const backendPaymentMethod = paymentMethod === "jazzcash" ? PaymentMethod.JazzCash : PaymentMethod.ABL;
      for (const item of items) {
        await placeOrder.mutateAsync({
          productId: item.productId,
          paymentMethod: backendPaymentMethod,
          paymentProofBlob: blob
        });
      }
      clearCart();
      ue.success("Orders placed successfully! Awaiting admin verification.");
      navigate({ to: "/orders" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to place order. Please try again.";
      setSubmitError(msg);
      ue.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (items.length === 0 && !isSubmitting) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-16 h-16 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold", children: "Nothing to checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Add some products to your cart first." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "default",
          onClick: () => navigate({ to: "/products" }),
          "data-ocid": "checkout.browse_products_button",
          children: "Browse Products"
        }
      )
    ] });
  }
  const activePayment = paymentMethod ? PAYMENT_DETAILS[paymentMethod] : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
        className: "mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground", children: "Secure Checkout" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Complete your payment and upload proof — your download will be released after admin verification." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -12 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.3, delay: 0.05 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border shadow-subtle", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold", children: "1" }),
                "Select Payment Method"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: ["jazzcash", "abl"].map((method) => {
                const info = PAYMENT_DETAILS[method];
                const Icon = info.icon;
                const selected = paymentMethod === method;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setPaymentMethod(method),
                    "data-ocid": `checkout.payment_method_${method}`,
                    className: [
                      "flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-smooth",
                      selected ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50 hover:bg-muted/30"
                    ].join(" "),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: `font-semibold text-sm ${selected ? "text-primary" : "text-foreground"}`,
                            children: info.label
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: method === "jazzcash" ? "Instant mobile transfer" : "Bank account transfer" })
                      ] }),
                      selected && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary ml-auto flex-shrink-0" })
                    ]
                  },
                  method
                );
              }) })
            ] })
          }
        ),
        activePayment && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3 },
            "data-ocid": "checkout.payment_details",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border shadow-subtle", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold", children: "2" }),
                "Payment Details"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: activePayment.instruction }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4 space-y-2", children: [
                  activePayment.fields.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex justify-between text-sm gap-4",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: f.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground select-all", children: f.value })
                      ]
                    },
                    f.label
                  )),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-bold", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Amount to Send" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent-foreground text-base", children: formatUsd(totalAmount) })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -12 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.3, delay: 0.1 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border shadow-subtle", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold", children: "3" }),
                "Upload Payment Proof"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: fileInputRef,
                    type: "file",
                    accept: "image/*",
                    className: "sr-only",
                    onChange: handleFileChange,
                    "data-ocid": "checkout.proof_upload_input"
                  }
                ),
                proofPreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "relative rounded-xl overflow-hidden border border-border",
                    "data-ocid": "checkout.proof_preview",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: proofPreview,
                          alt: "Payment proof preview",
                          className: "w-full max-h-64 object-contain bg-muted/30"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          variant: "secondary",
                          size: "sm",
                          onClick: () => {
                            var _a;
                            return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                          },
                          "data-ocid": "checkout.proof_change_button",
                          children: "Change"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 bg-card border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: proofFile == null ? void 0 : proofFile.name }) })
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    tabIndex: 0,
                    onDrop: handleDrop,
                    onDragOver: (e) => e.preventDefault(),
                    onClick: () => {
                      var _a;
                      return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                    },
                    onKeyDown: (e) => {
                      var _a;
                      return e.key === "Enter" && ((_a = fileInputRef.current) == null ? void 0 : _a.click());
                    },
                    className: "w-full border-2 border-dashed border-border hover:border-primary/60 rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-smooth bg-muted/20 hover:bg-primary/5",
                    "data-ocid": "checkout.proof_dropzone",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-6 h-6 text-primary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Click or drag to upload" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "PNG, JPG, WEBP up to 10MB" })
                      ] })
                    ]
                  }
                ),
                isSubmitting && uploadProgress > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "space-y-1.5",
                    "data-ocid": "checkout.upload_progress",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading proof..." }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          uploadProgress,
                          "%"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          className: "h-full bg-primary rounded-full",
                          initial: { width: 0 },
                          animate: { width: `${uploadProgress}%` }
                        }
                      ) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3 h-3 inline mr-1" }),
                  "Your payment screenshot will be reviewed by an admin before your download is released."
                ] })
              ] })
            ] })
          }
        ),
        submitError && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", "data-ocid": "checkout.error_state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: submitError })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.2 },
          className: "flex flex-col gap-4",
          "data-ocid": "checkout.summary_panel",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border shadow-elevated sticky top-24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Order Summary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
              items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex justify-between text-sm gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground truncate flex-1", children: item.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs mb-0.5", children: [
                        "×",
                        item.quantity
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: formatUsd(item.priceUsd * BigInt(item.quantity)) })
                    ] })
                  ]
                },
                item.productId.toString()
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-display font-bold text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent-foreground", children: formatUsd(totalAmount) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 p-3 bg-muted/40 rounded-lg text-xs text-muted-foreground space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-primary flex-shrink-0" }),
                  "Downloads released after admin approval"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-primary flex-shrink-0" }),
                  "Secure tokenized download links"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6 pt-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  className: "w-full gap-2 font-semibold",
                  size: "lg",
                  onClick: handleSubmit,
                  disabled: isSubmitting || !paymentMethod || !proofFile,
                  "data-ocid": "checkout.place_order_button",
                  children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                    "Placing Order…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
                    "Place Order"
                  ] })
                }
              ),
              (!paymentMethod || !proofFile) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-muted-foreground text-center mt-2",
                  "data-ocid": "checkout.submit_hint",
                  children: !paymentMethod ? "Select a payment method to continue" : "Upload payment proof to continue"
                }
              )
            ] })
          ] })
        }
      )
    ] })
  ] });
}
export {
  Checkout as default
};
