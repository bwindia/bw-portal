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
  header?: JSX.Element;
};

const Modal = (props: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div onClick={onOpen}>{props.children}</div>
      <NextUiModal isOpen={isOpen} onOpenChange={onOpenChange}  isDismissable={false} isKeyboardDismissDisabled={true}>
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
                  onPress={props.onSuccess}
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
