import { createClient } from "@/lib/supabase/server";

export const createEmergencyRequest = async (emergencyRequest: any) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tracker_emergency_request")
    .insert([emergencyRequest])
    .select("*")
    .single();
  if (error) {
    throw new Error(
      "We are unable to raise your request at this time, please try again later."
    );
  }
  return data;
};

export const getEmergencyRequestCount = async (userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tracker_emergency_request")
    .select("*")
    .eq("requested_by_user_id", userId)
    .filter("insert_time", "gte", new Date().toISOString().split("T")[0])
    .filter(
      "insert_time",
      "lt",
      new Date(Date.now() + 86400000).toISOString().split("T")[0]
    ) 
    .eq("status", 6);
  if (error) {
    throw new Error(
      "We are unable to raise your request at this time, please try again later."
    );
  }
  return data.length;
};
