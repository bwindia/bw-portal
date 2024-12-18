import {
  createEmergencyRequest,
  getEmergencyRequestCount,
} from "@/lib/chatbot/db/blood-bridge/emergency-request";
import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import { BLOOD_GROUP, GENDER } from "@/utils/constants";
import {
  MessageResponse,
  TemplateContext,
  TemplateInteractiveContext,
} from "@/utils/types/whatsapp";
import { sendMessageToUser } from "@/lib/chatbot/services/message";

export class RaiseEmergencyRequest extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
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
              payload: "raise_emergency_request_general",
            },
          ],
        },
      ],
    };
  }
}

export class RaiseEmergencyRequestForm extends BaseTemplate {
  async handle(context: TemplateInteractiveContext): Promise<MessageResponse> {
    const formData = JSON.parse(context.message.response_json);

    const emergencyRequestCount = await getEmergencyRequestCount(
      context.user.user_id
    );

    if (emergencyRequestCount >= 3) {
      return {
        to: context.from,
        templateName: "limit_reached_raise_emergency_request_general",
      };
    }

    const emergencyRequest = {
      patient_name: formData.screen_0_TextInput_0,
      blood_group_id: BLOOD_GROUP.find(
        (item) =>
          item.label ===
          formData.screen_0_Dropdown_4.split("_").slice(1).join(" ")
      )?.value,
      requirement_date: formData.screen_0_DatePicker_6,
      no_of_units: parseInt(formData.screen_0_TextInput_7),
      hospital_name: formData.screen_1_TextInput_0,
      pincode: formData.screen_1_TextInput_1,
      gender_id: GENDER.find(
        (item) =>
          item.label ===
          formData.screen_0_Dropdown_1.split("_")[1].replace("_", " ")
      )?.value,
      age: parseInt(formData.screen_0_TextInput_3),
      contact_number: formData.screen_0_TextInput_2,
      // blood_component: formData.screen_0_Dropdown_5.split("_")[1],
      requested_by_user_id: context.user.user_id,
      request_type: 3,
      status: 6,
    };

    const errorMessage = validateEmergencyRequestForm(emergencyRequest);
    if (errorMessage) {
      const errorMessageTemplate = {
        to: context.from,
        message: errorMessage,
      };
      await sendMessageToUser(
        errorMessageTemplate,
        "text",
        errorMessage,
        "BUSINESS_INITIATED"
      );
      return {
        to: context.from,
        templateName: "raise_emergency_request_general",
        components: [
          {
            type: "button",
            sub_type: "flow",
            index: "0",
            parameters: [
              {
                type: "payload",
                payload: "raise_emergency_request_general",
              },
            ],
          },
        ],
      };
    }

    await createEmergencyRequest(emergencyRequest);

    return {
      to: context.from,
      templateName: "success_raise_emergency_request_general",
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: context.user.name,
            },
            {
              type: "text",
              text: emergencyRequest.requirement_date,
            },
            {
              type: "text",
              text: emergencyRequest.patient_name,
            },
            {
              type: "text",
              text: emergencyRequest.age.toString(),
            },
            {
              type: "text",
              text: BLOOD_GROUP.find(
                (item) => item.value === emergencyRequest.blood_group_id
              )?.label,
            },
            {
              type: "text",
              text: emergencyRequest.no_of_units.toString(),
            },
            {
              type: "text",
              text: formData.screen_0_Dropdown_5.split("_")[1],
            },
            {
              type: "text",
              text: emergencyRequest.hospital_name,
            },
            {
              type: "text",
              text: emergencyRequest.pincode,
            },
            {
              type: "text",
              text: emergencyRequest.contact_number,
            },
          ],
        },
      ],
    };
  }
}

const validateEmergencyRequestForm = (emergencyRequest: any) => {
  let errorMessage = "";

  // Check if requirement date is in the future
  if (new Date(emergencyRequest.requirement_date) <= new Date()) {
    errorMessage += "Requirement date must be in the future. ";
  }

  return errorMessage;
};
