import { NextResponse } from "next/server";
import { authenticateUser } from "../auth";
import { createClient } from "@/lib/supabase/client";

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

  // Step 4: Insert donor call data into tracker_donor_calls table
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
    return NextResponse.json(
      {
        status: "error",
        status_code: 500,
        message: "Internal Server Error. Unable to log donor call.",
      },
      { status: 500 }
    );
  }

  // Step 6: Success response
  return NextResponse.json({
    status: "success",
    message: "Donor call logged successfully.",
  });
};
