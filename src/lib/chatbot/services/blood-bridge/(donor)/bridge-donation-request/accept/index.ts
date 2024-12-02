import { MessageResponse } from "@/utils/types/whatsapp";
import { TemplateContext } from "@/utils/types/whatsapp";
import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import {
  getBridgeVolunteers,
  getUserDetails,
} from "@/lib/chatbot/db/blood-bridge/fighter";
import { sendMessageToUser } from "@/lib/chatbot/services/message";

export class BridgeDonationRequestAccept extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    return {
      to: context.from,
      templateName: context.templateName,
      components: Array.from({ length: 2 }, (_, index) => ({
        type: "button",
        subType: "quick_reply",
        index: index.toString(),
        parameters: [{ type: "payload", payload: context.message.payload }],
      })),
    };
  }
}

export class BridgeDonationRequestAcceptEligible extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    const userDetails = await getUserDetails(context.user.user_id);
    const bridgeVolunteers = await getBridgeVolunteers(userDetails.bridge_id);

    const volunteerTemplate = (volunteer: {
      phone_number: string;
      name: string;
    }) => ({
      to: `91${volunteer.phone_number}`,
      templateName: "notification_donation_bridge_request_accept_volunteer",
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
      components: [
        {
          type: "body",
          parameters: [{ type: "text", text: userDetails.name }],
        },
        ...Array.from({ length: 3 }).map((_, index) => ({
          type: "button",
          subType: "quick_reply",
          index: index.toString(),
          parameters: [{ type: "payload", payload: context.message.payload }],
        })),
      ],
    };
  }
}

export class BridgeDonationRequestAcceptEligibleThankYou extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    return {
      to: context.from,
      templateName: context.templateName,
    };
  }
}

export class BridgeDonationRequestAcceptNotEligible extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    const userDetails = await getUserDetails(context.user.user_id);
    return {
      to: context.from,
      templateName: context.templateName,
      components: [
        {
          type: "body",
          parameters: [{ type: "text", text: userDetails.name }],
        },
      ],
    };
  }
}
