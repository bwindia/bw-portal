import { USERS_PAGE_ROUTE } from "@/utils/routes";
import { redirect } from "next/navigation";
import React from "react";

const AdminPage = () => {
  redirect(USERS_PAGE_ROUTE);
  return <div>Howdy, Admin!</div>;
};

export default AdminPage;
