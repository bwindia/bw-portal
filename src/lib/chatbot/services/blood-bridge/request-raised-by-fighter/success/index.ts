import { MessageResponse, TemplateContext } from "@/utils/types/whatsapp";
import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import { getBridgeVolunteers } from "@/lib/chatbot/db/blood-bridge/fighter";
import { getUserDetails } from "@/lib/chatbot/db/blood-bridge/fighter";
import { sendMessageToUser } from "../../../message";

export class RequestRaisedByFighterSuccess extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    const fighterDetails = await getUserDetails(context.user.user_id);
    const bridgeVolunteers = await getBridgeVolunteers(
      fighterDetails.bridge_id
    );
    const volunteerTemplate = (volunteer: {
      phone_number: string;
      name: string;
    }) => ({
      to: `91${volunteer.phone_number}`,
      templateName: "request_raised_by_parent",
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: volunteer.name,
            },
            {
              type: "text",
              text: fighterDetails.bridge_name,
            },
            {
              type: "text",
              text: fighterDetails.blood_group,
            },
            {
              type: "text",
              text: fighterDetails.expected_next_transfusion_date,
            },
          ],
        },
        // {
        //   type: "button",
        //   sub_type: "url",
        //   index: "0",
        //   parameters: [
        //     {
        //       type: "text",
        //       text: `tel:+91${fighterDetails.phone_number}`,
        //     },
        //   ],
        // },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "1",
          parameters: [
            {
              type: "payload",
              payload: context.message.payload,
            },
          ],
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "2",
          parameters: [
            {
              type: "payload",
              payload: context.message.payload,
            },
          ],
        },
      ],
    });
    await Promise.all(
      bridgeVolunteers.map((volunteer) => {
        sendMessageToUser(
          volunteerTemplate(volunteer),
          "text",
          "",
          "BUSINESS_INITIATED"
        );
      })
    );
    return {
      to: context.from,
      templateName: context.templateName,
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: bridgeVolunteers
                .map((volunteer) => volunteer.name)
                .join(", "),
            },
          ],
        },
      ],
    };
  }
}
