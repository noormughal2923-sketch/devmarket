import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCallerProfile, useSaveCallerProfile } from "@/hooks/useBackend";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  CalendarDays,
  CheckCircle2,
  Copy,
  Loader2,
  Save,
  ShieldCheck,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── helpers ──────────────────────────────────────────────────────────────────
function formatTimestamp(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { identity } = useInternetIdentity();
  const { data: profile, isLoading, isFetched } = useCallerProfile();
  const saveProfile = useSaveCallerProfile();
  const [displayName, setDisplayName] = useState("");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isFetched && profile) {
      setDisplayName(profile.displayName);
    }
  }, [profile, isFetched]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      toast.error("Display name cannot be empty");
      return;
    }
    try {
      await saveProfile.mutateAsync({
        displayName: displayName.trim(),
        isBlocked: profile?.isBlocked ?? false,
        createdAt: profile?.createdAt ?? BigInt(Date.now() * 1_000_000),
      });
      setSaved(true);
      toast.success("Profile saved!");
      setTimeout(() => setSaved(false), 3000);
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  const principalText = identity?.getPrincipal().toString() ?? "—";

  const handleCopyPrincipal = () => {
    if (principalText === "—") return;
    navigator.clipboard.writeText(principalText);
    setCopied(true);
    toast.success("Principal ID copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fade-in" data-ocid="profile.page">
      {/* Header */}
      <div className="bg-card border-b border-border py-12">
        <div className="container max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-display font-bold text-foreground mb-1">
            Profile
          </h1>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-5"
        >
          {isLoading ? (
            <Card className="bg-card border-border p-8">
              <div className="flex items-center gap-4 mb-6">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-36 mb-2" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-11 w-full mb-4" />
              <Skeleton className="h-11 w-32" />
            </Card>
          ) : (
            <>
              {/* Identity card */}
              <Card
                className="bg-card border-border p-6 sm:p-8"
                data-ocid="profile.identity_card"
              >
                {/* Avatar + name row */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="h-16 w-16 rounded-full bg-primary/15 border-2 border-primary/25 flex items-center justify-center shrink-0">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-semibold text-foreground">
                      {profile?.displayName || "No name set"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Internet Identity User
                    </p>
                  </div>
                </div>

                <Separator className="mb-6" />

                {/* Principal ID */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Internet Identity Principal
                    </Label>
                    <button
                      type="button"
                      onClick={handleCopyPrincipal}
                      data-ocid="profile.copy_principal_button"
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      {copied ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <span
                      className="font-mono text-xs text-muted-foreground break-all select-all"
                      data-ocid="profile.principal_display"
                    >
                      {principalText}
                    </span>
                  </div>
                </div>

                {/* Account created date */}
                {profile?.createdAt && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4 shrink-0" />
                    <span>
                      Member since {formatTimestamp(profile.createdAt)}
                    </span>
                  </div>
                )}
              </Card>

              {/* Edit name card */}
              <Card
                className="bg-card border-border p-6 sm:p-8"
                data-ocid="profile.edit_card"
              >
                <h3 className="text-base font-display font-semibold text-foreground mb-5">
                  Edit Profile
                </h3>
                <form onSubmit={handleSave}>
                  <div className="flex flex-col gap-5">
                    <div>
                      <Label
                        htmlFor="display-name"
                        className="mb-2 block text-sm font-medium"
                      >
                        Display Name
                      </Label>
                      <Input
                        id="display-name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter your display name"
                        maxLength={64}
                        data-ocid="profile.display_name_input"
                        className="h-11"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Button
                        type="submit"
                        disabled={saveProfile.isPending || !displayName.trim()}
                        data-ocid="profile.save_button"
                        className="h-11 px-6 gap-2"
                      >
                        {saveProfile.isPending ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving…
                          </>
                        ) : saved ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            Saved!
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>

                      {saveProfile.isError && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="profile.error_state"
                        >
                          Save failed. Try again.
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </Card>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
