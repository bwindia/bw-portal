import { InputProps, Input as NextUiInput } from "@nextui-org/react";
import React from "react";

const Input = (props: InputProps) => {
  return <NextUiInput fullWidth {...props} />;
};

export default Input;
