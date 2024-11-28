import { createClient } from "@/lib/supabase/server";
import { BLOOD_GROUP } from "@/utils/constants";

export const schedulePatientRequest = async (patientDetails: any) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tracker_emergency_request")
    .insert({
      patient_name: patientDetails.bridge_name,
      requirement_date: patientDetails.expected_next_transfusion_date,
      no_of_units: patientDetails.quantity_required,
      blood_group_id: BLOOD_GROUP.find(
        (item) => item.label === patientDetails.blood_group
      )?.value,
      request_type: 2,
      status: 6,
      requested_by_user_id: patientDetails.user_id,
      bridge_id: patientDetails.bridge_id,
    })
    .select("*")
    .single();
  console.log("Emergency Request", data, error);
  if (error) {
    throw new Error(
      "We are unable to raise your request at this time, please try again later."
    );
  }
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
    .eq("id", scheduledRequestId);
  if (error) {
    throw new Error(
      "We failed to cancel your request, please contact support."
    );
  }
  return data;
};
