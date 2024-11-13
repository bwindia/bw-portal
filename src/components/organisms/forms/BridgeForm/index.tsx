"use client";

import React, { useState } from "react";
import { DatePicker, Select, SelectItem } from "@nextui-org/react";
import Input from "@/components/atoms/Input";
import { BLOOD_GROUP } from "@/utils/constants";
import {
  createBridgeAction,
  editBridgeAction,
} from "@/components/organisms/forms/BridgeForm/actions";
import { useFormState } from "react-dom";
import FormSubmitButton from "@/components/molecules/FormSubmitButton";

interface BridgeFormProps {
  initialData?: {
    bridge_name: string;
    guardian_name: string;
    guardian_relationship: string;
    guardian_mobile: string;
    secondary_mobile?: string;
    blood_group: string;
    no_of_units: number;
    frequency_in_days: number;
    gender: string;
    date_of_birth: string;
  };
  bridgeId?: string;
}

const BridgeForm: React.FC<BridgeFormProps> = ({ initialData, bridgeId }) => {
  const [formData, setFormData] = useState(
    initialData || {
      bridge_name: "",
      guardian_name: "",
      guardian_relationship: "",
      guardian_mobile: "",
      secondary_mobile: "",
      blood_group: "",
      no_of_units: 0,
      frequency_in_days: 0,
      gender: "",
      date_of_birth: "",
    }
  );

  const [state, formAction] = useFormState(
    bridgeId ? createBridgeAction : editBridgeAction,
    undefined
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Input
        label="Bridge Name"
        name="bridge_name"
        value={formData.bridge_name}
        onChange={handleChange}
        required
      />
      <Input
        label="Guardian Name"
        name="guardian_name"
        value={formData.guardian_name}
        onChange={handleChange}
        required
      />
      <Input
        label="Guardian Relationship"
        name="guardian_relationship"
        value={formData.guardian_relationship}
        onChange={handleChange}
        required
      />
      <Input
        label="Guardian Mobile"
        name="guardian_mobile"
        type="tel"
        value={formData.guardian_mobile}
        onChange={handleChange}
        required
      />
      <Input
        label="Secondary Mobile"
        name="secondary_mobile"
        type="tel"
        value={formData.secondary_mobile}
        onChange={handleChange}
      />
      <Select
        label="Blood Group"
        name="blood_group"
        value={formData.blood_group}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            blood_group: e.target.value as string,
          }))
        }
        isRequired
      >
        {BLOOD_GROUP.map((bloodGroup) => (
          <SelectItem key={bloodGroup.value} value={bloodGroup.value}>
            {bloodGroup.label}
          </SelectItem>
        ))}
      </Select>
      <Input
        label="Number of Units"
        name="no_of_units"
        type="number"
        value={formData.no_of_units.toString()}
        onChange={handleChange}
        required
      />
      <Input
        label="Frequency in Days"
        name="frequency_in_days"
        type="number"
        value={formData.frequency_in_days.toString()}
        onChange={handleChange}
        required
      />
      <Select
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, gender: e.target.value as string }))
        }
        required
      >
        <SelectItem value="Male" key="Male">
          Male
        </SelectItem>
        <SelectItem value="Female" key="Female">
          Female
        </SelectItem>
        <SelectItem value="Other" key="Other">
          Other
        </SelectItem>
      </Select>
      <DatePicker label="Date of Birth" name="date_of_birth" isRequired />
      <FormSubmitButton errorMessage={state} pendingText="Submitting...">
        {bridgeId ? "Update Bridge" : "Create Bridge"}
      </FormSubmitButton>
    </form>
  );
};

export default BridgeForm;
