import { createClient } from "@/lib/supabase/client";
import { authenticateUser } from "@/lib/rean-api/auth";
import { NextErrorResponse, NextSuccessResponse } from "@/utils/api/response";

export const POST = async (request: Request) => {
  const authResponse = await authenticateUser(request);
  if (authResponse) return authResponse;

  // Parse the request body
  const body = await request.json();
  const {
    user_id,
    donation_date,
    next_eligible_date,
    blood_type_id,
    donation_type_id,
    blood_center_id,
    bridge_id,
    request_id,
    donation_status_id,
    volunteer_user_id,
  } = body;

  // Validate required fields
  if (
    !user_id ||
    !donation_date ||
    !next_eligible_date ||
    !blood_type_id ||
    !donation_type_id ||
    !blood_center_id ||
    !bridge_id ||
    !donation_status_id ||
    !volunteer_user_id
  ) {
    return NextErrorResponse("Bad Request. Missing required fields.", 400);
  }

  // Create Supabase client
  const supabase = createClient();

  // Insert donation tracking data into tracker_donation table
  const { error } = await supabase.from("tracker_donation").insert([
    {
      user_id: user_id, // Mapped from user_data
      donation_date: donation_date,
      next_eligible_date: next_eligible_date,
      blood_type_id: blood_type_id, // Mapped from master_blood_type
      donation_type_id: donation_type_id, // Mapped from master_donation_type
      blood_center_id: blood_center_id, // Mapped from master_blood_center
      bridge_id: bridge_id, // Mapped from bridge_patient_info
      request_id: request_id || null, // Mapped from tracker_emergency_request, can be NULL
      donation_status_id: donation_status_id, // Mapped from master_donation_status
      volunteer_user_id: volunteer_user_id, // Volunteer tracking the donation
    },
  ]);

  // Handle any errors during insertion
  if (error) {
    console.log(error)
    return NextErrorResponse(
      "Internal Server Error. Unable to track donation.",
      500
    );
  }

  // Success response
  return NextSuccessResponse("Donation tracked successfully.");
};
