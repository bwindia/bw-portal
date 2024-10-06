import { ButtonProps, Button as NextUiButton } from "@nextui-org/react";

const Button = (props: ButtonProps) => {
  return <NextUiButton color="primary" {...props} />;
};

export default Button;
