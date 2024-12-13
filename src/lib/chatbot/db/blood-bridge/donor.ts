import { createClient } from "@/lib/supabase/server";

export const getDonorAllDonations = async (donorId: string) => {
  const supabase = createClient();
  // sort by latest donation date first
  const { data, error } = await supabase
    .from("tracker_donation")
    .select("*")
    .eq("user_id", donorId)
    .order("donation_date", { ascending: false });

  if (error) {
    throw new Error(
      "We couldn't fetch your donations. Please try again later."
    );
  }

  if (data.length === 0) {
    throw new Error(
      "You haven't donated yet. Please donate to generate a certificate."
    );
  }

  return data;
};

export const getTotalDonorsOfBadge = async (badge: string): Promise<number> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("view_user_data_rean")
    .select("user_id")
    .eq("badge_name", badge);

  if (error) {
    throw new Error(
      "We couldn't fetch your donations. Please try again later."
    );
  }

  const uniqueUserIds = new Set(data.map((user) => user.user_id));
  return uniqueUserIds.size;
};

