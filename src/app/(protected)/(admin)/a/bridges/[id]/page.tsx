import { createClient } from "@/lib/supabase/client";
import AssignBridgeForRoleView from "@/components/organisms/AssignBridgeForRoleView";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import { BRIDGES_PAGE_ROUTE, EDIT_BRIDGE_PAGE_ROUTE } from "@/utils/routes";
import Table from "@/components/organisms/Table";
import Link from "next/link";
import { EditIcon } from "@/utils/icons";

const BridgePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const bridgeId = (await params).id;

  const supabase = createClient();
  const { data: bridge_patient_info, error } = await supabase
    .from("bridge_patient_info")
    .select(
      `*,
      ...master_relationship(guardian_relationship: relationship_name),
      ...master_blood_group(blood_group: blood_group_name),
      ...master_gender(gender: gender_name)`
    )
    .eq("bridge_id", bridgeId)
    .single();

  const { data: bridgeUsers, error: bridgeUsersError } = await supabase
    .from("view_user_data_rean")
    .select("*")
    .eq("bridge_id", bridgeId);

  // const { data: new_bridge_donors, error: newBridgeError } = await supabase
  //   .from('user_data')
  //   .select(`
  //     id,
  //     name,
  //     mapping_user_role(role_id),
  //     mapping_bridge_user(bridge_id)
  //   `)
  //   .eq('mapping_user_role.role_id', 6)  // Filter by role_id = 6 (blood-bridge)
  //   .eq('mapping_user_role.active', true) // Optional filter if there's an 'active' field (example)
  //   .leftJoin('mapping_user_role', 'user_data.id', 'mapping_user_role.user_id') // Join with mapping_user_role to filter by role_id
  //   .leftJoin('mapping_bridge_user', 'user_data.id', 'mapping_bridge_user.user_id'); // Join with mapping_bridge_user to check if assigned to a bridge

  if (error || bridgeUsersError) {
    throw error || bridgeUsersError;
  }

  return (
    <div>
      <Breadcrumbs
        path={[
          { label: "Bridges", href: BRIDGES_PAGE_ROUTE },
          { label: bridge_patient_info.bridge_name },
        ]}
      />
      <div className="flex justify-end">
        <Link
          className="text-default-400 hover:text-default-500"
          href={EDIT_BRIDGE_PAGE_ROUTE(bridgeId)}
        >
          {/* <Tooltip content="Edit Bridge Details"> */}
          <span className="flex items-center gap-1">
            <EditIcon />
            <span className="text-sm hidden sm:block">Edit details</span>
          </span>
          {/* </Tooltip> */}
        </Link>
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex">
          <span className="font-semibold w-[180px]">Bridge Name:</span>
          <span>{bridge_patient_info?.bridge_name}</span>
        </div>
        <div className="flex sm:flex-row flex-col gap-2 justify-between">
          <div className="flex sm:w-[50%] w-full">
            <span className="font-semibold w-[180px]">Guardian:</span>
            <span className="flex gap-1">
              <span className="text-bold capitalize">
                {bridge_patient_info.guardian_name}
              </span>
              <span className="text-bold capitalize text-default-400">
                ({bridge_patient_info.guardian_relationship})
              </span>
            </span>
          </div>
          <div className="flex sm:w-[50%] w-full">
            <span className="font-semibold w-[180px]">Mobile:</span>
            <span>
              {bridge_patient_info.guardian_mobile}
              {bridge_patient_info?.secondary_mobile && (
                <span className="text-default-400">
                  &nbsp;/ {bridge_patient_info?.secondary_mobile}
                </span>
              )}
            </span>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col gap-2 justify-between">
          <div className="flex sm:w-[50%] w-full">
            <span className="font-semibold w-[180px]">Blood Group:</span>
            <span>{bridge_patient_info?.blood_group}</span>
          </div>
          <div className="flex sm:w-[50%] w-full">
            <span className="font-semibold w-[180px]">Blood Requirement:</span>
            <span>
              <span>{bridge_patient_info?.no_of_units} unit</span>
              <span className="text-default-400">
                &nbsp;/ {bridge_patient_info.frequency_in_days} days
              </span>
            </span>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col gap-2 justify-between">
          <div className="flex sm:w-[50%] w-full">
            <span className="font-semibold w-[180px]">Gender:</span>
            <span>{bridge_patient_info?.gender}</span>
          </div>
          <div className="flex sm:w-[50%] w-full">
            <span className="font-semibold w-[180px]">Date of Birth:</span>
            <span>{bridge_patient_info?.date_of_birth}</span>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col gap-2 justify-between">
          <div className="flex sm:w-[50%] w-full">
            <span className="font-semibold w-[180px]">Volunteers:</span>
            <div className="flex gap-2 items-center">
              {bridgeUsers?.filter((user) => user.role_id === 3).length
                ? bridgeUsers
                    ?.filter((user) => user.role_id === 3)
                    .map((user) => user.name)
                    .join(", ")
                : "No volunteers assigned"}
            </div>
          </div>
        </div>
      </div>
      <Table
        headerContent={
          <div className="w-full">
            <div className="flex flex-row-reverse gap-2">
              <AssignBridgeForRoleView
                roleName="Volunteers"
                roleId={3}
                bridge={bridge_patient_info}
              />
              <AssignBridgeForRoleView
                roleName="Bridge Donors"
                roleId={6}
                bridge={bridge_patient_info}
              />
            </div>
          </div>
        }
        columns={[
          { key: "name", label: "Name" },
          { key: "phone_number", label: "Phone Number" },
          { key: "last_donation_date", label: "Last Donation Date" },
          { key: "next_eligible_date", label: "Next Eligible Date" },
          { key: "eligibility_status", label: "Eligibility Status" },
        ]}
        data={bridgeUsers?.filter((user) => user.role_id === 6) as any[]}
      />
      <br />
    </div>
  );
};

export default BridgePage;
