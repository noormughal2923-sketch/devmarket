import { j as jsxRuntimeExports } from "./index-REj_Qory.js";
import { A as AdminLayout } from "./AdminLayout-CENapWJP.js";
import { C as Card } from "./card-BRsK_EN0.js";
import { U as Users } from "./users-ChOwTIeK.js";
import "./separator-DFFkqXKi.js";
import "./arrow-left-B77sWEmj.js";
function AdminUsers() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fade-in", "data-ocid": "admin.users.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Users" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "bg-card border-border p-12 text-center",
        "data-ocid": "admin.users.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-16 w-16 text-muted-foreground/30 mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "User Management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm mx-auto", children: "User records are stored on-chain. To look up a specific user, enter their Principal ID via the order management view or through the backend admin interface." })
        ]
      }
    )
  ] }) });
}
export {
  AdminUsers as default
};
