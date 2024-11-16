"use client";

import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  DatePicker,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Input from "@/components/atoms/Input";
import { BLOOD_GROUP, GENDER, GUARDIAN_RELATIONSHIP } from "@/utils/constants";
import {
  createBridgeAction,
  editBridgeAction,
} from "@/components/organisms/forms/BridgeForm/actions";
import { useFormState } from "react-dom";
import FormSubmitButton from "@/components/molecules/FormSubmitButton";
import { parseDate } from "@internationalized/date";
import Button from "@/components/atoms/Button";
import Link from "next/link";
import { BRIDGES_PAGE_ROUTE } from "@/utils/routes";
import { createClient } from "@/lib/supabase/client";

interface BridgeFormProps {
  bridgeData?: any;
}

const BridgeForm: React.FC<BridgeFormProps> = ({ bridgeData }) => {
  const [state, formAction] = useFormState(
    bridgeData?.bridge_id ? editBridgeAction : createBridgeAction,
    undefined
  );
  const [autocompleteValue, setAutocompleteValue] = useState({
    user_id: "",
  });
  const [bridgeUsers, setBridgeUsers] = useState<any[]>([]);

  useEffect(() => {
    const getNewBridgeUsers = async () => {
      if (!bridgeData?.bridge_id) {
        const supabase = createClient();
        const { data: user, error } = await supabase
          .from("user_data")
          .select(
            `user_id, name, roles:mapping_user_role!fk_user_id(role_id),
            bridge:bridge_patient_info!bridge_info_user_id_fkey(*)
            `
          )
          .eq("mapping_user_role.role_id", 2)
          .eq("mapping_user_role.role_status", true)
          .eq("is_active", true);
        // .eq("mapping_bridge_user_role", bridgeData?.user_id);
        if (error) throw error;
        const filteredUser = user?.filter(
          (user) =>
            user.roles.some((role) => role.role_id === 2) && !user.bridge.length
        );
        setBridgeUsers(filteredUser || []);
      }
    };
    getNewBridgeUsers();
  }, [bridgeData]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {bridgeData?.bridge_id && (
        <Input
          type="hidden"
          name="bridge_id"
          defaultValue={bridgeData?.bridge_id}
        />
      )}

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          {bridgeData?.user_id ? (
            <Input
              label="User ID"
              labelPlacement="outside"
              variant="faded"
              defaultValue={`${bridgeData?.user_name} - ${bridgeData?.user_id}`}
              isReadOnly={bridgeData?.user_id}
            />
          ) : (
            <>
              <Autocomplete
                label="User"
                name="user_id"
                labelPlacement="outside"
                isRequired
                placeholder="Enter User"
                selectedKey={autocompleteValue.user_id}
                onSelectionChange={(key) =>
                  setAutocompleteValue((prev) => ({
                    ...prev,
                    user_id: key as string,
                  }))
                }
                variant="faded"
              >
                {bridgeUsers.map((user) => (
                  <AutocompleteItem key={user.user_id} value={user.user_id}>
                    {user.name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <input
                type="hidden"
                name="user_id"
                value={autocompleteValue.user_id}
              />
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Input
            label="Bridge Name"
            name="bridge_name"
            labelPlacement="outside"
            variant="faded"
            placeholder="Enter Bridge Name"
            defaultValue={bridgeData?.bridge_name}
            required
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Select
            label="Blood Group"
            name="blood_group_id"
            labelPlacement="outside"
            variant="faded"
            placeholder="Select Blood Group"
            defaultSelectedKeys={[bridgeData?.blood_group_id?.toString()]}
            isRequired
          >
            {BLOOD_GROUP.map((bloodGroup) => (
              <SelectItem key={bloodGroup.value} value={bloodGroup.value}>
                {bloodGroup.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Input
            label="Guardian Name"
            name="guardian_name"
            labelPlacement="outside"
            variant="faded"
            placeholder="Enter Guardian Name"
            defaultValue={bridgeData?.guardian_name}
            required
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Select
            label="Guardian Relationship"
            name="guardian_relationship"
            labelPlacement="outside"
            variant="faded"
            placeholder="Select Guardian Relationship"
            defaultSelectedKeys={[
              bridgeData?.guardian_relationship?.toString(),
            ]}
            required
          >
            {GUARDIAN_RELATIONSHIP.map((relationship) => (
              <SelectItem key={relationship.value} value={relationship.value}>
                {relationship.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Input
            label="Guardian Mobile"
            name="guardian_mobile"
            type="tel"
            labelPlacement="outside"
            variant="faded"
            placeholder="Enter Guardian Mobile"
            defaultValue={bridgeData?.guardian_mobile}
            required
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Input
            label="Secondary Mobile"
            name="secondary_mobile"
            type="tel"
            labelPlacement="outside"
            variant="faded"
            placeholder="Enter Secondary Mobile"
            defaultValue={bridgeData?.secondary_mobile}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Input
            label="Number of Units"
            name="no_of_units"
            type="number"
            labelPlacement="outside"
            variant="faded"
            placeholder="Enter Number of Units"
            defaultValue={bridgeData?.no_of_units.toString()}
            required
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Input
            label="Frequency in Days"
            name="frequency_in_days"
            type="number"
            labelPlacement="outside"
            variant="faded"
            placeholder="Enter Frequency in Days"
            defaultValue={bridgeData?.frequency_in_days.toString()}
            required
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Select
            label="Gender"
            name="gender_id"
            labelPlacement="outside"
            variant="faded"
            placeholder="Select Gender"
            defaultSelectedKeys={[bridgeData?.gender_id?.toString()]}
            isRequired
          >
            {GENDER.map((gender) => (
              <SelectItem key={gender.value} value={gender.value}>
                {gender.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-full sm:w-1/2">
          <DatePicker
            showMonthAndYearPickers
            label="Date of Birth"
            name="date_of_birth"
            labelPlacement="outside"
            variant="faded"
            defaultValue={
              bridgeData?.date_of_birth
                ? parseDate(bridgeData.date_of_birth)
                : undefined
            }
            isRequired
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-4 sm:gap-2 mt-1">
        <div>
          <Button className="w-full sm:w-auto" variant="light" color="primary">
            <Link href={BRIDGES_PAGE_ROUTE}>Cancel</Link>
          </Button>
        </div>
        <FormSubmitButton errorMessage={state} pendingText="Submitting...">
          {bridgeData?.bridge_id ? "Update Bridge" : "Create Bridge"}
        </FormSubmitButton>
      </div>
    </form>
  );
};

export default BridgeForm;
