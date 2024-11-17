"use client";

import { signInAction } from "@/app/(auth-pages)/actions";
import Input from "@/components/atoms/Input";
import FormSubmitButton from "@/components/molecules/FormSubmitButton";
import { useFormState } from "react-dom";
import logo from "@/assets/logos/BW Title Logo.png";
import Image from "next/image";

const SignIn = () => {
  const [state, formAction] = useFormState(signInAction, undefined);
  return (
    <form
      className="flex-1 flex flex-col h-full min-w-64 w-full"
      action={formAction}
    >
      <div className="flex flex-col justify-between min-h-[500px] h-full">
        <div className="flex flex-col gap-4 [&>input]:mb-3 mt-4">
          <div className="flex justify-center">
            <Image src={logo} alt="logo" className="h-16 w-auto" />
          </div>
          <h2 className="text-2xl font-semibold text-center">
            Sign In to your Account
          </h2>
          <p className="my-6 text-content4-foreground text-center">
            Enter your registered mobile number
          </p>
          <div>
            <Input
              size="lg"
              type="text"
              name="phone"
              label="Phone"
              labelPlacement="outside"
              isRequired
              variant="faded"
              startContent={
                <div className="pointer-events-none flex gap-2 items-center text-default-400">
                  {/* <span className="material-symbols-">Phone:</span> */}
                  <span>+91</span>
                </div>
              }
              required
            />
          </div>
          <FormSubmitButton
            errorMessage={state}
            className="mt-6"
            pendingText="Sending OTP..."
          >
            Send OTP
          </FormSubmitButton>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
