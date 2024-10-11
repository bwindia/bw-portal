import Button from "@/components/atoms/Button";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import Table from "@/components/organisms/Table";
import { renderCell } from "@/components/organisms/Table/columns";
import { createClient } from "@/lib/supabase/client";
import { USERS_TABLE_COLUMNS } from "@/utils/constants";
import { ADD_USER_PAGE_ROUTE } from "@/utils/routes";
import Link from "next/link";
import React from "react";

const UsersPage = async () => {
  // write logic for fetching user data
  const supabase = createClient();
  const { data: user_data } = await supabase.from("user_data")
    .select(`user_id,
          name,
          mobile,
          email,
          gender:master_gender(gender_name),
          blood_group:master_blood_group(blood_group_name)
          `);

  const formattedData = (user_data as Record<string, any>[]).map((user) => ({
    ...user,
    gender: user.gender?.gender_name,  // Flatten the gender object
    blood_group: user.blood_group?.blood_group_name,  // Flatten the gender object
  }));

  return (
    <div>
      <Breadcrumb />
      <div>
        <div className="float-right">
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
        <Table
          searchable
          data={formattedData as Record<string, any>[]}
          renderCell={renderCell}
          columns={USERS_TABLE_COLUMNS}
        />
      </div>
    </div>
  );
};

export default UsersPage;
