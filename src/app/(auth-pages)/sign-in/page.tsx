import { signInAction } from "@/app/(auth-pages)/actions";
import Input from "@/components/atoms/Input";
import FormMessage from "@/components/molecules/FormMessage";
import FormSubmitButton from "@/components/molecules/FormSubmitButton";
import { Message } from "@/utils/types";
import { SIGN_UP_PATH } from "@/utils/routes";
import Link from "next/link";

const SignIn = ({ searchParams }: { searchParams: Message }) => {
  return (
    <form className="flex-1 flex flex-col h-full min-w-64 w-full">
      <div className="flex flex-col justify-between min-h-[500px] h-full">
        <div className="flex flex-col gap-4 [&>input]:mb-3 mt-8">
          <h2 className="text-2xl font-semibold text-center">
            Sign In to your Account
          </h2>
          <div>
            <label htmlFor="email">Email</label>
            <Input
              size="lg"
              type="email"
              name="email"
              placeholder="example@bloodwarriors.in"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input
              size="lg"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <Link
              className="text-primary underline text-sm float-right mt-2"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <FormSubmitButton
            pendingText="Signing In..."
            formAction={signInAction}
          >
            Sign in
          </FormSubmitButton>
          <FormMessage message={searchParams} />
        </div>
        <div className="">
          <div className="text-center mt-6">
            <p className="text-sm">
              Don&apos;t have an account?&nbsp;
              <Link
                className="text-primary font-medium underline"
                href={SIGN_UP_PATH}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
