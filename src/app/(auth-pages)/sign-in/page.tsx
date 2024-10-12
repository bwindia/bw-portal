import { signInAction } from "@/app/(auth-pages)/actions";
import Input from "@/components/atoms/Input";
import FormMessage from "@/components/molecules/FormMessage";
import FormSubmitButton from "@/components/molecules/FormSubmitButton";
import { Message } from "@/utils/types";

const SignIn = ({ searchParams }: { searchParams: Message }) => {
  return (
    <form className="flex-1 flex flex-col h-full min-w-64 w-full">
      <div className="flex flex-col justify-between min-h-[500px] h-full">
        <div className="flex flex-col gap-4 [&>input]:mb-3 mt-8">
          <h2 className="text-2xl font-semibold text-center">
            Sign In to your Account
          </h2>
          <p className="my-6 text-content4-foreground text-center">
            Enter your registerd mobile number
          </p>
          <div>
            <label htmlFor="phone">Phone</label>
            <Input
              size="lg"
              type="text"
              name="phone"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">+91</span>
                </div>
              }
              required
            />
          </div>
          <FormSubmitButton
            className="mt-6"
            pendingText="Sending OTP..."
            formAction={signInAction}
          >
            Send OTP
          </FormSubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </div>
    </form>
  );
};

export default SignIn;
