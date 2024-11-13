"use server";
import { createClient } from "@/lib/supabase/client";
import { getUserInfo } from "@/lib/supabase/user";
import { filterFormData } from "@/utils/functions";
import { Message } from "@/utils/types";

export const scheduleDonationAction = async (
  state: undefined | Message,
  formData: FormData
) => {
  const formFields = filterFormData(formData);
  const { data: user } = await getUserInfo();
  if (user) {
    formFields.created_by = user?.user_id;
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tracker_donation_schedule")
    .insert([formFields])
    .select();

  if (error) {
    return { error: error.message };
  }
  if (data) return { success: "Submitted successfully" };
  return { error: "Something went wrong. Please try again" };
};
