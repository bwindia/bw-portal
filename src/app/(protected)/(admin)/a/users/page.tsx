import Button from "@/components/atoms/Button";
import Table from "@/components/organisms/Table";
import { createClient } from "@/lib/supabase/client";
import { ADD_USER_PAGE_ROUTE } from "@/utils/routes";
import Link from "next/link";
import React from "react";
import { renderUserTableCell, USER_COLUMNS } from "./columns";

const UsersPage = async () => {
  // write logic for fetching user data
  const supabase = createClient();
  const { data: user_data, error } = await supabase.from("user_data")
    .select(`user_id,
          name,
          mobile,
          email,
          is_active,
          ...master_gender(gender: gender_name),
          ...master_blood_group(blood_group: blood_group_name)
          `);

  if (error) {
    throw error;
  }

  return (
    <div>
        <Table
          searchable
          data={user_data as Record<string, any>[]}
          renderCell={renderUserTableCell}
          columns={USER_COLUMNS}
          headerContent={
            <Link href={ADD_USER_PAGE_ROUTE}>
              <Button
                startContent={
                  <span className="material-symbols-rounded">add</span>
                }
              >
                Add User
              </Button>
            </Link>
          }
        />
    </div>
  );
};

export default UsersPage;
