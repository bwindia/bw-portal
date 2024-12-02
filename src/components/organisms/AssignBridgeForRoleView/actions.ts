"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/client";
import { getUserInfo } from "@/lib/supabase/user";

interface AssignUsersProps {
  bridgeId: number;
  roleId: number;
  userIds: number[];
}

export const assignUsersToBridge = async ({
  bridgeId,
  roleId,
  userIds,
}: AssignUsersProps) => {
  const supabase = createClient();

  const { data: user } = await getUserInfo();

  const insertRows = userIds.map((userId) => ({
    bridge_id: bridgeId,
    user_id: userId,
    role_id: roleId,
    created_by: user?.user_id,
  }));

  const { error } = await supabase
    .from("mapping_bridge_user_role")
    .insert(insertRows);

  if (error) {
    throw error;
  }

  revalidatePath(`/a/bridges/${bridgeId}`);
};
