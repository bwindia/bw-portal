"use client";
import { User, Tooltip, Chip, Link } from "@nextui-org/react";
import { EditIcon } from "@/utils/icons";
import React from "react";
import { ITableColumn } from "@/utils/types";
import { EDIT_USER_PAGE_ROUTE } from "@/utils/routes";

interface User {
  user_id: string;
  name: string;
  mobile: string;
  email: string;
  gender: string;
  is_active: boolean;
  blood_group: string;
  roles: { role: string }[];
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
    isSearchable: true,
  },
  {
    key: "blood_group",
    label: "Blood Group",
  },
  {
    key: "roles",
    label: "Roles",
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
          variant="dot"
        >
          {user.is_active ? "Active" : "Inactive"}
        </Chip>
      );
    case "roles":
      return (
        <div className="flex gap-1">
          {user.roles.map((role) => (
            <Chip variant="bordered" size="sm" key={role.role}>
              {role.role}
            </Chip>
          ))}
        </div>
      );
    case "createdAt":
      return <span>{new Date(cellValue).toLocaleDateString()}</span>;
    case "actions":
      return (
        <div className="relative flex items-center gap-4">
          <Tooltip content="Edit user">
            <Link href={EDIT_USER_PAGE_ROUTE(user.user_id)}>
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EditIcon />
              </span>
            </Link>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};
