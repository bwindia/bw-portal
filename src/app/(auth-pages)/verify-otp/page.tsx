"use client";
import FormSubmitButton from "@/components/molecules/FormSubmitButton";
import { SIGN_IN_PATH } from "@/utils/routes";
import { Message } from "@/utils/types";
import { redirect } from "next/navigation";
import { useRef, useState } from "react";
import { signInAction, verifyOtpAction } from "../actions";
import FormMessage from "@/components/molecules/FormMessage";

const VerifyOtpPage = ({ searchParams }: { searchParams: Message }) => {
  if (!("message" in searchParams)) {
    redirect(SIGN_IN_PATH);
  }
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move to next input if available
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <div className="flex-1 flex flex-col h-full min-w-64 w-full">
        <div className="flex flex-col justify-between min-h-[500px] h-full">
          <div className="flex flex-col gap-4 [&>input]:mb-3 mt-8">
            <h2 className="text-2xl font-semibold text-center">
              Sign In to your Account
            </h2>
            <p className="my-6 text-content4-foreground text-center">
              Enter OTP received on {searchParams.message}
            </p>
            <form className="flex flex-col items-center gap-3">
              <div className="flex gap-4 justify-center mb-6">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => {
                      inputRefs.current[index] = el; // Remove return value
                    }}
                    className="w-12 h-12 text-center text-2xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ))}
              </div>
              <input hidden name="token" value={otp.join("")} />
              <input hidden name="phone" value={searchParams.message} />
              <FormSubmitButton
                className="w-[367px]"
                pendingText="Verifying OTP..."
                formAction={verifyOtpAction}
              >
                Verify OTP
              </FormSubmitButton>
              {"error" in searchParams && (
                <div className="w-[367px]">
                  <FormMessage message={searchParams} />
                </div>
              )}
            </form>
          </div>
          <div className="text-center mt-6 text-sm flex justify-center gap-1">
            Didn&apos;t receive OTP yet?
            <form action={signInAction}>
              <input hidden name="phone" value={searchParams.message.substring(3)} />
              <input
                value="Resend Otp"
                type="submit"
                className="text-primary font-semibold"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOtpPage;
