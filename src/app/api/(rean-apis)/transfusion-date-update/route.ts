import { authenticateUser } from "@/lib/rean-api/auth";
import { createClient } from "@/lib/supabase/client";
import { NextErrorResponse, NextSuccessResponse } from "@/utils/api/response";

export const POST = async (request: Request) => {
  const authResponse = await authenticateUser(request);
  if (authResponse) return authResponse;

  // Parse the request body
  const body = await request.json();
  const { bridge_id, next_requirement_date, updated_by_user_id } = body;

  // Validate required fields
  if (!bridge_id || !next_requirement_date || !updated_by_user_id) {
    return NextErrorResponse("Bad Request. Missing required fields.", 400);
  }

  // Create Supabase client
  const supabase = createClient();

  // Insert updated transfusion data into tracker_blood_bridge_transfusion table
  const { error } = await supabase
    .from("tracker_blood_bridge_transfusion")
    .insert([
      {
        bridge_id: bridge_id, // Mapped from bridge_patient_info
        next_requirement_date: next_requirement_date, // Next transfusion requirement date
        updated_by_user_id: updated_by_user_id, // ID of the user who updated this information
      },
    ]);

  // Handle any errors during insertion
  if (error) {
    return NextErrorResponse(
      "Internal Server Error. Unable to update transfusion date.",
      500
    );
  }

  // Success response
  return NextSuccessResponse("Transfusion date updated successfully.");
};
