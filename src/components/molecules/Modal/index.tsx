"use client";
import React from "react";
import {
  Modal as NextUiModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Button from "@/components/atoms/Button";

type Props = {
  children: React.ReactNode;
  body: JSX.Element;
  onSuccess: () => void;
  successButton: string;
  rejectButton?: string;
  rejectButtonColor?:
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
  successButtonColor?:
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  scrollBehavior?: "outside" | "inside" | "normal";
  header?: JSX.Element;
  isButton?: boolean;
};

const Modal = (props: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleSuccess = () => {
    props.onSuccess();
    onClose();
  };

  return (
    <>  
      <div className="w-fit">
        {props.isButton ? (
          <Button onClick={onOpen}>{props.children}</Button>
        ) : (
          <div onClick={onOpen}>{props.children}</div>
        )}
      </div>
      <NextUiModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        scrollBehavior={props.scrollBehavior ?? "normal"}
        isKeyboardDismissDisabled={true}
        size={props.size ?? "2xl"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {props.header && (
                <ModalHeader className="flex flex-col gap-1">
                  {props.header}
                </ModalHeader>
              )}
              <ModalBody className="mt-3">{props.body}</ModalBody>
              <ModalFooter>
                <Button
                  color={props.rejectButtonColor ?? "danger"}
                  variant="light"
                  onPress={onClose}
                >
                  {props.rejectButton ?? "Close"}
                </Button>
                <Button
                  color={props.successButtonColor ?? "secondary"}
                  onPress={handleSuccess}
                >
                  {props.successButton}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </NextUiModal>
    </>
  );
};

export default Modal;
