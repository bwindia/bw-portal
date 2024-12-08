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

interface Props {
  scheduleRequestId?: string;
}

const ScheduleDonationForm = ({ scheduleRequestId }: Props) => {
  const [donationType, setDonationType] = useState<string>();
  const [state, formAction] = useFormState(scheduleDonationAction, undefined);
  const [autoCompleteFields, setAutoCompleteFields] = useState({
    user_id: "",
    bridge_id: "",
    blood_center_id: "",
  });
  const [users, setUsers] = useState<any[]>([]);
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
        supabase.from("user_data").select("user_id, name, mobile"),
        supabase.from("bridge_patient_info").select("bridge_id, bridge_name"),
        supabase.from("master_blood_center").select("blood_center_id, name"),
      ]);
      setUsers(userData || []);
      setBridges(bridgeData || []);
      setBloodCenters(bloodCenterData || []);
    };
    fetchData();
    if (scheduleRequestId) {
      const fetchScheduleData = async () => {
        const { data, error } = await supabase
          .from("tracker_emergency_request")
          .select("request_type, bridge_id")
          .eq("id", scheduleRequestId)
          .single();
        console.log("data", data, error);
        setDonationType(data?.request_type?.toString());
        setAutoCompleteFields((prev) => ({
          ...prev,
          bridge_id: data?.bridge_id,
        }));
      };
      fetchScheduleData();
    }
  }, [supabase, scheduleRequestId]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Autocomplete
            // name="user_id"
            label="Name"
            variant="faded"
            placeholder="Search by name"
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
            {users.map((user) => (
              <AutocompleteItem key={user.user_id} value={user.name}>
                {`${user.name} - +${user.mobile}`}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
        <div className="w-full sm:w-1/2 hidden sm:block">
          <input
            hidden
            name="user_id"
            value={autoCompleteFields.user_id}
            readOnly
          />
          {scheduleRequestId && (
            <input
              hidden
              name="schedule_request_id"
              value={scheduleRequestId}
              readOnly
            />
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Select
            label="Donation type"
            labelPlacement="outside"
            variant="faded"
            placeholder="Select donation type"
            name="donation_type_id"
            selectedKeys={donationType ? [donationType] : []}
            onSelectionChange={(keys) =>
              setDonationType(Array.from(keys)[0]?.toString())
            }
            isDisabled={!!scheduleRequestId}
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
                name="bridge_id"
                label="Blood Bridge"
                labelPlacement="outside"
                variant="faded"
                placeholder="Search by blood bridge"
                selectedKey={autoCompleteFields.bridge_id}
                onSelectionChange={(key) =>
                  setAutoCompleteFields((prev) => ({
                    ...prev,
                    bridge_id: key as string,
                  }))
                }
                isDisabled={
                  !!scheduleRequestId && !!autoCompleteFields.bridge_id
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
                readOnly
              />
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Autocomplete
            name="blood_center_id"
            label="Blood Center"
            labelPlacement="outside"
            variant="faded"
            placeholder="Search by blood center"
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
        <div className="w-full sm:w-1/2 hidden sm:block">
          <input
            hidden
            name="blood_center_id"
            value={autoCompleteFields.blood_center_id}
            readOnly
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <DatePicker
            name="date_of_donation"
            label="Donation Date"
            labelPlacement="outside"
            variant="faded"
            isRequired
            showMonthAndYearPickers
          />
        </div>
        <div className="w-full sm:w-1/2">
          <TimeInput
            name="time_of_donation"
            labelPlacement="outside"
            label="Donation Time"
            variant="faded"
            isRequired
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-end gap-4 sm:gap-2">
        <div>
          <FormSubmitButton errorMessage={state} pendingText="Submitting">
            Submit
          </FormSubmitButton>
        </div>
      </div>
    </form>
  );
};

export default ScheduleDonationForm;
