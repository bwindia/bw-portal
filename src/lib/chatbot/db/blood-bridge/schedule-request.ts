import { createClient } from "@/lib/supabase/server";
import { BLOOD_GROUP } from "@/utils/constants";

export const scheduleFighterRequest = async (fighterDetails: any) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tracker_emergency_request")
    .insert({
      patient_name: fighterDetails.bridge_name,
      requirement_date: fighterDetails.expected_next_transfusion_date,
      no_of_units: fighterDetails.quantity_required,
      blood_group_id: BLOOD_GROUP.find(
        (item) => item.label === fighterDetails.blood_group
      )?.value,
      request_type: 2,
      status: 6,
      requested_by_user_id: fighterDetails.user_id,
      bridge_id: fighterDetails.bridge_id,
    })
    .select("*")
    .single();
  if (error) {
    throw new Error(
      "We are unable to raise your request at this time, please try again later."
    );
  }
  return data;
};

export const getScheduledRequestDetails = async (scheduledRequestId: string) => {
  const supabase = createClient();
  const { data } = await supabase
    .from("tracker_emergency_request")
    .select("*")
    .eq("id", scheduledRequestId)
    .single();
  return data;
};

export const updateScheduleRequest = async (
  scheduledRequestId: string,
  status: number
) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tracker_emergency_request")
    .update({ status })
    .eq("id", scheduledRequestId)
    .select("*")
    .single();
  if (error) {
    throw new Error(
      "We failed to cancel your request, please contact support."
    );
  }
  return data;
};
