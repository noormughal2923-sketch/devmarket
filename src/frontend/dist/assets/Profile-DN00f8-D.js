import { c as createLucideIcon, q as useInternetIdentity, s as useCallerProfile, t as useSaveCallerProfile, r as reactExports, j as jsxRuntimeExports, S as Skeleton, U as User, a as Button } from "./index-REj_Qory.js";
import { C as Card } from "./card-BRsK_EN0.js";
import { I as Input } from "./input-C9nypxBK.js";
import { L as Label } from "./label-Bg8WZHQ0.js";
import { S as Separator } from "./separator-DFFkqXKi.js";
import { u as ue } from "./index-BXafDmMA.js";
import { m as motion } from "./proxy-Bt9ftd_9.js";
import { S as ShieldCheck } from "./shield-check-PPiVwMu9.js";
import { C as CircleCheck } from "./circle-check-BKLBpzMw.js";
import { L as LoaderCircle } from "./loader-circle-CoVmjqOK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
function formatTimestamp(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function ProfilePage() {
  const { identity } = useInternetIdentity();
  const { data: profile, isLoading, isFetched } = useCallerProfile();
  const saveProfile = useSaveCallerProfile();
  const [displayName, setDisplayName] = reactExports.useState("");
  const [saved, setSaved] = reactExports.useState(false);
  const [copied, setCopied] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (isFetched && profile) {
      setDisplayName(profile.displayName);
    }
  }, [profile, isFetched]);
  const handleSave = async (e) => {
    e.preventDefault();
    if (!displayName.trim()) {
      ue.error("Display name cannot be empty");
      return;
    }
    try {
      await saveProfile.mutateAsync({
        displayName: displayName.trim(),
        isBlocked: (profile == null ? void 0 : profile.isBlocked) ?? false,
        createdAt: (profile == null ? void 0 : profile.createdAt) ?? BigInt(Date.now() * 1e6)
      });
      setSaved(true);
      ue.success("Profile saved!");
      setTimeout(() => setSaved(false), 3e3);
    } catch {
      ue.error("Failed to save profile. Please try again.");
    }
  };
  const principalText = (identity == null ? void 0 : identity.getPrincipal().toString()) ?? "—";
  const handleCopyPrincipal = () => {
    if (principalText === "—") return;
    navigator.clipboard.writeText(principalText);
    setCopied(true);
    ue.success("Principal ID copied!");
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fade-in", "data-ocid": "profile.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-2xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground mb-1", children: "Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage your account settings" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-2xl mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
        className: "flex flex-col gap-5",
        children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-16 rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-36 mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-full mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-32" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Card,
            {
              className: "bg-card border-border p-6 sm:p-8",
              "data-ocid": "profile.identity_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5 mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-primary/15 border-2 border-primary/25 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-8 w-8 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground", children: (profile == null ? void 0 : profile.displayName) || "No name set" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Internet Identity User" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-6" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-medium flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-primary" }),
                      "Internet Identity Principal"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: handleCopyPrincipal,
                        "data-ocid": "profile.copy_principal_button",
                        className: "flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-smooth",
                        children: [
                          copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" }),
                          copied ? "Copied" : "Copy"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 p-3 bg-muted rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-mono text-xs text-muted-foreground break-all select-all",
                      "data-ocid": "profile.principal_display",
                      children: principalText
                    }
                  ) })
                ] }),
                (profile == null ? void 0 : profile.createdAt) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Member since ",
                    formatTimestamp(profile.createdAt)
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Card,
            {
              className: "bg-card border-border p-6 sm:p-8",
              "data-ocid": "profile.edit_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-display font-semibold text-foreground mb-5", children: "Edit Profile" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSave, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "display-name",
                        className: "mb-2 block text-sm font-medium",
                        children: "Display Name"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "display-name",
                        value: displayName,
                        onChange: (e) => setDisplayName(e.target.value),
                        placeholder: "Enter your display name",
                        maxLength: 64,
                        "data-ocid": "profile.display_name_input",
                        className: "h-11"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        disabled: saveProfile.isPending || !displayName.trim(),
                        "data-ocid": "profile.save_button",
                        className: "h-11 px-6 gap-2",
                        children: saveProfile.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                          "Saving…"
                        ] }) : saved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
                          "Saved!"
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
                          "Save Changes"
                        ] })
                      }
                    ),
                    saveProfile.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-destructive",
                        "data-ocid": "profile.error_state",
                        children: "Save failed. Try again."
                      }
                    )
                  ] })
                ] }) })
              ]
            }
          )
        ] })
      }
    ) })
  ] });
}
export {
  ProfilePage as default
};
