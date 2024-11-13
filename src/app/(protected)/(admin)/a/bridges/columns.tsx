"use client";
import { User, Tooltip } from "@nextui-org/react";
import { EditIcon, EyeIcon } from "@/utils/icons";
import React from "react";
import { ITableColumn } from "@/utils/types";
import Link from "next/link";
import { BRIDGE_DETAILS_PAGE_ROUTE } from "@/utils/routes";

interface Bridge {
  id: string;
  bridgeName: string;
  mobile: string;
  gender: string;
  bloodGroup: string;
}

export const BRIDGE_COLUMNS: ITableColumn[] = [
  {
    key: "bridgeName",
    label: "Name",
    isSortable: true,
    isSearchable: true,
  },
  {
    key: "mobile",
    label: "Mobile",
  },
  {
    key: "gender",
    label: "Gender",
  },
  {
    key: "bloodGroup",
    label: "Blood Group",
  },
  {
    key: "actions",
    label: "",
  },
];

export const renderBridgeTableCell = (bridge: Bridge, columnKey: React.Key) => {
  const cellValue = bridge[columnKey as keyof object];

  switch (columnKey) {
    case "bridgeName":
      return (
        <User
          avatarProps={{
            radius: "full",
            className: "",
            // src: user.,
            showFallback: true,
            fallback: (
              <>
                <span className="material-symbols-rounded text-default-500">
                  {bridge.gender === "Male"
                    ? "male"
                    : bridge.gender === "Female"
                    ? "female"
                    : "question_mark"}
                </span>
              </>
            ),
          }}
          description={bridge.id}
          name={bridge.bridgeName}
        >
          {bridge.bridgeName}
        </User>
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
          <Tooltip content="Edit bridge">
            <Link href={BRIDGE_DETAILS_PAGE_ROUTE(bridge.id)}>
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EditIcon />
              </span>
            </Link>
          </Tooltip>
        </div>
      );
    default:
      return cellValue ? cellValue : <>--</>;
  }
};
