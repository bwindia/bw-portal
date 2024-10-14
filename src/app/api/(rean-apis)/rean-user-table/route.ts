import { createClient } from "@/lib/supabase/client";
import { NextResponse } from "next/server";
import { authenticateUser } from "../auth";

export const GET = async (request: Request) => {
  const authResponse = await authenticateUser(request);
  if (authResponse) return authResponse;

  // Get query parameters (phone_number or bridge_id)
  const { searchParams } = new URL(request.url);
  const phone_number = searchParams.get("phone_number");
  const blood_bridge_id = searchParams.get("blood_bridge_id");
  if (!phone_number && !blood_bridge_id) {
    return NextResponse.json(
      {
        status: "error",
        status_code: 400,
        message:
          "Bad Request. Either phone_number or blood_bridge_id is required.",
      },
      { status: 400 }
    );
  }

  const supabase = createClient();
  let query = supabase.from("view_user_data_rean").select("*");
  if (phone_number && blood_bridge_id) {
    query = query.or(
      `phone_number.eq.${phone_number},bridge_id.eq.${blood_bridge_id}`
    );
  } else if (phone_number) {
    query = query.eq("phone_number", phone_number);
  } else if (blood_bridge_id) {
    query = query.eq("bridge_id", blood_bridge_id);
  }

  const { data, error } = await query;

  if (error || !data) {
    return NextResponse.json(
      {
        status: "error",
        status_code: 404,
        message: "user not found",
      },
      { status: 404 }
    );
  }

  // Format and return success response
  return NextResponse.json({
    status: "Success",
    status_code: 200,
    data,
  });
};
