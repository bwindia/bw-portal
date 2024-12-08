"use client";
import { User, Tooltip } from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "../../../utils/icons";
import Modal from "@/components/molecules/Modal";
import React from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  lastSeen: string;
};

export const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "lastSeen",
    label: "Last Seen",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export const renderCell = (row: object, columnKey: React.Key) => {
  const cellValue = row[columnKey as keyof object];

  switch (columnKey) {
    case "actions":
      return (
        <div className="relative flex items-center gap-4">
          <Tooltip content="Details">
            <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
              <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip content="Edit user">
            <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete user">
            <span className="cursor-pointer text-lg text-danger active:opacity-50">
              <Modal
                body={<>Are you sure you want to delete it</>}
                onSuccess={() => {
                  console.log("deleting user of id: " + row["firstName" as keyof object]);
                }}
                successButton="Delete"
              >
                <DeleteIcon />
              </Modal>
            </span>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};
