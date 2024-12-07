import { MessageResponse, TemplateContext } from "@/utils/types/whatsapp";
import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import {
  getBridgeVolunteers,
  getUserDetails,
} from "@/lib/chatbot/db/blood-bridge/fighter";
import { sendMessageToUser } from "@/lib/chatbot/services/message";

export class BridgeDonationRequestReject extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    const userDetails = await getUserDetails(context.user.user_id);
    const bridgeVolunteers = await getBridgeVolunteers(userDetails.bridge_id);

    const volunteerTemplate = (volunteer: {
      phone_number: string;
      name: string;
    }) => ({
      to: volunteer.phone_number,
      templateName: "notification_donation_bridge_request_reject_volunteer",
      components: [
        {
          type: "body",
          parameters: [{ type: "text", text: userDetails.name }],
        },
        {
          type: "body",
          parameters: [{ type: "text", text: userDetails.bridge_name }],
        },
      ],
    });

    await Promise.all(
      bridgeVolunteers.map(async (volunteer) => {
        await sendMessageToUser(
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
      components: Array.from({ length: 4 }).map((_, index) => ({
        type: "button",
        sub_type: "quick_reply",
        index: index.toString(),
        parameters: [{ type: "payload", payload: context.message.payload }],
      })),
    };
  }
}

export class BridgeDonationRequestRejectReasonReceived extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    return {
      to: context.from,
      templateName: context.templateName,
    };
  }
}
