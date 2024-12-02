import {
  getBridgeDonors,
  getUserDetails,
} from "@/lib/chatbot/db/blood-bridge/fighter";
import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import { MessageResponse, TemplateContext } from "@/utils/types/whatsapp";

export class ListBridgeDonors extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    const userDetails = await getUserDetails(context.user.user_id);
    const bridgeDonors = await getBridgeDonors(userDetails.bridge_id);

    if (bridgeDonors.length === 0) {
      return {
        to: context.from,
        templateName: "no_eligible_donors_bridge",
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: userDetails.name,
              },
            ],
          },
          {
            type: "button",
            sub_type: "quick_reply",
            index: "0",
            parameters: [
              {
                type: "payload",
                payload: context.message.payload,
              },
            ],
          },
        ],
      };
    }

    const eligibleDonorsList = bridgeDonors
      .filter((donor) => donor.status === "eligible")
      .map((donor, index) => `${index + 1}. ${donor.name}`)
      .join("\n");

    return {
      to: context.from,
      templateName: context.templateName,
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: eligibleDonorsList,
            },
          ],
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "0",
          parameters: [
            {
              type: "payload",
              payload: context.message.payload,
            },
          ],
        },
      ],
    };
  }
}
