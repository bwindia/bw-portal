"use server";
import { getBridgeFighter } from "@/lib/chatbot/db/blood-bridge/fighter";
import { getBridgeVolunteers } from "@/lib/chatbot/db/blood-bridge/fighter";
import { updateScheduleRequest } from "@/lib/chatbot/db/blood-bridge/schedule-request";
import { trackDonorCall } from "@/lib/chatbot/db/blood-bridge/track-donor-call";
import { sendMessageToUser } from "@/lib/chatbot/services/message";
import { createClient } from "@/lib/supabase/client";
import { getUserInfo } from "@/lib/supabase/user";
import { DONATION_TYPE } from "@/utils/constants";
import { filterFormData } from "@/utils/functions";
import { Message } from "@/utils/types";

export const scheduleDonationAction = async (
  state: undefined | Message,
  formData: FormData
) => {
  const formFields = filterFormData(formData);
  const { data: user } = await getUserInfo();
  if (user) {
    formFields.created_by = user?.user_id;
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tracker_donation_schedule")
    .insert([formFields])
    .select();

  if (error) {
    return { error: error.message };
  }

  if (formFields.schedule_request_id) {
    const scheduledRequestDetails = await updateScheduleRequest(
      formFields.schedule_request_id.toString(),
      1
    );
    const bridgeVolunteers = await getBridgeVolunteers(
      scheduledRequestDetails.bridge_id
    );
    const bridgeFighter = await getBridgeFighter(
      scheduledRequestDetails.bridge_id
    );

    const { data: donor, error: donorError } = await supabase
      .from("user_data")
      .select("*")
      .eq("user_id", formFields.user_id)
      .single();

    const { data: bloodCenter, error: bloodCenterError } = await supabase
      .from("master_blood_center")
      .select("*")
      .eq("blood_center_id", formFields.blood_center_id)
      .single();

    if (donorError || !donor || bloodCenterError) {
      return { error: "Something went wrong. Couldn't notify donor" };
    }

    const template = (mobile: string) => ({
      to: mobile,
      templateName: "donation_scheduled_donor",
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: donor.name,
            },
            {
              type: "text",
              text: DONATION_TYPE.find(
                (type) => type.value === formFields.donation_type_id
              )?.label,
            },
            {
              type: "text",
              text: donor.mobile,
            },
            {
              type: "text",
              text: donor.blood_group,
            },
            {
              type: "text",
              text: formFields.donation_date,
            },
            {
              type: "text",
              text: bloodCenter.name,
            },
            {
              type: "text",
              text: `${bloodCenter.address}, 
              
              ${bloodCenter.maps_link}`,
            },
            {
              type: "text",
              text: formFields.donation_time,
            },
            {
              type: "text",
              text: bridgeVolunteers[0].phone_number,
            },
            {
              type: "text",
              text: bridgeFighter.name,
            },
          ],
        },
      ],
    });
    await notifyUsers(donor.mobile, template);
    await trackDonorCall(donor);
    bridgeVolunteers.map(async (volunteer) => {
      await notifyUsers(volunteer.phone_number, template);
    });
    await notifyUsers(bridgeFighter.phone_number, template);
  }

  if (data) return { success: "Submitted successfully" };
  return { error: "Something went wrong. Please try again" };
};

const notifyUsers = async (mobile: any, template: any) => {
  await sendMessageToUser(template(mobile), "text", "", "BUSINESS_INITIATED");
};
