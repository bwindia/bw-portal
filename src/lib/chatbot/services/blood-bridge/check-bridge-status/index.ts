import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import { createClient } from "@/lib/supabase/server";
import { UserRole } from "@/utils/types";
import { MessageResponse, TemplateContext } from "@/utils/types/whatsapp";

export class CheckBridgeStatus extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    // Implement request blood specific logic here
    const supabase = createClient();
    const { data, error } = await supabase
      .from("view_user_data_rean")
      .select("*")
      .eq("user_id", context.user.user_id)
      .single();
    const { data: bridgeDonor, error: bridgeDonorError } = await supabase
      .from("view_user_data_rean")
      .select("*")
      .eq("bridge_id", data?.bridge_id)
      .eq("role", UserRole.BRIDGE_DONOR);
    if (error || bridgeDonorError) {
      throw new Error("We couldn't fetch your data. Please contact support.");
    }
    return {
      to: context.from,
      templateName: context.templateName,
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: data?.bridge_id },
            { type: "text", text: data?.bridge_name },
            { type: "text", text: bridgeDonor?.length },
            {
              type: "text",
              text: bridgeDonor?.filter(
                (donor) => donor.eligibility_status === "eligible"
              ).length,
            },
            { type: "text", text: data?.expected_next_transfusion_date },
          ],
        },
      ],
    };
  }
}
