import {
  MessageResponse,
  TemplateInteractiveContext,
} from "@/utils/types/whatsapp";
import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import { TemplateContext } from "@/utils/types/whatsapp";
import { BLOOD_GROUP } from "@/utils/constants";
import {
  registerDonor,
  updateRoleByBridgePreference,
} from "@/lib/chatbot/db/blood-bridge/donor";
import { sendMessageToUser } from "@/lib/chatbot/services/message";

export class DonorRegistration extends BaseTemplate {
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
              payload: "register_as_donor",
            },
          ],
        },
      ],
    };
  }
}

export class DonorRegistrationForm extends BaseTemplate {
  async handle(context: TemplateInteractiveContext): Promise<MessageResponse> {
    const formData = JSON.parse(context.message.response_json);

    // Extract blood group ID from the dropdown value
    const bloodGroupId = BLOOD_GROUP.find(
      (item) =>
        item.label ===
        formData.screen_0_Blood_Group_3.split("_").slice(1).join(" ")
    )?.value || 9;

    const bridgePreference =
      formData.screen_0_Select_this_if_you_want_to_be_the_vision_guardian_of_ThalassemiaFreeIndia2035_4;

    // Prepare donor data
    const donorData = {
      name: formData.screen_0_Your_Full_Name_0,
      pincode: formData.screen_0_Location_Pincode_1,
      email: formData.screen_0_Email_2,
      gender_id: 5,
      blood_group_id: bloodGroupId,
    };

    // Validate the form data
    const errorMessage = validateDonorForm(donorData);
    if (errorMessage) {
      await sendMessageToUser(
        {
          to: context.from,
          message: errorMessage,
        },
        "text",
        errorMessage,
        "BUSINESS_INITIATED"
      );
      return {
        to: context.from,
        templateName: "register_as_donor",
        components: [
          {
            type: "button",
            sub_type: "flow",
            index: "0",
            parameters: [
              {
                type: "payload",
                payload: "register_as_donor",
              },
            ],
          },
        ],
      };
    }

    try {
      const user = await registerDonor(donorData, context.from);
      await updateRoleByBridgePreference(bridgePreference, user.user_id);
    } catch (error) {
      console.error("Error registering donor:", error);
      await sendMessageToUser(
        {
          to: context.from,
          message:
            "Something went wrong while registering you as a donor. Please try again",
        },
        "text",
        "Something went wrong while registering you as a donor. Please try again",
        "BUSINESS_INITIATED"
      );

      return {
        to: context.from,
        templateName: "register_as_donor",
        components: [
          {
            type: "button",
            sub_type: "flow",
            index: "0",
            parameters: [
              {
                type: "payload",
                payload: "register_as_donor",
              },
            ],
          },
        ],
      };
    }

    return {
      to: context.from,
      templateName: "registration_success_donor",
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: donorData.name,
            },
          ],
        },
      ],
    };
  }
}

const validateDonorForm = (donorData: any) => {
  let errorMessage = "";

  if (!donorData.name || donorData.name.length < 2) {
    errorMessage += "Please provide a valid name. ";
  }

  if (!donorData.pincode || !/^\d{6}$/.test(donorData.pincode)) {
    errorMessage += "Please provide a valid 6-digit pincode. ";
  }

  if (!donorData.email || !donorData.email.includes("@")) {
    errorMessage += "Please provide a valid email address. ";
  }

  if (!donorData.blood_group_id) {
    errorMessage += "Please select a valid blood group. ";
  }

  return errorMessage || null;
};
