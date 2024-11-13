"use server";

import { createClient } from "@/lib/supabase/server";
import { getUserInfo } from "@/lib/supabase/user";
import { filterFormData } from "@/utils/functions";
import { BRIDGES_PAGE_ROUTE } from "@/utils/routes";
import { Message } from "@/utils/types";
import { redirect } from "next/navigation";

// interface BridgeFormFields {
//   bridge_name: string;
//   guardian_name: string;
//   guardian_relationship: string;
//   guardian_mobile: string;
//   secondary_mobile?: string;
//   blood_group: string;
//   no_of_units: number;
//   frequency_in_days: number;
//   gender: string;
//   date_of_birth: string;
//   [key: string]: any;
// }

export const createBridgeAction = async (
  state: undefined | Message,
  formData: FormData
) => {
  const formFields = filterFormData(formData);
  const { data: user } = await getUserInfo();

  if (user) {
    formFields.created_by = user.user_id;
  }

  const supabase = createClient();

  const { error } = await supabase
    .from("bridge_patient_info")
    .insert([formFields]);

  if (error) {
    return { error: error.message };
  }
  redirect(BRIDGES_PAGE_ROUTE);
  //   return { success: "Bridge created successfully" };
};

export const editBridgeAction = async (
//   bridgeId: string,
  state: undefined | Message,
  formData: FormData
) => {
  const formFields = filterFormData(formData);
  const { data: user } = await getUserInfo();

  if (user) {
    formFields.updated_by = user.user_id;
    formFields.updated_at = new Date().toISOString();
  }

  const supabase = createClient();

  const { error } = await supabase
    .from("bridge_patient_info")
    .update(formFields)
    .eq("bridge_id", formFields.bridgeId);

  if (error) {
    return { error: error.message };
  }
  redirect(BRIDGES_PAGE_ROUTE);
  //   return { success: "Bridge updated successfully" };
};
