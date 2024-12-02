import { MessageResponse, TemplateContext } from "@/utils/types/whatsapp";
import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import {
  getBridgeFighter,
  getOneTimeDonorsForBridge,
  getUserDetails,
} from "@/lib/chatbot/db/blood-bridge/fighter";
import { generateScheduleFormToken } from "@/lib/auth/form-auth";
import { PUBLIC_SCHEDULE_DONATION_PAGE_ROUTE } from "@/utils/routes";

export class OneTimeDonors extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    const userDetails = await getUserDetails(context.user.user_id);
    const bridgeFighter = await getBridgeFighter(userDetails.bridge_id);
    const oneTimeDonors = await getOneTimeDonorsForBridge(
      bridgeFighter.blood_group
    );

    const { scheduledRequestId } = JSON.parse(context.message.payload);
    const templateText = oneTimeDonors
      .map((donor) => `${donor.name} - ${donor.phone_number}`)
      .join("\n");
    const formToken = await generateScheduleFormToken(scheduledRequestId);

    return {
      to: context.from,
      templateName: context.templateName,
      components: [
        {
          type: "body",
          parameters: [{ type: "text", text: templateText }],
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
          sub_type: "url",
          index: "1",
          parameters: [
            {
              type: "text",
              text: `${process.env.NEXT_PUBLIC_APP_URL}${PUBLIC_SCHEDULE_DONATION_PAGE_ROUTE}?token=${formToken}`,
            },
          ],
        },
      ],
    };
  }
}
