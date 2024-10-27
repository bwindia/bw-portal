import { createClient } from "@/lib/supabase/client";
import { NextErrorResponse, NextSuccessResponse } from "@/utils/api/response";
import { authenticateUser } from "@/lib/rean-api/auth";

export const POST = async (request: Request) => {
  const authResponse = await authenticateUser(request);
  if (authResponse) return authResponse;

  const body = await request.json();
  const { mobile, session_start_time, session_end_time } = body;

  // Validate the required fields
  if (!mobile || !session_start_time || !session_end_time) {
    return NextErrorResponse("Bad Request. Missing required fields.", 400);
  }

  // Insert the session data into the tracker_chatbot_session table in Supabase
  const supabase = createClient();
  const { error } = await supabase.from("tracker_chatbot_session").insert([
    {
      mobile: mobile,
      session_start_time: session_start_time,
      session_end_time: session_end_time,
    },
  ]);

  // Handle any errors during insertion
  if (error) {
    return NextErrorResponse(
      "Internal Server Error. Unable to log chatbot session data.",
      500
    );
  }

  // Success response
  return NextSuccessResponse("Chatbot session data logged successfully.");
};
