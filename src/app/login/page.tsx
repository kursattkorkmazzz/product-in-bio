"use client";
import SignInForm from "@/components/login/signin-form";
import SignUpForm from "@/components/login/signup-form";
import { Card, CardContent } from "@/components/ui/card";
import { FormEvent, useState } from "react";

export default function AuthenticationPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const inSignInMode = mode === "signin";

  const signInHandler = (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    const email = data.currentTarget.email.value;
    const password = data.currentTarget.password.value;
  };

  const signUpHandler = (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    const email = data.currentTarget.email.value;
    const password = data.currentTarget.password.value;
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6 h-max">
          <Card className="overflow-hidden p-0">
            <CardContent className="relative grid p-0 md:grid-cols-2">
              {inSignInMode ? (
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
              )}

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
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
