import { NextResponse } from "next/server";
import { authenticateUser } from "../auth";
import { createClient } from "@/lib/supabase/client";

export const POST = async (request: Request) => {
  const authResponse = await authenticateUser(request);
  if (authResponse) return authResponse;

  const body = await request.json();
  const { mobile, time_stamp, reminder_type } = body;

  // Validate the required fields
  if (!mobile || !time_stamp || !reminder_type) {
    return NextResponse.json(
      {
        status: "error",
        status_code: 400,
        message: "Bad Request. Missing required fields.",
      },
      { status: 400 }
    );
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
    return NextResponse.json(
      {
        status: "error",
        status_code: 400,
        message: "Invalid reminder_type. No matching reminder found.",
      },
      { status: 400 }
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
    return NextResponse.json(
      {
        status: "error",
        status_code: 500,
        message: "Internal Server Error. Unable to log reminder data.",
      },
      { status: 500 }
    );
  }

  // Success response
  return NextResponse.json({
    status: "success",
    message: "Chatbot reminder data logged successfully.",
  });
};
