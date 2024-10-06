import { signInAction } from "@/app/actions";
import Input from "@/components/atoms/Input";
import FormMessage from "@/components/molecules/FormMessage";
import FormSubmitButton from "@/components/molecules/FormSubmitButton";
import { Message } from "@/utils/types";
import { SIGN_UP_PATH } from "@/utils/urls";
import Link from "next/link";

const SignIn = ({ searchParams }: { searchParams: Message }) => {
  return (
    <form className="flex-1 flex flex-col min-w-64 w-full">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don&apos;t have an account?
        <Link
          className="text-foreground font-medium underline"
          href={SIGN_UP_PATH}
        >
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <label htmlFor="email">Email</label>
        <Input
          size="lg"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <div className="flex justify-between items-center">
          <label htmlFor="password">Password</label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          size="lg"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <FormSubmitButton pendingText="Signing In..." formAction={signInAction}>
          Sign in
        </FormSubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}

export default SignIn