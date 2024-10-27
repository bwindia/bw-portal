import { authenticateUser } from "@/lib/rean-api/auth";
import { createClient } from "@/lib/supabase/client";
import {
  NextErrorResponse,
  NextSuccessDataResponse,
} from "@/utils/api/response";

export const GET = async (request: Request) => {
  const authResponse = await authenticateUser(request);
  if (authResponse) return authResponse;

  // Get query parameters (phone_number or bridge_id)
  const { searchParams } = new URL(request.url);
  const phone_number = searchParams.get("phone_number");
  const blood_bridge_id = searchParams.get("blood_bridge_id");
  const user_id = searchParams.get("user_id");
  if (!phone_number && !blood_bridge_id && !user_id) {
    return NextErrorResponse(
      "Bad Request. Either phone_number or blood_bridge_id or user_id is required.",
      400
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
  } else if (user_id) {
    query = query.eq("user_id", user_id);
  }

  const { data, error } = await query;

  if (error || !data || !data.length) {
    return NextErrorResponse("user not found", 404);
  }

  // Format and return success response
  return NextSuccessDataResponse(data);
};
