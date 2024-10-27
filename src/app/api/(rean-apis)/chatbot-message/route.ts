import { createClient } from "@/lib/supabase/client";
import { NextErrorResponse, NextSuccessResponse } from "@/utils/api/response";
import { authenticateUser } from "@/lib/rean-api/auth";

export const POST = async (request: Request) => {
  const authResponse = await authenticateUser(request);
  if (authResponse) return authResponse;

  const body = await request.json();
  const { mobile, message, message_type_id, time_stamp } = body;

  // Validate required fields
  if (!mobile || !message || !message_type_id || !time_stamp) {
    return NextErrorResponse("Bad Request. Missing required fields.", 400);
  }

  // Create Supabase client
  const supabase = createClient();
  // Insert message data into tracker_chatbot_message table
  const { error } = await supabase.from("tracker_chatbot_message").insert([
    {
      mobile: mobile,
      message: message,
      message_type_id: message_type_id,
      time_stamp: time_stamp,
    },
  ]);

  // Handle any errors during insertion
  if (error) {
    return NextErrorResponse(
      "Internal Server Error. Unable to log chatbot message data.",
      500
    );
  }

  // Success response
  return NextSuccessResponse("Chatbot message data logged successfully.");
};
