import { NextResponse } from "next/server";
import { authenticateUser } from "../auth";
import { createClient } from "@/lib/supabase/client";

export const POST = async (request: Request) => {
  const authResponse = await authenticateUser(request);
  if (authResponse) return authResponse;

  const body = await request.json();
  const { mobile, message, message_type_id, time_stamp } = body;

  // Validate required fields
  if (!mobile || !message || !message_type_id || !time_stamp) {
    return NextResponse.json(
      {
        status: "error",
        status_code: 400,
        message: "Bad Request. Missing required fields.",
      },
      { status: 400 }
    );
  }

  // Create Supabase client
  const supabase = createClient();
  // Insert message data into tracker_chatbot_message table
  const { error } = await supabase.from("tracker_chatbot_message").insert([
    {
      mobile: mobile,
      message: message,
      message_type_id: message_type_id, // Assuming it's a foreign key to the message type
      time_stamp: time_stamp, // Ensure the format is validated
    },
  ]);

  // Handle any errors during insertion
  if (error) {
    return NextResponse.json(
      {
        status: "error",
        status_code: 500,
        message: "Internal Server Error. Unable to log chatbot message data.",
      },
      { status: 500 }
    );
  }

  // Success response
  return NextResponse.json({
    status: "success",
    message: "Chatbot message data logged successfully.",
  });
};
