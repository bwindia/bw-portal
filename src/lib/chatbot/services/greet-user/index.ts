import {
  sendDirectMessage,
  sendTemplateMessage,
} from "@/lib/chatbot/services/message";
import { createClient } from "@/lib/supabase/client";
import { getUserByMobile, getUserDetailsByMobile } from "@/lib/supabase/user";
import { ORGANIZATION_ID } from "@/utils/constants";
import { UserRole } from "@/utils/types";

export const greetUser = async (to: string, name: string) => {
  try {
    const { data: user } = await getUserByMobile(to);
    console.log(user);
    if (user) {
      if (user.is_active) {
        const { data: userDetails, error: userDetailsError } =
          await getUserDetailsByMobile(to);
        console.log(userDetails);
        if (userDetailsError || !userDetails) {
          throw userDetailsError || Error("Error fetching user details");
        }
        if (user.roles.includes(UserRole.VOLUNTEER)) {
          return await sendTemplateMessage({
            to,
            templateName: "greeting_volunteer",
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: userDetails[0].name },
                ],
              },
            ],
          });
        } else if (user.roles.includes(UserRole.PATIENT)) {
          return await sendTemplateMessage({
            to,
            templateName: "greeting_patient",
            components: [
              {
                type: "body",
                parameters: [{ type: "text", text: userDetails[0].name },
                  { type: "text", text: userDetails[0].blood_group },
                  { type: "text", text: userDetails[0].last_bridge_donation_date },
                  { type: "text", text: userDetails[0].expected_next_transfusion_date },
                ],
              },
            ],
          });
        } else if (user.roles.includes(UserRole.BRIDGE_DONOR)) {
          return await sendTemplateMessage({
            to,
            templateName: "greeting_bridge_donor",
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: userDetails[0].name },
                  { type: "text", text: userDetails[0].blood_group },
                  { type: "text", text: userDetails[0].last_donation_date },
                  { type: "text", text: userDetails[0].next_eligible_date },
                ],
              },
            ],
          });
        } else if (user.roles.includes(UserRole.EMERGENCY_DONOR)) {
          return await sendTemplateMessage({
            to,
            templateName: "greeting_one_time_donor",
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: userDetails[0].name },
                  { type: "text", text: userDetails[0].blood_group },
                  { type: "text", text: userDetails[0].last_donation_date },
                  { type: "text", text: userDetails[0].next_eligible_date },
                ],
              },
            ],
          });
        } else if (user.roles.includes(UserRole.GUEST)) {
          return await sendTemplateMessage({
            to,
            templateName: "greeting_guest_user",
            components: [
              {
                type: "body",
                parameters: [{ type: "text", text: user.name }],
              },
            ],
          });
        }
      } else {
        return await sendTemplateMessage({
          to,
          templateName: "greeting_inactive_user",
          components: [
            {
              type: "text",
              parameters: [{ type: "text", text: user.name }],
            },
          ],
        });
      }
    } else {
      console.log("Creating new user");
      const supabase = createClient();
      const { error } = await supabase
        .from("user_data")
        .insert({
          mobile: to.substring(2),
          name,
          pincode: "500028",
          source: "WhatsApp Chatbot",
          org_id: ORGANIZATION_ID,
        })
        .select();
      if (error) {
        throw error;
      }
      return await sendTemplateMessage({
        to,
        templateName: "greeting_new_user",
      });
    }
  } catch (error) {
    console.error("Error greeting user:", error);
    sendDirectMessage({
      to,
      message: `Sorry, something went wrong. Please try again later.`,
    });
  }
};
