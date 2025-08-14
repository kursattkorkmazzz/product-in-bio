"use client";
import z4 from "zod/v4";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Loader2Icon } from "lucide-react";
import { betterAuthClient } from "@/lib/better-auth/auth-client";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/better-auth/error-handling";
import Link from "next/link";

const SignInSchema = z4.object({
  email: z4.email("Invalid email address"),
  password: z4.string("Password is required"),
});

type SignInFormProps = {
  dontHaveAccountHandler?: () => void;
};
export default function SignInForm(props: SignInFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const formHook = useForm<z4.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    disabled: loading,
  });

  const handleSubmit = (values: z4.infer<typeof SignInSchema>) => {
    setLoading(true);
    betterAuthClient.signIn.email({
      email: values.email,
      password: values.password,
      rememberMe: true,
      callbackURL: "/dashboard",
      fetchOptions: {
        onSuccess(context) {
          setLoading(false);
          console.log(context.data);
          toast.success("Signed in successfully! Redirecting...");
        },
        onError(context) {
          setLoading(false);
          toast.error(getErrorMessage(context.error));
        },
      },
    });
  };

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>

        <p className="text-muted-foreground text-balance">
          Sign in to your Hepsify account
        </p>
      </div>
      <Form {...formHook}>
        <form
          className="flex flex-col gap-3"
          noValidate
          onSubmit={formHook.handleSubmit(handleSubmit)}
        >
          <FormField
            control={formHook.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={formHook.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>

                  <Link
                    href={"/"}
                    className="text-sm text-muted-foreground hover:text-muted-foreground/80 transition-colors duration-200"
                  >
                    Forgot your password?
                  </Link>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2Icon className="animate-spin" />}
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="text-center text-sm">
            Don't have an account?
            <Button
              className="w-min px-1"
              variant={"link"}
              type="button"
              onClick={props.dontHaveAccountHandler}
            >
              Sign up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
