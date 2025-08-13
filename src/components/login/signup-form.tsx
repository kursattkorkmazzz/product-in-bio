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

const RegisterSchenma = z4.object({
  name: z4.string().min(1, "Name is required"),
  email: z4.email("Invalid email address"),
  password: z4.string().min(8, "Password must be at least 8 characters long"),
});

type SignUpFormProps = {
  signUpHandler?: (e: React.FormEvent<HTMLFormElement>) => void;
  createAccountHandler?: () => void;
};
export default function SignUpForm(props: SignUpFormProps) {
  const formHook = useForm<z4.infer<typeof RegisterSchenma>>({
    resolver: zodResolver(RegisterSchenma),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const signUpHandler = () => {
    betterAuthClient.signUp.email({
      email: "",
      name: "",
      password: "",
      callbackURL: "/",
      image: "",
      lang: "",
      fetchOptions: {
        onSuccess(context) {},
        onError(context) {},
      },
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
        <form noValidate onSubmit={props.signUpHandler}>
          <div className="flex flex-col gap-3">
            <FormField
              control={formHook.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">*</span>Name
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
                      <span className="text-red-500">*</span>Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        placeholder="****"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">
                  <span className="text-red-500">*</span>Password
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="********"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Sign up
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
