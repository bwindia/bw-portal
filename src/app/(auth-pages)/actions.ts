"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_PAGE_ROUTE,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  VERIFY_OTP_PATH,
} from "@/utils/routes";
import { Message } from "@/utils/types";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return;
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", SIGN_UP_PATH, error.message);
  } else {
    return encodedRedirect(
      "success",
      SIGN_UP_PATH,
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

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

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect(SIGN_IN_PATH);
};
