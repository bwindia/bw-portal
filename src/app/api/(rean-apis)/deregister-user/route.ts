import { createClient } from "@/lib/supabase/client";
import { NextErrorResponse, NextSuccessResponse } from "@/utils/api/response";
import { authenticateUser } from "@/lib/rean-api/auth";

export const POST = async (request: Request) => {
  // Step 1: Authenticate user
  const authResponse = await authenticateUser(request);
  if (authResponse) return authResponse;

  // Step 2: Parse the request body
  const body = await request.json();
  const { mobile, message_before_stop } = body;

  // Step 3: Validate required fields
  if (!mobile || !message_before_stop) {
    return NextErrorResponse("Bad Request. Missing required fields.", 400);
  }

  // Create Supabase client
  const supabase = createClient();

  // Step 4: Update user status in the chatbot user table

  const { error } = await supabase
    .from("tracker_deregister_user")
    .insert([{ mobile: mobile, message_before_stop: message_before_stop }]);

  // Step 5: Handle any errors during update
  if (error) {
    return NextErrorResponse(
      "Internal Server Error. Unable to deregister user.",
      500
    );
  }

  // Step 6: Success response
  return NextSuccessResponse("User deregistered from chatbot successfully.");
};
