import { authenticateUser } from "@/lib/rean-api/auth";
import { createClient } from "@/lib/supabase/client";
import { NextErrorResponse, NextSuccessResponse } from "@/utils/api/response";

export const POST = async (request: Request) => {
  // Step 1: Authenticate user
  const authResponse = await authenticateUser(request);
  if (authResponse) return authResponse;

  // Step 2: Parse the request body
  const body = await request.json();
  const {
    user_id,
    last_contacted_date,
    dnd_status_id,
    comments,
    contacted_by,
  } = body;

  // Step 3: Validate required fields
  if (!user_id || !last_contacted_date || !dnd_status_id || !contacted_by) {
    return NextErrorResponse("Bad Request. Missing required fields.", 400);
  }

  // Step 4: Insert donor call data into tracker_donor_calls table
  const supabase = createClient();
  const { error } = await supabase.from("tracker_donor_calls").insert([
    {
      user_id: user_id,
      last_contacted_date: last_contacted_date,
      dnd_status_id: dnd_status_id,
      comments: comments,
      contacted_by: contacted_by,
    },
  ]);

  // Step 5: Handle any errors during insertion
  if (error) {
    return NextErrorResponse(
      "Internal Server Error. Unable to log donor call.",
      500
    );
  }

  // Step 6: Success response
  return NextSuccessResponse("Donor call logged successfully.");
};
