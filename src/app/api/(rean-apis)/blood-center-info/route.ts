import { createClient } from "@/lib/supabase/client";
import { authenticateUser } from "@/lib/rean-api/auth";
import {
  NextErrorResponse,
  NextSuccessDataResponse,
} from "@/utils/api/response";

export const GET = async (request: Request) => {
  const authResponse = await authenticateUser(request);
  if (authResponse) return authResponse;

  // Create Supabase client
  const supabase = createClient();

  // Fetch blood center information from the master_blood_center and master_location tables
  const { data, error } = await supabase
    .from("master_blood_center")
    .select(
      `blood_center_id,
      name,
      address,
      phone,
      email,
      category,
      is_active,
      maps_link,
      pincode`
    )
    // master_location(pincode, district)
    .eq("is_active", true); // Fetch only active blood centers

  // Handle any errors during data fetching
  if (error) {
    return NextErrorResponse(
      "Internal Server Error. Unable to fetch blood center information.",
      500
    );
  }

  // Transform the fetched data to include the required fields
  const transformedData = data.map((center: any) => ({
    blood_center_id: center.blood_center_id,
    name: center.name,
    address: center?.address,
    pincode: center?.pincode,
    phone: center.phone,
    email: center.email,
    category: center.category,
    is_active: center.is_active,
    maps_link: center.maps_link,
    // district: center.master_location.district,
  }));

  // Success response with the blood center information
  return NextSuccessDataResponse(transformedData);
};
