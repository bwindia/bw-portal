import { getUserDetails } from "@/lib/chatbot/db/blood-bridge/fighter";
import { changeTransfusionDate } from "@/lib/chatbot/db/blood-bridge/fighter";
import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import {
  TemplateContext,
  TemplateInteractiveContext,
} from "@/utils/types/whatsapp";
import { MessageResponse } from "@/utils/types/whatsapp";
import { sendMessageToUser } from "@/lib/chatbot/services/message";

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

    const nextTransfusionDate = new Date(formData.screen_0_DatePicker_0);
    const hemoglobinLevel = parseFloat(formData.screen_0_TextInput_1);
    const lastTransfusionDate = new Date(formData.screen_0_DatePicker_2);

    const errorMessage = validateTransfusionForm(
      lastTransfusionDate,
      hemoglobinLevel,
      nextTransfusionDate
    );

    if (errorMessage) {
      const errorTemplate = {
        to: context.from,
        message: errorMessage,
      };
      await sendMessageToUser(
        errorTemplate,
        "text",
        errorMessage,
        "BUSINESS_INITIATED"
      );
      return {
        to: context.from,
        templateName: "change_transfusion_date",
        components: [
          {
            type: "button",
            sub_type: "flow",
            index: "0",
            parameters: [
              {
                type: "payload",
                payload: JSON.stringify({
                  title: "Update Transfusion Date",
                }),
              },
            ],
          },
        ],
      };
    }

    const response = await changeTransfusionDate(
      fighterDetails.bridge_id,
      lastTransfusionDate,
      hemoglobinLevel,
      nextTransfusionDate
    );

    return {
      to: context.from,
      templateName: "transfusion_date_changed_success",
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: fighterDetails.bridge_name,
            },
            {
              type: "text",
              text: response.next_requirement_date,
            },
            {
              type: "text",
              text: fighterDetails.name,
            },
          ],
        },
      ],
    };
  }
}

const validateTransfusionForm = (
  lastTransfusionDate: Date,
  hemoglobinLevel: number,
  nextTransfusionDate: Date
) => {
  const today = new Date();
  let errorMessage = "";
  if (lastTransfusionDate >= nextTransfusionDate) {
    errorMessage +=
      "Last transfusion date must be earlier than next transfusion date. ";
  }
  if (hemoglobinLevel >= 18) {
    errorMessage += "Hemoglobin level must be less than 18. ";
  }
  if (nextTransfusionDate <= today) {
    errorMessage += "Next transfusion date must be in the future.";
  }
  return errorMessage;
};
