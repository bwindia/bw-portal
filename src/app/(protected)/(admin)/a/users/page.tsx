import Button from "@/components/atoms/Button";
import Table from "@/components/organisms/Table";
import { createClient } from "@/lib/supabase/client";
import { ADD_USER_PAGE_ROUTE, IMPORT_USERS_PAGE_ROUTE } from "@/utils/routes";
import Link from "next/link";
import React from "react";
import { renderUserTableCell, USER_COLUMNS } from "./columns";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";

const UsersPage = async () => {
  // write logic for fetching user data
  const supabase = createClient();
  const { data: user_data, error } = await supabase
    .from("user_data")
    .select(
      `user_id,
          name,
          mobile,
          email,
          is_active,
          ...master_gender(gender: gender_name),
          ...master_blood_group(blood_group: blood_group_name),
          roles:mapping_user_role!fk_user_id(...master_user_role(role))
          `
    )
    .eq("mapping_user_role.role_status", true);

  if (error) {
    throw error;
  }

  return (
    <div>
      <Breadcrumbs />
      <Table
        searchable
        data={user_data as Record<string, any>[]}
        renderCell={renderUserTableCell}
        columns={USER_COLUMNS}
        searchPlaceholder="Search by name or mobile"
        headerContent={
          <div className="flex gap-2">
            <Link href={IMPORT_USERS_PAGE_ROUTE}>
              <Button
                startContent={
                  <span className="material-symbols-rounded">upload</span>
                }
                color="default"
              >
                Import
              </Button>
            </Link>
            <Link href={ADD_USER_PAGE_ROUTE}>
              <Button
                startContent={
                  <span className="material-symbols-rounded">add</span>
                }
              >
                Add User
              </Button>
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default UsersPage;
