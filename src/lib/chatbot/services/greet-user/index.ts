import { createClient } from "@/lib/supabase/client";
import { getUserByMobile, getUserDetailsByMobile } from "@/lib/supabase/user";
import { ORGANIZATION_ID } from "@/utils/constants";
import { UserRole } from "@/utils/types";
import {
  DirectMessageParams,
  TemplateMessageParams,
} from "@/utils/types/whatsapp";

export const greetUser = async (
  to: string,
  name: string
): Promise<DirectMessageParams | TemplateMessageParams> => {
  let payload: DirectMessageParams | TemplateMessageParams;
  const { data: user } = await getUserByMobile(to);
  if (user) {
    if (user.is_active) {
      const { data: userDetails, error: userDetailsError } =
        await getUserDetailsByMobile(to);
      if (userDetailsError || !userDetails) {
        throw new Error(
          "We couldn't fetch your details. Please try again later."
        );
      }
      if (user.roles.includes(UserRole.VOLUNTEER)) {
        payload = {
          to,
          templateName: "greeting_volunteer",
          components: [
            {
              type: "body",
              parameters: [{ type: "text", text: userDetails[0].name }],
            },
          ],
        };
      } else if (user.roles.includes(UserRole.FIGHTER)) {
        payload = {
          to,
          templateName: "greeting_patient",
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: userDetails[0].name },
                { type: "text", text: userDetails[0].blood_group },
                {
                  type: "text",
                  text: userDetails[0].last_bridge_donation_date,
                },
                {
                  type: "text",
                  text: userDetails[0].expected_next_transfusion_date,
                },
              ],
            },
          ],
        };
      } else if (user.roles.includes(UserRole.BRIDGE_DONOR)) {
        payload = {
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
        };
      } else if (user.roles.includes(UserRole.EMERGENCY_DONOR)) {
        payload = {
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
        };
      } else if (user.roles.includes(UserRole.GUEST)) {
        payload = {
          to,
          templateName: "greeting_guest_user",
          components: [
            {
              type: "body",
              parameters: [{ type: "text", text: user.name }],
            },
          ],
        };
      } else {
        payload = {
          to,
          message: `Sorry, something went wrong. Please try again later.`,
        };
      }
    } else {
      payload = {
        to,
        templateName: "greeting_inactive_user",
        components: [
          {
            type: "text",
            parameters: [{ type: "text", text: user.name }],
          },
        ],
      };
    }
  } else {
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
      throw new Error(
        "Failed to process your request. Please try again later."
      );
    }
    payload = {
      to,
      templateName: "greeting_new_user",
    };
  }

  return payload;
};
