"use client";
import SignInForm from "@/components/login/signin-form";
import SignUpForm from "@/components/login/signup-form";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { betterAuthClient } from "@/lib/better-auth/auth-client";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function AuthenticationPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const inSignInMode = mode === "signin";
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const currentSession = betterAuthClient.useSession();
  useEffect(() => {
    setIsLoading(currentSession.isPending);
    if (currentSession.data) {
      router.push("/dashboard");
    }
  }, [currentSession]);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      {isLoading ? (
        <Loader2Icon className="size-8 aspect-square animate-spin" />
      ) : (
        <div className="w-full max-w-sm md:max-w-3xl">
          <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
              <CardContent className="relative grid p-0 md:grid-cols-2 min-h-96">
                {!isLoading &&
                  (inSignInMode ? (
                    <SignInForm
                      dontHaveAccountHandler={() => {
                        setMode("signup");
                      }}
                    />
                  ) : (
                    <SignUpForm
                      createAccountHandler={() => {
                        setMode("signin");
                      }}
                    />
                  ))}

                <div className="bg-muted relative hidden md:block">
                  <img
                    src="/images/example-dashboard.png"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover blur-[2px]"
                  />
                  <div className="z-1 absolute top-0 left-0 w-full h-full bg-radial from-transparent from-50% to-black to-90% "></div>
                </div>
              </CardContent>
            </Card>

            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
              By clicking continue, you agree to our&nbsp;
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
