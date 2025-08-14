"use client";
import { betterAuthClient } from "@/lib/better-auth/auth-client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import z4 from "zod/v4";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { toast } from "sonner";
import { useState } from "react";
import { getErrorMessage } from "@/lib/better-auth/error-handling";
import { Loader2Icon } from "lucide-react";

const RegisterSchema = z4
  .object({
    name: z4.string().min(1, "Full name is required"),
    email: z4.email("Invalid email address"),
    password: z4.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z4.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormProps = {
  createAccountHandler?: () => void;
};
export default function SignUpForm(props: SignUpFormProps) {
  const [loading, setLoading] = useState(false);

  const formHook = useForm<z4.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    disabled: loading,
  });

  const signUpHandler = (values: z4.infer<typeof RegisterSchema>) => {
    setLoading(true);
    betterAuthClient.signUp
      .email({
        email: values.email,
        password: values.password,
        name: values.name,
        image: "",
        fetchOptions: {
          onSuccess(context) {
            toast.success("Account created successfully!");
            formHook.reset();
            setLoading(false);
            props.createAccountHandler?.();
          },
          onError(context) {
            toast.error(getErrorMessage(context.error.code));
            setLoading(false);
          },
        },
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>

        <p className="text-muted-foreground text-balance">
          Sign up for Hepsify Platform
        </p>
      </div>
      <Form {...formHook}>
        <form
          className="flex flex-col gap-3"
          noValidate
          onSubmit={formHook.handleSubmit(signUpHandler)}
        >
          <div className="flex flex-col gap-3">
            <FormField
              control={formHook.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">*</span>Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        autoComplete="name"
                        placeholder="John Doe"
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
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">*</span>Email
                    </FormLabel>
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
                    <FormLabel>
                      <span className="text-red-500">*</span>Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        placeholder="********"
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
              name="confirmPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">*</span>Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2Icon className="animate-spin" />}
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>

          <div className="text-center text-sm">
            Do you have an account?
            <Button
              className="w-min px-1"
              variant={"link"}
              type="button"
              onClick={props.createAccountHandler}
            >
              Sign in
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
