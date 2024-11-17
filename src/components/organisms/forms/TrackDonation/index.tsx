"use client";

import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import {
  Autocomplete,
  AutocompleteItem,
  DatePicker,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import {
  BLOOD_TYPE,
  DONATION_STATUS_TYPE,
  DONATION_TYPE,
} from "@/utils/constants";
import { createClient } from "@/lib/supabase/client";
import FormSubmitButton from "@/components/molecules/FormSubmitButton";
import { trackDonationAction } from "@/components/organisms/forms/TrackDonation/action";

const TrackDonationForm = () => {
  const [donationType, setDonationType] = useState<string>();
  const [state, formAction] = useFormState(trackDonationAction, undefined);
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
    const fetchData = async () => {
      const [
        { data: userData },
        { data: bridgeData },
        { data: bloodCenterData },
      ] = await Promise.all([
        supabase.from("user_data").select("user_id, name"),
        supabase.from("bridge_patient_info").select("bridge_id, bridge_name"),
        supabase.from("master_blood_center").select("blood_center_id, name"),
      ]);

      setUserNames(userData || []);
      setBridges(bridgeData || []);
      setBloodCenters(bloodCenterData || []);
    };
    fetchData();
  }, [supabase]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Autocomplete
            variant="faded"
            label="Name"
            placeholder="Enter Name"
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
        <div className="w-full sm:w-1/2 hidden sm:block">
          <input hidden name="user_id" value={autoCompleteFields.user_id} />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Select
            variant="faded"
            label="Donation type"
            labelPlacement="outside"
            placeholder="Select donation type"
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
        <div className="w-full sm:w-1/2">
          {donationType === "2" && (
            <>
              <Autocomplete
                variant="faded"
                name="bridge_id"
                label="Blood Bridge"
                labelPlacement="outside"
                placeholder="Enter blood bridge name"
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
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Autocomplete
            variant="faded"
            name="blood_center_id"
            label="Blood Center"
            labelPlacement="outside"
            placeholder="Enter blood center"
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
          <input
            hidden
            name="blood_center_id"
            value={autoCompleteFields.blood_center_id}
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Select
            variant="faded"
            label="Blood type"
            labelPlacement="outside"
            placeholder="Select blood type"
            name="blood_type_id"
            defaultSelectedKeys={["2"]}
            isRequired
          >
            {BLOOD_TYPE.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Select
            variant="faded"
            label="Donation status"
            labelPlacement="outside"
            placeholder="Select donation status"
            name="donation_status_id"
            isRequired
          >
            {DONATION_STATUS_TYPE.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-full sm:w-1/2">
          <DatePicker
            variant="faded"
            name="donation_date"
            label="Donation Date"
            labelPlacement="outside"
            isRequired
            showMonthAndYearPickers
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full">
          <Textarea
            variant="faded"
            label="Comments"
            labelPlacement="outside"
            placeholder="Enter any comments"
            name="comments"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-end gap-4 sm:gap-2">
        <FormSubmitButton errorMessage={state} pendingText="Submitting">
          Submit
        </FormSubmitButton>
      </div>
    </form>
  );
};

export default TrackDonationForm;
