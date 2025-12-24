"use client";

import { Suspense, useEffect, useState } from "react";
import { log, warn, error, table } from "@/lib/logger";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { markInvitationAsAccepted } from "@/lib/actions/user-management";
import { AuthLayout } from "@/components/auth/AuthLayout";

function AcceptInviteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<
    "verifying" | "success" | "error" | "needs-password"
  >("verifying");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check if we have token_hash and type in URL (from Supabase invite email)
    const tokenHash = searchParams.get("token_hash");
    const type = searchParams.get("type");

    if (!tokenHash || type !== "invite") {
      setFormError("Invalid invitation link");
      setStatus("error");
      return;
    }

    // Verify the OTP token
    const verifyToken = async () => {
      try {
        const { data, error: verifyError } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: "invite",
        });

        if (verifyError) {
          setFormError(verifyError.message || "Invalid or expired invitation link");
          setStatus("error");
          return;
        }

        if (data?.user) {
          const userEmail = data.user.email;
          setEmail(userEmail || null);

          // Check if user needs to set a password
          // If the user was just created, they might need to set a password
          if (!data.session) {
            setStatus("needs-password");
          } else {
            // User is already authenticated, mark invitation as accepted
            if (userEmail) {
              await handleInvitationAccepted(userEmail, data.user.id);
            }
            setStatus("success");
            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
          }
        }
      } catch (err) {
        setFormError(
          err instanceof Error ? err.message : "Failed to verify invitation",
        );
        setStatus("error");
      }
    };

    verifyToken();
  }, [searchParams, supabase]);

  const handleInvitationAccepted = async (
    userEmail: string,
    userId: string,
  ) => {
    try {
      await markInvitationAsAccepted(userEmail, userId);
    } catch (err) {
      error("Failed to mark invitation as accepted:", err);
      // Don't block the flow if this fails
    }
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const tokenHash = searchParams.get("token_hash");
    if (!tokenHash) {
      setFormError("Invalid invitation link");
      setLoading(false);
      return;
    }

    try {
      // First verify the OTP to get the session
      const { data: verifyData, error: verifyError } =
        await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: "invite",
        });

      if (verifyError || !verifyData?.user) {
        setFormError(verifyError?.message || "Failed to verify invitation");
        setLoading(false);
        return;
      }

      // Update the user's password
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setFormError(updateError.message);
        setLoading(false);
        return;
      }

      // Mark invitation as accepted
      if (verifyData.user.email) {
        await handleInvitationAccepted(
          verifyData.user.email,
          verifyData.user.id,
        );
      }

      setStatus("success");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to set password");
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Accept Invitation</CardTitle>
            <CardDescription>
              {status === "verifying" && "Verifying your invitation..."}
              {status === "needs-password" &&
                "Set your password to complete your account"}
              {status === "success" && "Invitation accepted! Redirecting..."}
              {status === "error" && "There was a problem with your invitation"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status === "verifying" && (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  Verifying invitation...
                </p>
              </div>
            )}

            {status === "success" && (
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCircle2 className="h-8 w-8 text-green-600 mb-4" />
                <p className="text-sm text-muted-foreground">
                  Your account has been created successfully!
                </p>
              </div>
            )}

            {status === "error" && (
              <Alert variant="destructive">
                <AlertDescription>
                  {formError || "Invalid or expired invitation link"}
                </AlertDescription>
              </Alert>
            )}

            {status === "needs-password" && (
              <form onSubmit={handleSetPassword} className="space-y-4">
                {formError && (
                  <Alert variant="destructive">
                    <AlertDescription>formError</AlertDescription>
                  </Alert>
                )}
                {email && (
                  <div className="rounded-md bg-muted p-3">
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{email}</p>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Setting password...
                    </>
                  ) : (
                    "Set Password"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AuthLayout>
  );
}

function LoadingFallback() {
  return (
    <AuthLayout>
      <Card>
        <CardHeader>
          <CardTitle>Accept Invitation</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground">
              Loading invitation...
            </p>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}

export default function AcceptInvitePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AcceptInviteContent />
    </Suspense>
  );
}
