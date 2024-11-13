"use server";

import { createClient } from "@/lib/supabase/server";

export const getUser = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  return user;
};

export const getUserInfo = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("user_data")
    .select("user_id, name, mobile, email")
    .eq("mobile", user.data.user?.phone?.substring(2))
    .single();
  return { data, error };
};
