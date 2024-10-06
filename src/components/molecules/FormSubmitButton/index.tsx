"use client";

import { useFormStatus } from "react-dom";
import { ButtonProps } from "@nextui-org/react";
import Button from "@/components/atoms/Button";

interface Props extends ButtonProps {
  pendingText?: string;
}

const FormSubmitButton = ({
  children,
  pendingText = "Submitting...",
  ...props
}: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} aria-disabled={pending} {...props}>
      {pending ? pendingText : children}
    </Button>
  );
};

export default FormSubmitButton
