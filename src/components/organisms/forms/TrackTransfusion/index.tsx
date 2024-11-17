"use client";

import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Autocomplete, AutocompleteItem, DatePicker } from "@nextui-org/react";
import { createClient } from "@/lib/supabase/client";
import FormSubmitButton from "@/components/molecules/FormSubmitButton";
import { trackTransfusionAction } from "@/components/organisms/forms/TrackTransfusion/action";
import Input from "@/components/atoms/Input";

const TrackTransfusionForm = () => {
  const [state, formAction] = useFormState(trackTransfusionAction, undefined);
  const [autoCompleteFields, setAutoCompleteFields] = useState({
    bridge_id: "",
    blood_center_id: "",
  });
  const [bridges, setBridges] = useState<any[]>([]);
  const [bloodCenters, setBloodCenters] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: bridgesData }, { data: bloodCentersData }] =
        await Promise.all([
          supabase.from("bridge_patient_info").select("bridge_id, bridge_name"),
          supabase.from("master_blood_center").select("blood_center_id, name"),
        ]);

      setBridges(bridgesData || []);
      setBloodCenters(bloodCentersData || []);
    };
    fetchData();
  }, [supabase]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Autocomplete
            variant="faded"
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
              <AutocompleteItem key={bridge.bridge_id} value={bridge.bridge_id}>
                {bridge.bridge_name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <input hidden name="bridge_id" value={autoCompleteFields.bridge_id} />
        </div>
        <div className="w-full sm:w-1/2">
          <Autocomplete
            variant="faded"
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
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <DatePicker
            variant="faded"
            name="transfusion_date"
            label="Transfusion Date"
            labelPlacement="outside"
            isRequired
            showMonthAndYearPickers
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Input
            type="text"
            variant="faded"
            label="HB level"
            labelPlacement="outside"
            placeholder="Enter hemoglobin level"
            name="hb_level"
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

export default TrackTransfusionForm;
