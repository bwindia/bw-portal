import { createClient } from "@/lib/supabase/server";
import { UserRole } from "@/utils/types";

export const getUserDetails = async (user_id: string) => {
  const supabase = createClient();
  const { data } = await supabase
    .from("view_user_data_rean")
    .select("*")
    .eq("user_id", user_id)
  if (!data) {
    throw new Error("We couldn't fetch your data. Please contact support.");
  }
  return data[0];
};

export const getBridgeFighter = async (bridge_id: string) => {
  const supabase = createClient();
  const { data } = await supabase
    .from("view_user_data_rean")
    .select("*")
    .eq("bridge_id", bridge_id)
    .eq("role", UserRole.FIGHTER)
    .single();
  if (!data) {
    throw new Error(
      "Fighter has not been assigned to this bridge yet. Please contact support."
    );
  }
  return data;
};

export const getBridgeVolunteers = async (bridge_id: string) => {
  const supabase = createClient();
  const { data } = await supabase
    .from("view_user_data_rean")
    .select("*")
    .eq("bridge_id", bridge_id)
    .eq("role", UserRole.VOLUNTEER);
  if (!data || data.length === 0) {
    throw new Error(
      "Volunteer has not been assigned to this bridge yet. Please contact support."
    );
  }
  return data;
};

export const getBridgeDonors = async (bridge_id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("view_user_data_rean")
    .select("*")
    .eq("bridge_id", bridge_id)
    .eq("role", UserRole.BRIDGE_DONOR);
  if (error) {
    throw new Error(
      "Our server is facing some issues. Please contact support."
    );
  }
  return data;
};

export const getOneTimeDonorsForBridge = async (bridge_blood_group: string) => {
  const supabase = createClient();
  const { data } = await supabase
    .from("view_user_data_rean")
    .select("*")
    .eq("blood_group", bridge_blood_group)
    .eq("role", UserRole.EMERGENCY_DONOR)
    .eq("status", "active")
    .eq("eligibility_status", "eligible")
    .limit(5);

  if (!data) {
    throw new Error("No one time donors found for this bridge. Please contact support.");
  }
  return data;
};

export const changeTransfusionDate = async (
  bridgeId: string,
  lastTransfusionDate: Date,
  hemoglobinLevel: number,
  nextTransfusionDate: Date
) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tracker_blood_bridge_transfusion")
    .insert({
      bridge_id: bridgeId,
      transfusion_date: lastTransfusionDate,
      hb_level: hemoglobinLevel,
      next_requirement_date: nextTransfusionDate,
    })
    .select("*")
    .single();
  if (error || !data) {
    throw new Error(
      "We failed to update your transfusion date, please contact support."
    );
  }
  return data;
};