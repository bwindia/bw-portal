"use server";

import { createClient } from "@/lib/supabase/server";
import { USERS_PAGE_ROUTE } from "@/utils/routes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const importUsersAction = async (formData: any[]) => {
  formData.map((item: any) =>
    Object.keys(item).forEach((key) => {
      if (item[key] === "") {
        delete item[key];
      }
    })
  );
  const supabase = createClient();
  try {
    const { error } = await supabase.from("user_data").insert(formData);
    if (error) {
      throw error;
    }
    revalidatePath(USERS_PAGE_ROUTE);
    redirect(USERS_PAGE_ROUTE);
  } catch (error: any) {
    return { error: error.message || "Failed to import users" };
  }
};
