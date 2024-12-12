"use server";
import { getBridgeFighter } from "@/lib/chatbot/db/blood-bridge/fighter";
import { getBridgeVolunteers } from "@/lib/chatbot/db/blood-bridge/fighter";
import { updateScheduleRequest } from "@/lib/chatbot/db/blood-bridge/schedule-request";
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
    .insert([
      Object.fromEntries(
        Object.entries(formFields).filter(([key]) => key !== "schedule_request_id")
      ),
    ])
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
      .from("view_user_data_rean")
      .select("*")
      .eq("user_id", formFields.user_id);

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
              text: donor[0].name,
            },
            {
              type: "text",
              text: DONATION_TYPE.find(
                (type) => type.value === formFields.donation_type_id
              )?.label,
            },
            {
              type: "text",
              text: "+" + donor[0].phone_number,
            },
            {
              type: "text",
              text: donor[0].blood_group,
            },
            {
              type: "text",
              text: formFields.date_of_donation,
            },
            {
              type: "text",
              text: bloodCenter.name,
            },
            {
              type: "text",
              text: `${bloodCenter.address || "Address not available"}, ${bloodCenter.maps_link || "Maps link not available, Please check the website."}`,
            },
            {
              type: "text",
              text: formFields.time_of_donation,
            },
            {
              type: "text",
              text: `+${bridgeVolunteers[0].phone_number}`,
            },
            {
              type: "text",
              text: bridgeFighter.bridge_name,
            },
          ],
        },
      ],
    });
    try {
      await notifyUsers(donor[0].phone_number, template);
      bridgeVolunteers.map(async (volunteer) => {
      await notifyUsers(volunteer.phone_number, template);
    });
      await notifyUsers(bridgeFighter.phone_number, template);
    } catch (error) {
      console.log("error", error);
      return { error: "Something went wrong. Couldn't notify users" };
    }
  }

  if (data) return { success: "Submitted successfully" };
  return { error: "Something went wrong. Please try again" };
};

const notifyUsers = async (mobile: any, template: any) => {
  await sendMessageToUser(template(mobile), "text", "", "BUSINESS_INITIATED");
};
