import React from "react";
import BridgeForm from "@/components/organisms/forms/BridgeForm";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import { BRIDGES_PAGE_ROUTE } from "@/utils/routes";

const CreateBridgePage = () => {
  return (
    <div>
      <Breadcrumbs
        path={[
          { label: "Bridges", href: BRIDGES_PAGE_ROUTE },
          { label: "Create New Bridge" },
        ]}
      />
      <h1 className="text-2xl font-semibold my-4">Create New Bridge</h1>
      <BridgeForm />
    </div>
  );
};

export default CreateBridgePage;
