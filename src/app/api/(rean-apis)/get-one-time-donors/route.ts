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
  const blood_group = searchParams.get("blood_group");
  const pincode = searchParams.get("pincode");
  if (!blood_group || !pincode) {
    return NextErrorResponse(
      "Bad Request. blood_group and pincode are required.",
      400
    );
  }

  const supabase = createClient();
  const { data: locationData, error: locationError } = await supabase
    .from("master_location")
    .select("district")
    .eq("pincode", pincode)
    .single();

  if (locationError || !locationData) {
    return NextErrorResponse(
      "Location not found for the provided pincode.",
      404
    );
  }

  const district = locationData.district;

  const { data, error } = await supabase
    .from("view_user_data_rean")
    .select("*")
    .eq("eligibility_status", "eligible")
    .eq("donor_type", "one time")
    .eq("blood_group", blood_group)
    .eq("location", district)
    .limit(10);
    
  if (error || !data || !data.length) {
    return NextErrorResponse("user not found", 404);
  }

  // Format and return success response
  return NextSuccessDataResponse(data);
};
