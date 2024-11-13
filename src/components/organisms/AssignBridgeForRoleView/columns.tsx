"use client";

import Modal from "@/components/molecules/Modal";
import { createClient } from "@/lib/supabase/client";
import { DeleteIcon } from "@/utils/icons";
import { Button, Tooltip, User } from "@nextui-org/react";

export const ASSIGN_BRIDGE_FOR_ROLE_VIEW_COLUMNS = [
  { key: "name", label: "Name", isSortable: true, isSearchable: true },
  { key: "phone_number", label: "Mobile" },
  // { key: "blood_group", label: "Blood Group" },
  // { key: "gender", label: "Gender" },
  // { key: "actions", label: "" }, 
]

const handleAssignDonor = async (donor: any) => {
    try {
      // Insert into bridge_patient_info
      const mappingData = {
        bridge_id: donor.id,
        user_id: donor.user_id, // Adjust according to your donor data structure
        role_id: 6, // Assuming role_id 6 is for donors
      };
      const supabase = createClient();
      const { error } = await supabase
        .from("mapping_bridge_user_role")
        .insert([
          {
            bridge_id: mappingData.bridge_id,
            user_id: mappingData.user_id,
            role_id: mappingData.role_id,
            // created_by: user.id,
          },
        ]);
    
      if (error) {
        throw error;
      }
      alert("Donor assigned successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to assign donor.");
    }
  };
export const renderNewBridgeDonorTableCell = (row: Record<string, any>, columnKey: React.Key) => {
    const cellValue = row[columnKey as keyof object];
  
    switch (columnKey) {
      case "name":
        return <User
        avatarProps={{
          radius: "full",
          className: "",
          // src: user.,
          showFallback: true,
          fallback: (
            <>
              <span className="material-symbols-rounded text-default-500">
                {row.gender === "Male"
                  ? "male"
                  : row.gender === "Female"
                  ? "female"
                  : "question_mark"}
              </span>
            </>
          ),
        }}
        description={row.blood_group}
        name={row.name}
      >
        {row.name}
      </User>
      case "actions":
        return (
          <div className="relative flex items-center gap-4">
            <Button onClick={() => handleAssignDonor(row)}>
                  Assign to Bridge
                </Button>
            <Tooltip color="danger" content="Delete user">
              <span className="cursor-pointer text-lg text-danger active:opacity-50">
                <Modal
                  body={<>Are you sure you want to delete it</>}
                  onSuccess={() => {
                    console.log(
                      "deleting user of id: " +
                        row["bridgeName" as keyof object]
                    );
                  }}
                  successButton="Delete"
                >
                  <DeleteIcon />
                </Modal>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue ? cellValue : <>--</>;
    }
  };
