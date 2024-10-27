import { createClient } from "@/lib/supabase/client";
import { authenticateUser } from "@/lib/rean-api/auth";
import { NextErrorResponse, NextSuccessResponse } from "@/utils/api/response";

export const POST = async (request: Request) => {
  const authResponse = await authenticateUser(request);
  if (authResponse) return authResponse;

  const body = await request.json();
  const { mobile, time_stamp, reminder_type } = body;

  // Validate the required fields
  if (!mobile || !time_stamp || !reminder_type) {
    return NextErrorResponse("Bad Request. Missing required fields.", 400);
  }

  // Insert the reminder data into the tracker_chatbot_reminder table in Supabase
  const supabase = createClient();

  // Step 1: Look up the reminder_id from master_chatbot_reminder_type
  const { data: reminderData, error: reminderError } = await supabase
    .from("master_chatbot_reminder_type")
    .select("reminder_id")
    .eq("reminder_type", reminder_type)
    .single();

  // Check if reminder_type exists
  if (reminderError || !reminderData) {
    return NextErrorResponse(
      "Invalid reminder_type. No matching reminder found.",
      400
    );
  }

  const reminder_id = reminderData.reminder_id; // Get the reminder_id from the query

  // Step 2: Insert the reminder data into the tracker_chatbot_reminder table
  const { error } = await supabase.from("tracker_chatbot_reminder").insert([
    {
      mobile: mobile,
      time_stamp: time_stamp,
      reminder_type: reminder_id,
    },
  ]);
  // Handle any errors during insertion
  if (error) {
    return NextErrorResponse(
      "Internal Server Error. Unable to log reminder data.",
      500
    );
  }

  // Success response
  return NextSuccessResponse("Chatbot reminder data logged successfully.",
  );
};
