import { createClient } from "@/lib/supabase/client";
import { authenticateUser } from "@/lib/rean-api/auth";
import { NextErrorResponse, NextSuccessResponse } from "@/utils/api/response";

export const POST = async (request: Request) => {
  const authResponse = await authenticateUser(request);
  if (authResponse) return authResponse;

  // Parse the request body
  const body = await request.json();
  const { user_id, status_id, insert_date } = body;

  // Validate required fields
  if (!user_id || !status_id || !insert_date) {
    return NextErrorResponse("Bad Request. Missing required fields.", 400);
  }

  // Validate the status_id (should always be 6 for voluntary donations)
  if (status_id !== 6) {
    return NextErrorResponse(
      "Bad Request. Invalid status ID for voluntary donation.",
      400
    );
  }

  // Create Supabase client
  const supabase = createClient();

  // Insert voluntary donation request data into tracker_volunteer_donation_request table
  const { error } = await supabase
    .from("tracker_volunteer_donation_request")
    .insert([
      {
        user_id: user_id, // Mapped from user_data
        status_id: status_id, // Should always be 6 (Mapped from master_donation_status)
        insert_date: insert_date, // Date when the voluntary donation was requested
      },
    ]);

  // Handle any errors during insertion
  if (error) {
    return NextErrorResponse(
      "Internal Server Error. Unable to raise voluntary donation request.",
      500
    );
  }

  // Success response
  return NextSuccessResponse("Voluntary donation request raised successfully.");
};
