"use client";

import { useFormStatus } from "react-dom";
import { ButtonProps } from "@nextui-org/react";
import Button from "@/components/atoms/Button";
import { Message } from "@/utils/types";
import FormMessage from "@/components/molecules/FormMessage";

interface Props extends ButtonProps {
  pendingText?: string;
  errorMessage?: Message;
}

const FormSubmitButton = ({
  children,
  pendingText = "Submitting...",
  ...props
}: Props) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-3">
    <Button type="submit" disabled={pending} aria-disabled={pending} {...props}>
      {pending ? pendingText : children}
    </Button>
    {props.errorMessage && !pending && (
      <FormMessage message={props.errorMessage} />
    )}
    </div>
  );
};

export default FormSubmitButton
