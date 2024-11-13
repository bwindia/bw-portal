"use server";

import { createClient } from "@/lib/supabase/client";
import { getUserInfo } from "@/lib/supabase/user";
import { filterFormData } from "@/utils/functions";
import { Message } from "@/utils/types";

export const trackTransfusionAction = async (
  state: undefined | Message,
  formData: FormData
) => {
  const formFields = filterFormData(formData);
  const { data: user } = await getUserInfo();
  if (user) {
    formFields.created_by = user?.user_id;
  }
  if (isNaN(Number(formFields.hb_level))) {
    return { error: "HB level must be a number" };
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tracker_blood_bridge_transfusion")
    .insert([formFields])
    .select();

  if (error) {
    return { error: error.message };
  }
  if (data) return { success: "Submitted successfully" };
  return { error: "Something went wrong. Please try again" };
};
