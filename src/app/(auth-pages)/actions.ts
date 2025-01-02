"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  ADMIN_PAGE_ROUTE,
  SIGN_IN_PATH,
  VERIFY_OTP_PATH,
} from "@/utils/routes";
import { Message } from "@/utils/types";

export const signInAction = async (
  state: undefined | Message,
  formData: FormData
) => {
  const phoneFormdata = formData.get("phone") as string;
  const countryCode = formData.get("country_code") as string;
  if (!phoneFormdata.trim()) {
    return { error: "Phone number can not be empty" };
  }
  if (isNaN(parseInt(phoneFormdata, 10))) {
    return { error: "Phone number can only contain numbers" };
  }
  if (phoneFormdata.length !== 10) {
    return { error: "Invalid phone number" };
  }
  const phone = "+" + countryCode + phoneFormdata;
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOtp({
    phone,
  });

  if (error) {
    return { error: error.message };
  }

  return encodedRedirect("message", VERIFY_OTP_PATH, phone);
};

export const verifyOtpAction = async (
  state: undefined | Message,
  formData: FormData
) => {
  const token = formData.get("token") as string;
  const phone = formData.get("phone") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: "sms",
  });

  if (error) {
    return { error: error.message };
  }

  return redirect(ADMIN_PAGE_ROUTE);
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect(SIGN_IN_PATH);
};

export const helloUserAction = async (
  state: undefined | Message,
  formData: FormData
) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return { error: error.message };
  }
  const { data: userDetails, error: userDetailsError } = await supabase
    .from("user_data")
    .select("*")
    .eq("phone", data.user?.phone)
    .single();
  if (userDetailsError) {
    return { error: userDetailsError.message };
  }
  if (userDetails) {
    const { error: updatedUserDataError } =
      await supabase
        .from("user_data")
        .update({
          name: formData.get("name") as string,
        })
        .eq("phone", data.user?.phone);
    if (updatedUserDataError) {
      return { error: updatedUserDataError.message };
    }
  } else {
    // TODO: Insert user details in supabase
    const { error: insertedUserDataError } =
      await supabase.from("user_data").insert({
        name: formData.get("name") as string,
        phone: data.user?.phone,
        blood_group_id: formData.get("blood_group_id") as string,
        gender: formData.get("gender") as string,
      });
    if (insertedUserDataError) {
      return { error: insertedUserDataError.message };
    }
  }
  return { success: "Account created successfully" };
  // redirect(LANDING_PAGE_ROUTE);
};
