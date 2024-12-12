import { getUserDetails } from "@/lib/chatbot/db/blood-bridge/fighter";
import { updateTransfusionDate } from "@/lib/chatbot/db/blood-bridge/fighter";
import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import {
  TemplateContext,
  TemplateInteractiveContext,
} from "@/utils/types/whatsapp";
import { MessageResponse } from "@/utils/types/whatsapp";

export class ChangeTransfusionDate extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    const customFlowToken = JSON.stringify({
      flowId: "TRANSFUSION_DATE_FORM", // Your custom identifier
      userId: context.from,
      timestamp: Date.now(),
    });
    return {
      to: context.from,
      templateName: context.templateName,
      components: [
        {
          type: "button",
          sub_type: "flow",
          index: "0",
          parameters: [
            {
              type: "payload",
              payload: JSON.stringify({
                flow_token: customFlowToken,
                screen: {
                  type: "date_picker",
                  title: "Update Transfusion Date",
                },
                //   formId: "transfusion_date_change",
                // action: "change_transfusion_date",

                // metadata: {
                //   formVersion: "1.0",
                //   formType: "date_selection",
                // },
              }),
            },
          ],
        },
      ],
    };
  }
}

export class ChangeTransfusionDateForm extends BaseTemplate {
  async handle(context: TemplateInteractiveContext): Promise<MessageResponse> {
    const fighterDetails = await getUserDetails(context.user.user_id);
    const formData = JSON.parse(context.message.response_json);
    
    const lastTransfusionDate = formData.screen_0_DatePicker_0;
    const hemoglobinLevel = formData.screen_0_TextInput_1;
    const nextTransfusionDate = formData.screen_0_DatePicker_2;

    await updateTransfusionDate(
      fighterDetails.bridge_id,
      lastTransfusionDate,
      hemoglobinLevel,
      nextTransfusionDate
    );

    return {
      to: context.from,
      templateName: context.templateName,
    };
  }
}
