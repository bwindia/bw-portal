import { NextResponse } from "next/server";
import { authenticateUser } from "../auth";
import { createClient } from "@/lib/supabase/client";

export const POST = async (request: Request) => {
  // Step 1: Authenticate user
  const authResponse = await authenticateUser(request);
  if (authResponse) return authResponse;

  // Step 2: Parse the request body
  const body = await request.json();
  const { mobile, reason } = body;

  // Step 3: Validate required fields
  if (!mobile || !reason) {
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

  // Step 4: Update user status in the chatbot user table
  const { error } = await supabase
    .from("tracker_deregister_user")
    .update({ status: "deregistered", deregistration_reason: reason })
    .eq("mobile", mobile);

  // Step 5: Handle any errors during update
  if (error) {
    return NextResponse.json(
      {
        status: "error",
        status_code: 500,
        message: "Internal Server Error. Unable to deregister user.",
      },
      { status: 500 }
    );
  }

  // Step 6: Success response
  return NextResponse.json({
    status: "success",
    message: "User deregistered from chatbot successfully.",
  });
};
