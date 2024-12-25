import { UserRole } from "@/utils/types";
import { CheckBridgeStatus } from "@/lib/chatbot/services/blood-bridge/check-bridge-status";
import { FaqMessage } from "@/lib/chatbot/services/blood-bridge/faq-message";
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
import { ActivateUser } from "@/lib/chatbot/services/emergency-request/(donor)/activate-user";
import { DonorRegistration, DonorRegistrationForm } from "@/lib/chatbot/services/emergency-request/(donor)/register-donor";
import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";

export const TEMPLATE_MAP: Record<string, new () => BaseTemplate> = {
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
  activation_success: ActivateUser,
  register_as_donor: DonorRegistration,
  donor_registration_form: DonorRegistrationForm,

  raise_emergency_request_general: RaiseEmergencyRequest,
  raise_emergency_request_form: RaiseEmergencyRequestForm,
};

export const ROLE_PRIORITY: { [key in UserRole]: number } = {
  [UserRole.VOLUNTEER]: 1,
  [UserRole.BRIDGE_DONOR]: 2,
  [UserRole.EMERGENCY_DONOR]: 3,
  [UserRole.FIGHTER]: 4,
  [UserRole.GUEST]: 5,
};

// Map templates based on roles as well as a key string
export const DEFAULT_ROLE_TEMPLATE_MAP: Record<UserRole, Record<string, string>> = {
  [UserRole.FIGHTER]: {
    need_blood: "raise_emergency_request",
    default: "raise_emergency_request",
  },
  [UserRole.VOLUNTEER]: {
    default: "raise_emergency_request_general",
  },
  [UserRole.BRIDGE_DONOR]: {
    need_blood: "raise_emergency_request_general",
    default: "raise_emergency_request_general",
  },
  [UserRole.EMERGENCY_DONOR]: {
    need_blood: "raise_emergency_request_general",
    default: "raise_emergency_request_general",
  },
  [UserRole.GUEST]: {
    register: "register_as_donor",
    default: "raise_emergency_request_general",
  },
};

export const FORM_PATTERNS = {
  raise_emergency_request_form: [
    "screen_1_TextInput_0",
    "screen_0_Dropdown_4",
    "screen_0_Dropdown_5",
  ],
  change_transfusion_date_form: [
    "screen_0_DatePicker_0",
    "screen_0_TextInput_1",
    "screen_0_DatePicker_2",
  ],
  donor_registration_form: [
    "screen_0_Your_Full_Name_0",
    "screen_0_Location_Pincode_1",
    "screen_0_Email_2",
    "screen_0_Blood_Group_3",
    "screen_0_Select_this_if_you_want_to_be_the_vision_guardian_of_ThalassemiaFreeIndia2035_4"
  ]
} as const; 