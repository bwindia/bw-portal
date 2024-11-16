"use server";

import { createClient } from "@/lib/supabase/server";
import { getUserInfo } from "@/lib/supabase/user";
import { filterFormData } from "@/utils/functions";
import { BRIDGE_DETAILS_PAGE_ROUTE, BRIDGES_PAGE_ROUTE } from "@/utils/routes";
import { Message } from "@/utils/types";
import { revalidatePath } from "next/cache";
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

  // Remove fields with empty values
  Object.keys(formFields).forEach((key) => {
    if (formFields[key] === "") {
      delete formFields[key];
    }
  });

  const supabase = createClient();

  const { error } = await supabase
    .from("bridge_patient_info")
    .insert([formFields]);

  if (error) {
    return { error: error.message };
  }
  revalidatePath(BRIDGES_PAGE_ROUTE);
  redirect(BRIDGES_PAGE_ROUTE);
};

export const editBridgeAction = async (
  state: undefined | Message,
  formData: FormData
) => {
  const formFields = filterFormData(formData);
  const { data: user } = await getUserInfo();

  if (user) {
    formFields.last_modified_by = user.user_id;
  }

  // Remove fields with empty values
  Object.keys(formFields).forEach((key) => {
    if (formFields[key] === "") {
      delete formFields[key];
    }
  });

  const supabase = createClient();

  const { error } = await supabase
    .from("bridge_patient_info")
    .update(formFields)
    .eq("bridge_id", formFields.bridge_id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(BRIDGES_PAGE_ROUTE);
  revalidatePath(BRIDGE_DETAILS_PAGE_ROUTE(formFields?.bridge_id as string));
  redirect(BRIDGE_DETAILS_PAGE_ROUTE(formFields?.bridge_id as string));
};
