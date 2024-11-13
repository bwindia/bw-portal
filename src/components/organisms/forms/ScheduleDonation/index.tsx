"use client";

import React, { useEffect, useState } from "react";
import { scheduleDonationAction } from "@/components/organisms/forms/ScheduleDonation/action";
import { useFormState } from "react-dom";
import {
  Autocomplete,
  AutocompleteItem,
  DatePicker,
  Select,
  SelectItem,
  TimeInput,
} from "@nextui-org/react";
import { DONATION_TYPE } from "@/utils/constants";
import { createClient } from "@/lib/supabase/client";
import FormSubmitButton from "@/components/molecules/FormSubmitButton";

const ScheduleDonationForm = () => {
  const [donationType, setDonationType] = useState<string>();
  const [state, formAction] = useFormState(scheduleDonationAction, undefined);
  const [autoCompleteFields, setAutoCompleteFields] = useState({
    user_id: "",
    bridge_id: "",
    blood_center_id: "",
  });
  const [userNames, setUserNames] = useState<any[]>([]);
  const [bridges, setBridges] = useState<any[]>([]);
  const [bloodCenters, setBloodCenters] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchUserNames = async () => {
      const { data, error } = await supabase
        .from("user_data")
        .select("user_id, name");

      if (error) throw error;
      console.log(data);
      setUserNames(data);
    };
    fetchUserNames();
    const fetchBridges = async () => {
      const { data, error } = await supabase
        .from("bridge_patient_info")
        .select("bridge_id, bridge_name");

      if (error) throw error;

      setBridges(data);
    };
    fetchBridges();
    const fetchBloodCenters = async () => {
      const { data, error } = await supabase
        .from("master_blood_center")
        .select("blood_center_id, name");

      if (error) throw error;

      setBloodCenters(data);
    };
    fetchBloodCenters();
  }, [supabase]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="w-1/2">
          <Autocomplete
            // name="user_id"
            label="Name"
            labelPlacement="outside"
            selectedKey={autoCompleteFields.user_id}
            onSelectionChange={(key) =>
              setAutoCompleteFields((prev) => ({
                ...prev,
                user_id: key as string,
              }))
            }
            isRequired
          >
            {userNames.map((user) => (
              <AutocompleteItem key={user.user_id} value={user.user_id}>
                {user.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
        <div className="w-1/2">
          <input hidden name="user_id" value={autoCompleteFields.user_id} />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-1/2">
          <Select
            label="Donation type"
            labelPlacement="outside"
            name="donation_type_id"
            value={donationType}
            onChange={(e) => setDonationType(e.target.value)}
            isRequired
          >
            {DONATION_TYPE.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-1/2">
          {donationType === "2" && (
            <>
              <Autocomplete
                name="bridge_id"
                label="Blood Bridge"
                labelPlacement="outside"
                selectedKey={autoCompleteFields.bridge_id}
                onSelectionChange={(key) =>
                  setAutoCompleteFields((prev) => ({
                    ...prev,
                    bridge_id: key as string,
                  }))
                }
                isRequired
              >
                {bridges.map((bridge) => (
                  <AutocompleteItem
                    key={bridge.bridge_id}
                    value={bridge.bridge_id}
                  >
                    {bridge.bridge_name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <input
                hidden
                name="bridge_id"
                value={autoCompleteFields.bridge_id}
              />
            </>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-1/2">
          <Autocomplete
            name="blood_center_id"
            label="Blood Center"
            labelPlacement="outside"
            selectedKey={autoCompleteFields.blood_center_id}
            onSelectionChange={(key) =>
              setAutoCompleteFields((prev) => ({
                ...prev,
                blood_center_id: key as string,
              }))
            }
            isRequired
          >
            {bloodCenters.map((center) => (
              <AutocompleteItem
                key={center.blood_center_id}
                value={center.blood_center_id}
              >
                {center.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
        <div className="w-1/2">
          <input
            hidden
            name="blood_center_id"
            value={autoCompleteFields.blood_center_id}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-1/2">
          <DatePicker
            name="date_of_donation"
            label="Donation Date"
            labelPlacement="outside"
            isRequired
            showMonthAndYearPickers
          />
        </div>
        <div className="w-1/2">
          <TimeInput
            name="time_of_donation"
            labelPlacement="outside"
            label="Donation Time"
            isRequired
          />
        </div>
      </div>
      Things to add: Created/Submitted by - user
      <FormSubmitButton errorMessage={state} pendingText="Submitting">
        Submit
      </FormSubmitButton>
    </form>
  );
};

export default ScheduleDonationForm;
