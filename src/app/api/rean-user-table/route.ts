import { createClient } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const authorization = request.headers.get("Authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return NextResponse.json(
      {
        status: "error",
        status_code: 401,
        message: "Unauthorized. Bearer token required.",
      },
      { status: 401 }
    );
  }

  // Token verification logic
  const token = authorization.split(" ")[1];
  const isValidToken = await verifyToken(token);
  if (!isValidToken) {
    return NextResponse.json(
      {
        status: "error",
        status_code: 401,
        message: "Unauthorized. Invalid token.",
      },
      { status: 401 }
    );
  }

  // Get query parameters (phone_number or bridge_id)
  const { searchParams } = new URL(request.url);
  const phone_number = searchParams.get("phone_number");
  const blood_bridge_id = searchParams.get("blood_bridge_id");
  if (!phone_number && !blood_bridge_id) {
    return NextResponse.json(
      {
        status: "error",
        status_code: 400,
        message: "Bad Request. Either phone_number or blood_bridge_id is required.",
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

async function verifyToken(token: string): Promise<boolean> {
  try {
    // Decode the Base64 token
    const decodedToken = Buffer.from(token, 'base64').toString('utf-8');
    // Get the current date in YYYY-MM-DD format
    const today = new Date();
    const currentDate = today.toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    // The token should contain "bloodwarriors-YYYY-MM-DD"
    const expectedTokenString = `bloodwarriors-${currentDate}`;
    return decodedToken === expectedTokenString;
  } catch (error) {
    console.error(error)
    return false;
  }
}
