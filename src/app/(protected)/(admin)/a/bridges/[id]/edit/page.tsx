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
    .select(`
      bridge_name,
      guardian_name,
      guardian_relationship,
      guardian_mobile,
      secondary_mobile,
      blood_group,
      no_of_units,
      frequency_in_days,
      gender,
      date_of_birth
    `)
    .eq("bridge_id", bridgeId)
    .single();

  if (error) {
    return <div>Error fetching bridge data: {error.message}</div>;
  }

  return (
    <div>
      <Breadcrumbs
        path={[
          { label: "Bridges", href: BRIDGES_PAGE_ROUTE },
          { label: "Edit Bridge" },
        ]}
      />
      <h1 className="text-2xl font-semibold my-4">Edit Bridge</h1>
      <BridgeForm initialData={bridge} bridgeId={bridgeId} />
    </div>
  );
};

export default EditBridgePage;
