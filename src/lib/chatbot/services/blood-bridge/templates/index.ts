import { CheckBridgeStatus } from "@/lib/chatbot/services/blood-bridge/check-bridge-status";
import { FaqMessage } from "@/lib/chatbot/services/blood-bridge/faq-message";
import { BaseTemplate } from "./base-template";
import { RaiseBloodBridgeRequest } from "@/lib/chatbot/services/blood-bridge/(fighter)/raise-blood-bridge-request";
import { RequestRaisedByFighterSuccess } from "@/lib/chatbot/services/blood-bridge/(fighter)/request-raised-by-fighter/success";
import { RequestRaisedByFighterCancel } from "@/lib/chatbot/services/blood-bridge/(fighter)/request-raised-by-fighter/cancel";
import { ListBridgeDonors } from "@/lib/chatbot/services/blood-bridge/(volunteer)/list-bridge-donors";
import { SendNotificationToDonors } from "@/lib/chatbot/services/blood-bridge/(volunteer)/send-notification-to-donors";
import { CancelBridgeRequest } from "@/lib/chatbot/services/blood-bridge/(volunteer)/cancel-bridge-request";
import {
  BridgeDonationRequestAccept,
  BridgeDonationRequestAcceptEligible,
  BridgeDonationRequestAcceptEligibleThankYou,
  BridgeDonationRequestAcceptNotEligible,
} from "@/lib/chatbot/services/blood-bridge/(donor)/bridge-donation-request/accept";
import {
  BridgeDonationRequestReject,
  BridgeDonationRequestRejectReasonReceived,
} from "@/lib/chatbot/services/blood-bridge/(donor)/bridge-donation-request/reject";
import { OneTimeDonors } from "@/lib/chatbot/services/blood-bridge/(volunteer)/one-time-donors";
import {
  ChangeTransfusionDate,
  ChangeTransfusionDateForm,
} from "@/lib/chatbot/services/blood-bridge/(fighter)/change-transfusion-date";
import {
  RaiseEmergencyRequest,
  RaiseEmergencyRequestForm,
} from "@/lib/chatbot/services/emergency-request/(donor)/raise-emergency-request";
import { GenerateCertificate } from "@/lib/chatbot/services/blood-bridge/(donor)/generate-certificate";

const templateMap: Record<string, new () => BaseTemplate> = {
  bridge_status: CheckBridgeStatus,
  faq_message: FaqMessage,
  raise_emergency_request: RaiseBloodBridgeRequest,
  request_raised_by_parent_success: RequestRaisedByFighterSuccess,
  greeting_patient: RequestRaisedByFighterCancel,
  change_transfusion_date: ChangeTransfusionDate,
  change_transfusion_date_form: ChangeTransfusionDateForm,

  // volunteer templates
  donors_list_bridge: ListBridgeDonors,
  notification_donation_bridge_request_confirmed: SendNotificationToDonors,
  send_notification_to_donors: SendNotificationToDonors,
  cancelled_request_bridge_volunteer: CancelBridgeRequest,
  one_time_donors_bridge2: OneTimeDonors,

  // donor templates
  notification_donation_bridge_request_accept: BridgeDonationRequestAccept,
  notification_donation_bridge_request_reject: BridgeDonationRequestReject,
  notification_donation_bridge_request_accept_eligible:
    BridgeDonationRequestAcceptEligible,
  notification_donation_bridge_request_accept_eligible_thank_you:
    BridgeDonationRequestAcceptEligibleThankYou,
  notification_donation_bridge_request_accept_not_eligible:
    BridgeDonationRequestAcceptNotEligible,
  reject_reason_received: BridgeDonationRequestRejectReasonReceived,
  download_donor_certificate: GenerateCertificate,

  raise_emergency_request_general: RaiseEmergencyRequest,
  raise_emergency_request_form: RaiseEmergencyRequestForm,
};

export const getTemplateHandler = (templateName: string): BaseTemplate => {
  const TemplateHandler = templateMap[templateName];
  if (!TemplateHandler) {
    throw new Error(`We couldn't process your request. Please try again later.`);
  }
  return new TemplateHandler();
};
