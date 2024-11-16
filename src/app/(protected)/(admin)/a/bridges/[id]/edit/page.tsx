import React from "react";
import BridgeForm from "@/components/organisms/forms/BridgeForm";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import { BRIDGES_PAGE_ROUTE } from "@/utils/routes";
import { createClient } from "@/lib/supabase/server";

interface EditBridgePageProps {
  params: {
    id: string;
  };
}

const EditBridgePage = async ({ params }: EditBridgePageProps) => {
  const bridgeId = params.id;
  const supabase = createClient();

  const { data: bridge, error } = await supabase
    .from("bridge_patient_info")
    .select("*, ...user_data!bridge_info_user_id_fkey(user_name: name)")
    .eq("bridge_id", bridgeId)
    .single();

  if (error) {
    throw error;
  }

  return (
    <div>
      <Breadcrumbs
        path={[
          { label: "Bridges", href: BRIDGES_PAGE_ROUTE },
          { label: "Edit Bridge", href: "#" },
          { label: bridge?.bridge_name },
        ]}
      />
      <BridgeForm bridgeData={bridge} />
    </div>
  );
};

export default EditBridgePage;
