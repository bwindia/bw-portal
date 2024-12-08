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
    .select(
      `user_id, name, email, mobile, 
      roles:mapping_user_role!fk_user_id(...master_user_role(role))`
    )
    .eq("mapping_user_role.role_status", true)
    .eq("mobile", user.data.user?.phone)
    .single();
  if (error) {
    return { data: null, error };
  }
  if (data && data?.roles) {
    data.roles = data.roles.map((role) => role.role);
  }
  return { data, error };
};

export const getUserByMobile = async (mobile: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_data")
    .select("*, roles:mapping_user_role!fk_user_id(...master_user_role(role))")
    .eq("mapping_user_role.role_status", true)
    .eq("mobile", mobile)
    .single();
  if (data?.roles) {
    data.roles = data.roles.map((role: any) => role.role);
  }
  return { data, error };
};

export const getUserDetailsByMobile = async (mobile: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("view_user_data_rean")
    .select("*")
    .eq("phone_number", mobile)
    .limit(1);
  return { data, error };
};

