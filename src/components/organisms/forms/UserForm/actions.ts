"use server";

import { createClient } from "@/lib/supabase/server";
import { getUserInfo } from "@/lib/supabase/user";
import { ORGANIZATION_ID } from "@/utils/constants";
import { filterFormData } from "@/utils/functions";
import { USERS_PAGE_ROUTE } from "@/utils/routes";
import { Message } from "@/utils/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const userFormAction = async (
  state: undefined | Message,
  formData: FormData
) => {
  const formFields = filterFormData(formData);
  const { data: currentUser } = await getUserInfo();

  if (!currentUser) {
    return { error: "Unauthorized" };
  }

  const supabase = createClient();

  try {
    if (formFields.user_id) {
      // Update existing user
      const { error: userError } = await supabase
        .from("user_data")
        .update({
          name: formFields.name,
          mobile: formFields.mobile,
          email: formFields.email,
          gender_id: formFields.gender_id,
          blood_group_id: formFields.blood_group_id,
          date_of_birth: formFields.date_of_birth || null,
          pincode: formFields.pincode,
          is_active: formFields.active === "true",
        })
        .eq("user_id", formFields.user_id);

      if (userError) throw userError;

      // Update roles
      const { data: allUserRoles, error: fetchError } = await supabase
        .from("mapping_user_role")
        .select("role_id, role_status")
        .eq("user_id", formFields.user_id);

      if (fetchError) throw fetchError;

      const incomingRoles = formData.getAll("roles")
        ? formData.getAll("roles").map((id: any) => parseInt(id, 10))
        : [];

      const existingRoleIds = allUserRoles
        ?.filter((r) => r.role_status)
        .map((r) => r.role_id);
      // Determine roles to add and roles to deactivate
      const rolesToAdd = incomingRoles.filter(
        (role) => !allUserRoles.some((r) => r.role_id === role && r.role_status)
      );
      const rolesToDeactivate = existingRoleIds.filter(
        (r) => !incomingRoles.includes(r)
      );

      const rolesToInsert = incomingRoles.filter(
        (role) => !allUserRoles.some((r) => r.role_id === role)
      );

      // Add new roles
      if (rolesToAdd.length > 0) {
        const { error: addError } = await supabase
          .from("mapping_user_role")
          .update({
            role_status: true,
            last_modified_by: currentUser.user_id,
          })
          .eq("user_id", formFields.user_id)
          .in("role_id", rolesToAdd);

        if (addError) throw addError;
      }

      // Insert new roles
      if (rolesToInsert.length > 0) {
        const { error: insertError } = await supabase
          .from("mapping_user_role")
          .insert(
            rolesToInsert.map((role) => ({
              user_id: formFields.user_id,
              role_id: role,
              role_status: true,
              created_by: currentUser.user_id,
            }))
          );

        if (insertError) throw insertError;
      }

      // Deactivate removed roles
      if (rolesToDeactivate.length > 0) {
        const { error: deactivateError } = await supabase
          .from("mapping_user_role")
          .update({ role_status: false, last_modified_by: currentUser.user_id })
          .eq("user_id", formFields.user_id)
          .in("role_id", rolesToDeactivate);

        if (deactivateError) throw deactivateError;
      }
    } else {
      // Create new user
      const { data: newUser, error: userError } = await supabase
        .from("user_data")
        .insert({
          name: formFields.name,
          mobile: formFields.mobile,
          email: formFields.email,
          gender_id: formFields.gender_id,
          blood_group_id: formFields.blood_group_id,
          date_of_birth: formFields.date_of_birth || null,
          pincode: formFields.pincode,
          org_id: ORGANIZATION_ID,
          is_active: true,
        })
        .select()
        .single();

      if (userError) throw userError;

      const roles = formData.getAll("roles").map((id: any) => parseInt(id, 10));
      const { error: roleError } = await supabase
        .from("mapping_user_role")
        .insert(
          roles?.map((roleId) => ({
            user_id: newUser.user_id,
            role_id: roleId,
            role_status: true,
            created_by: currentUser.user_id,
          }))
        );

      if (roleError) throw roleError;
    }
  } catch (error: any) {
    return { error: error.message || "Something went wrong" };
  }
  revalidatePath(USERS_PAGE_ROUTE);
  redirect(USERS_PAGE_ROUTE);
};
