"use client";

import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import {
  Autocomplete,
  AutocompleteItem,
  DatePicker,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { DONATION_STATUS_TYPE } from "@/utils/constants";
import { createClient } from "@/lib/supabase/client";
import FormSubmitButton from "@/components/molecules/FormSubmitButton";
import { trackBloodDonationCampAction } from "@/components/organisms/forms/TrackBloodDonationCamp/actions";
import Input from "@/components/atoms/Input";

const TrackBloodDonationCampForm = () => {
  const [state, formAction] = useFormState(
    trackBloodDonationCampAction,
    undefined
  );
  const [autoCompleteFields, setAutoCompleteFields] = useState({
    user_id: "",
    bridge_id: "",
    blood_center_id: "",
  });
  const [campTypeNames, setCampTypeNames] = useState<any[]>([]);
  const [bloodCenters, setBloodCenters] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: campTypeData }, { data: bloodCentersData }] =
        await Promise.all([
          supabase
            .from("master_blood_donation_camp_type")
            .select("camp_type_id, camp_type_name"),
          supabase.from("master_blood_center").select("blood_center_id, name"),
        ]);

      setCampTypeNames(campTypeData || []);
      setBloodCenters(bloodCentersData || []);
    };
    fetchData();
  }, [supabase]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Input
            variant="faded"
            label="Place name"
            labelPlacement="outside"
            placeholder="Enter place name"
            name="place_name"
            isRequired
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Input
            variant="faded"
            label="Pincode"
            labelPlacement="outside"
            placeholder="Enter pincode"
            name="pincode"
            isRequired
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Input
            variant="faded"
            label="Point of contact name"
            labelPlacement="outside"
            placeholder="Enter point of contact name"
            name="point_of_contact_name"
            isRequired
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Input
            variant="faded"
            label="Point of contact number"
            labelPlacement="outside"
            placeholder="Enter point of contact number"
            name="point_of_contact_number"
            isRequired
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Input
            variant="faded"
            label="Email"
            labelPlacement="outside"
            placeholder="Enter email"
            name="email_address"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Select
            variant="faded"
            label="Camp Type"
            labelPlacement="outside"
            placeholder="Select camp type"
            name="camp_type_id"
            isRequired
          >
            {campTypeNames.map((campType) => (
              <SelectItem
                key={campType.camp_type_id}
                value={campType.camp_type_id}
              >
                {campType.camp_type_name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-full sm:w-1/2">
          <DatePicker
            variant="faded"
            name="camp_date"
            label="Camp Date"
            labelPlacement="outside"
            isRequired
            showMonthAndYearPickers
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Select
            variant="faded"
            label="Camp status"
            labelPlacement="outside"
            placeholder="Select camp status"
            name="camp_status_id"
            defaultSelectedKeys={["1"]}
            isRequired
          >
            {DONATION_STATUS_TYPE.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </Select>
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
          <Input
            variant="faded"
            label="Expected donors"
            labelPlacement="outside"
            placeholder="Enter expected donors"
            name="expected_donors"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Input
            variant="faded"
            label="Actual donors"
            labelPlacement="outside"
            placeholder="Enter actual donors"
            name="actual_donors"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <FormSubmitButton errorMessage={state} pendingText="Submitting">
          Submit
        </FormSubmitButton>
      </div>
    </form>
  );
};

export default TrackBloodDonationCampForm;
