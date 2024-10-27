import { createClient } from "@/lib/supabase/client";
import { authenticateUser } from "@/lib/rean-api/auth";
import { NextErrorResponse, NextSuccessResponse } from "@/utils/api/response";

export const POST = async (request: Request) => {
  const authResponse = await authenticateUser(request);
  if (authResponse) return authResponse;

  // Parse the request body
  const body = await request.json();
  const {
    bridge_id,
    request_type_id,
    no_of_units,
    request_by_user_id,
    requested_date,
  } = body;

  // Validate required fields
  if (
    !bridge_id ||
    !request_type_id ||
    !no_of_units ||
    !request_by_user_id ||
    !requested_date
  ) {
    return NextErrorResponse("Bad Request. Missing required fields.", 400);
  }

  // Create Supabase client
  const supabase = createClient();

  // Insert request data into the tracker_emergency_request table
  const { error } = await supabase.from("tracker_emergency_request").insert([
    {
      bridge_id: bridge_id, // Mapped from bridge_patient_info
      request_type: request_type_id, // Mapped from master_donation_type
      no_of_units: no_of_units,
      request_by_user_id: request_by_user_id,
      requested_date: requested_date,
    },
  ]);

  // Handle any errors during insertion
  if (error) {
    return NextErrorResponse(
      "Internal Server Error. Unable to raise donation request.",
      500
    );
  }

  // Success response
  return NextSuccessResponse("Donation request raised successfully.");
};
