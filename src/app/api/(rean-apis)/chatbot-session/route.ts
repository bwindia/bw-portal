import { NextResponse } from "next/server";
import { authenticateUser } from "../auth";
import { createClient } from "@/lib/supabase/client";

export const POST = async (request: Request) => {
  const authResponse = await authenticateUser(request);
  if (authResponse) return authResponse;

  const body = await request.json();
  const { mobile, session_start_time, session_end_time } = body;

  // Validate the required fields
  if (!mobile || !session_start_time || !session_end_time) {
    return NextResponse.json(
      {
        status: "error",
        status_code: 400,
        message: "Bad Request. Missing required fields.",
      },
      { status: 400 }
    );
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
    return NextResponse.json(
      {
        status: "error",
        status_code: 500,
        message: "Internal Server Error. Unable to log chatbot session data.",
      },
      { status: 500 }
    );
  }

  // Success response
  return NextResponse.json({
    status: "success",
    message: "Chatbot session data logged successfully.",
  });
};
