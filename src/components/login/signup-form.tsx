import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type SignUpFormProps = {
  signUpHandler?: (e: React.FormEvent<HTMLFormElement>) => void;
  createAccountHandler?: () => void;
};
export default function SignUpForm(props: SignUpFormProps) {
  return (
    <form className="p-6 md:p-8" noValidate onSubmit={props.signUpHandler}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>

          <p className="text-muted-foreground text-balance">
            Sign up from Hepsify Platform
          </p>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            name="password"
            autoComplete="current-password"
            required
          />
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
      </div>
    </form>
  );
}
