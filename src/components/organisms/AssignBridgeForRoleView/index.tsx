"use client";
import React, { useEffect, useMemo, useState } from "react";
import Table from "@/components/organisms/Table";
import { createClient } from "@/lib/supabase/client";
import {
  ASSIGN_BRIDGE_FOR_ROLE_VIEW_COLUMNS,
  renderNewBridgeDonorTableCell,
} from "@/components/organisms/AssignBridgeForRoleView/columns";
import { Selection } from "@nextui-org/react";
import { assignUsersToBridge } from "@/components/organisms/AssignBridgeForRoleView/actions";
import Modal from "@/components/molecules/Modal";

interface Props {
  roleId: number;
  roleName: string;
  bridge: any;
}

const AssignBridgeForRoleView = ({ roleId, roleName, bridge }: Props) => {
  const supabase = createClient();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserByRole = async () => {
      let query = supabase
        .from("view_user_data_rean")
        .select("*")
        .eq("role_id", roleId)
        .eq("status", "active");
      if (roleId === 6) {
        query = query
          .is("bridge_id", null)
          .eq("blood_group", bridge.blood_group);
      }
      const { data, error } = await query;
      if (error) throw error;
      setData(data);
    };
    fetchUserByRole();
  }, [bridge.blood_group, roleId, supabase]);

  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const selectedUsers = useMemo(() => {
    const selectedKeysArray = Array.from(selectedKeys);
    return data.filter((user) => selectedKeysArray.includes(user.user_id));
  }, [selectedKeys, data]);

  const handleAssignUsersToBridge = async () => {
    const userIds = selectedUsers.map((user) => user.user_id);
    try {
      await assignUsersToBridge({
        bridgeId: bridge.bridge_id,
        roleId: roleId,
        userIds: userIds,
      });
      // Optionally, you can add success notifications here
    } catch (error) {
      return error;
      // Optionally, handle errors (e.g., show a notification)
    }
  };

  return (
    <Modal
      size="2xl"
      // scrollBehavior="outside"
      header={<div className="text-lg font-semibold">Assign {roleName}</div>}
      body={
        <div>
          <Table
            searchable
            data={data as Record<string, any>[]}
            columns={ASSIGN_BRIDGE_FOR_ROLE_VIEW_COLUMNS}
            headerContent={
              <>
                {selectedKeys !== "all" && selectedKeys.size > 0 && (
                  <Modal
                    size="md"
                    isButton={true}
                    body={
                      <>
                        Are you sure you want to assign {bridge.role_name}:{" "}
                        {selectedUsers.map((user) => user.name).join(", ")}
                      </>
                    }
                    onSuccess={() => {
                      handleAssignUsersToBridge();
                    }}
                    successButton="Assign"
                  >
                    <>Assign {roleName} s</>
                  </Modal>
                )}
              </>
            }
            renderCell={renderNewBridgeDonorTableCell}
            selectionMode="multiple"
            onSelectionChange={setSelectedKeys}
            selectedKeys={selectedKeys}
            initialRowsPerPage={5}
          />
        </div>
      }
      onSuccess={() => {}}
      successButton={"Confirm"}
      isButton
    >
      <span className="material-symbols-rounded">add</span>Assign {roleName}
    </Modal>
  );
};

export default AssignBridgeForRoleView;
