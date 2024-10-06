import Breadcrumb from "@/components/molecules/Breadcrum";
import { Button } from "@nextui-org/react";
import React from "react";

const ManageUserPage = () => {
  return (
    <div>
      <Breadcrumb />
      <div className="flex gap-4 items-center">
        <Button radius="full">Full</Button>
        <Button radius="lg">Large</Button>
        <Button radius="md">Medium</Button>
        <Button radius="sm">Small</Button>
        <Button radius="none">None</Button>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <Button color="default">Default</Button>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="danger">Danger</Button>
      </div>
    </div>
  );
};

export default ManageUserPage;
