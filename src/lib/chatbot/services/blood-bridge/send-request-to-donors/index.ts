import { MessageResponse } from "@/utils/types/whatsapp";

import { TemplateContext } from "@/utils/types/whatsapp";
import { BaseTemplate } from "../templates/base-template";
import {
  getBridgeDonors,
  getBridgePatient,
  getBridgeVolunteers,
} from "@/lib/chatbot/db/blood-bridge/patient";
import { getUserDetails } from "@/lib/chatbot/db/blood-bridge/patient";
import { sendMessageToUser } from "@/lib/chatbot/services/message";

export class SendRequestToDonors extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    const userDetails = await getUserDetails(context.user.user_id);
    const bridgePatient = await getBridgePatient(userDetails.bridge_id);
    const bridgeDonors = await getBridgeDonors(userDetails.bridge_id);
    const bridgeVolunteers = await getBridgeVolunteers(userDetails.bridge_id);

    const donorTemplate = (donor: { phone_number: string; name: string }) => ({
      to: `91${donor.phone_number}`,
      templateName: "",
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
              text: bridgePatient.bridge_name,
            },
            {
              type: "text",
              text: bridgePatient.bridge_group,
            },
            {
              type: "text",
              text: bridgePatient.expected_next_transfusion_date,
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
      ],
    });

    bridgeDonors
      .filter((donor) => donor.status === "eligible")
      .forEach((donor) => {
        sendMessageToUser(
          donorTemplate(donor),
          "text",
          "",
          "BUSINESS_INITIATED"
        );
      });

    const volunteerTemplate = (volunteer: {
      phone_number: string;
      name: string;
    }) => ({
      to: `91${volunteer.phone_number}`,
      message: `A request has been raised by ${userDetails.name} for ${bridgePatient.bridge_name}`,
    });
    bridgeVolunteers
      .filter((volunteer) => volunteer.id !== userDetails.user_id)
      .forEach((volunteer) => {
        sendMessageToUser(
          volunteerTemplate(volunteer),
          "text",
          "",
          "BUSINESS_INITIATED"
        );
      });
    return {
      to: context.from,
      templateName: context.templateName,
    };
  }
}
