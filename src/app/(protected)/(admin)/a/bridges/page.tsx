import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import Button from "@/components/atoms/Button";
import Table from "@/components/organisms/Table";
import { createClient } from "@/lib/supabase/client";
import { ADD_BRIDGE_PAGE_ROUTE } from "@/utils/routes";
import Link from "next/link";
import React from "react";
import {
  BRIDGE_COLUMNS,
  renderBridgeTableCell,
} from "@/app/(protected)/(admin)/a/bridges/columns";

const BridgesPage = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bridge_patient_info")
    .select(
      `id: bridge_id,
          bridgeName: bridge_name,
          mobile: guardian_mobile,
          ...master_blood_group(bloodGroup: blood_group_name),
          ...master_gender(gender: gender_name)
          `
    )
    .eq("is_active", true);

  if (error) {
    throw error;
  }

  return (
    <div>
      <Breadcrumbs />
      <Table
        searchable
        data={data as Record<string, any>[]}
        renderCell={renderBridgeTableCell}
        columns={BRIDGE_COLUMNS}
        headerContent={
          <Link href={ADD_BRIDGE_PAGE_ROUTE}>
            <Button
              startContent={
                <span className="material-symbols-rounded">add</span>
              }
            >
              Add Bridge
            </Button>
          </Link>
        }
      />
    </div>
  );
};

export default BridgesPage;
