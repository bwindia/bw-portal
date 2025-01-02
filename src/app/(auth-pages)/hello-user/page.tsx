"use client";

import { helloUserAction } from "@/app/(auth-pages)/actions";
import Input from "@/components/atoms/Input";
import FormSubmitButton from "@/components/molecules/FormSubmitButton";
import { BLOOD_GROUP, GENDER } from "@/utils/constants";
import { Select, SelectItem } from "@nextui-org/react";
import { useFormState } from "react-dom";
import logo from "@/assets/logos/BW Title Logo.png";
import Image from "next/image";

const HelloUserPage = () => {
  const [state, formAction] = useFormState(helloUserAction, undefined);
 
  return (
    <div className="flex-1 flex flex-col h-full min-w-64 w-full">
      <div className="flex flex-col justify-between min-h-[500px] h-full">
        <div className="flex flex-col gap-4 w-full mt-4">
          <div className="flex justify-center">
            <Image src={logo} alt="logo" className="h-16 w-auto" />
          </div>
          <h2 className="text-2xl font-semibold text-center">Hey Warrior!</h2>
          <p className="mb-6 text-content4-foreground text-center">
            Let&apos;s get you started!
          </p>

          <form
            action={formAction}
            className="flex flex-col items-center w-full gap-3"
          >
            {/* Create fields for selecting Blood group, Gender, DOB, etc. */}
            <div className="flex flex-col gap-4 w-full">
              <Input
                label="Name"
                name="name"
                labelPlacement="outside"
                variant="faded"
                placeholder="Enter your name"
                isRequired
              />
              <Select
                label="Blood Group"
                name="blood_group_id"
                labelPlacement="outside"
                variant="faded"
                placeholder="Select Blood Group"
                isRequired
              >
                {BLOOD_GROUP.map((bloodGroup) => (
                  <SelectItem key={bloodGroup.value} value={bloodGroup.value}>
                    {bloodGroup.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Gender"
                name="gender_id"
                labelPlacement="outside"
                variant="faded"
                placeholder="Select Gender"
                isRequired
              >
                {GENDER.map((gender) => (
                  <SelectItem key={gender.value} value={gender.value}>
                    {gender.label}
                  </SelectItem>
                ))}
              </Select>

              <FormSubmitButton
                errorMessage={state}
                pendingText="Creating account for you..."
              >
                Get Started
              </FormSubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelloUserPage;
