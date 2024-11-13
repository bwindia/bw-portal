"use client";
import { User, Tooltip, Chip } from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "@/utils/icons";
import Modal from "@/components/molecules/Modal";
import React from "react";
import { ITableColumn } from "@/utils/types";

interface User {
  id: string;
  name: string;
  mobile: string;
  email: string;
  gender: string;
  is_active: boolean;
  blood_group: string;
}

export const USER_COLUMNS: ITableColumn[] = [
  {
    key: "name",
    label: "Name",
    isSortable: true,
    isSearchable: true,
  },
  {
    key: "mobile",
    label: "Phone",
  },
  {
    key: "gender",
    label: "Gender",
  },
  {
    key: "blood_group",
    label: "Blood Group",
  },
  {
    key: "is_active",
    label: "Status",
    isSortable: true,
  },
  {
    key: "actions",
    label: "",
  },
];

export const renderUserTableCell = (user: User, columnKey: React.Key) => {
  const cellValue = user[columnKey as keyof object];

  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{
            radius: "full",
            className: "",
            // src: user.,
            showFallback: true,
            fallback: (
              <span className="material-symbols-rounded text-default-500">
                {user.gender === "Male"
                  ? "male"
                  : user.gender === "Female"
                  ? "female"
                  : "question_mark"}
              </span>
            ),
          }}
          description={user.email}
          name={user.name}
        >
          {user.email}
        </User>
      );
    case "is_active":
      return (
        <Chip
          className="capitalize"
          color={user.is_active ? "success" : "danger"}
          size="sm"
          variant="flat"
        >
          {user.is_active ? "Active" : "Inactive"}
        </Chip>
      );
    case "createdAt":
      return <span>{new Date(cellValue).toLocaleDateString()}</span>;
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
                  console.log(
                    "deleting user of id: " + user["firstName" as keyof object]
                  );
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
