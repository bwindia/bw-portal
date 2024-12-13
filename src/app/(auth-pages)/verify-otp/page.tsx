"use client";
import FormSubmitButton from "@/components/molecules/FormSubmitButton";
import { SIGN_IN_PATH } from "@/utils/routes";
import { Message } from "@/utils/types";
import { redirect } from "next/navigation";
import { signInAction, verifyOtpAction } from "../actions";
import FormMessage from "@/components/molecules/FormMessage";
import { useFormState } from "react-dom";
import logo from "@/assets/logos/BW Title Logo.png";
import Image from "next/image";
import { InputOtp } from "@nextui-org/react";

const VerifyOtpPage = ({ searchParams }: { searchParams: Message }) => {
  if (!("message" in searchParams)) {
    redirect(SIGN_IN_PATH);
  }
  const [state, formAction] = useFormState(verifyOtpAction, undefined);
  const [signInState, signInFormAction] = useFormState(signInAction, undefined);

  return (
    <>
      <div className="flex-1 flex flex-col h-full min-w-64 w-full">
        <div className="flex flex-col justify-between min-h-[500px] h-full">
          <div className="flex flex-col gap-4 [&>input]:mb-3 mt-4">
            <div className="flex justify-center">
              <Image src={logo} alt="logo" className="h-16 w-auto" />
            </div>
            <h2 className="text-2xl font-semibold text-center">
              Sign In to your Account
            </h2>
            <p className="my-6 text-content4-foreground text-center">
              Enter OTP received on {searchParams.message}
            </p>
            <form
              className="flex flex-col items-center gap-3"
              action={formAction}
            >
              <InputOtp name="token" length={6} size="lg" variant="faded" />
              <input hidden readOnly name="phone" value={searchParams.message} />
              <FormSubmitButton
                errorMessage={state}
                className="w-[367px]"
                pendingText="Verifying OTP..."
              >
                Verify OTP
              </FormSubmitButton>
            </form>
          </div>
          <div className="text-center mt-6 text-sm flex justify-center gap-1">
            <div>Didn&apos;t receive OTP yet?</div>
            <div>
              <form action={signInFormAction}>
                <input
                  hidden
                  name="phone"
                  value={searchParams.message.substring(1)}
                />
                <input
                  value="Resend Otp"
                  type="submit"
                  className="text-primary font-semibold underline"
                />
              </form>
            </div>
          </div>
          {signInState && "error" in signInState && (
            <div className="w-[367px]">
              <FormMessage message={signInState} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyOtpPage;
