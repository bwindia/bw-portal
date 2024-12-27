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
      "Something went wrong while fetching your donations. Please try again later."
    );
  }

  if (data.length === 0) {
    throw new Error(
      "You haven't donated yet. Please donate to generate a certificate."
    );
  }

  return data;
};

export const activateUser = async (mobile: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_data")
    .update({ is_active: true })
    .eq("mobile", mobile)
    .select("user_id")
    .single();

  if (error) {
    throw new Error(
      "Something went wrong while activating your account. Please try again later."
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
      "Something went wrong while fetching your donations. Please try again later."
    );
  }

  const uniqueUserIds = new Set(data.map((user) => user.user_id));
  return uniqueUserIds.size;
};

export const registerDonor = async (donorData: any, mobile: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_data")
    .update(donorData)
    .eq("mobile", mobile)
    .select("user_id")
    .single();
  if (error) {
    throw new Error(
      "Something went wrong while registering you as a donor. Please try again"
    );
  }
  return data;
};

export const updateRoleByBridgePreference = async (
  bridgePreference: boolean,
  userId: string
) => {
  const supabase = createClient();
  if (bridgePreference) {
    const { error: bridgeDonorRoleError } = await supabase
      .from("mapping_user_role")
      .update({ role_status: true })
      .eq("user_id", userId)
      .eq("role_id", 6);
    const { error: emergencyDonorRoleError } = await supabase
      .from("mapping_user_role")
      .update({ role_status: false })
      .eq("user_id", userId)
      .eq("role_id", 5);

    if (bridgeDonorRoleError || emergencyDonorRoleError)
      throw new Error(
        "Something went wrong while updating your role. Please try again"
      );
  } else {
    const { error: emergencyDonorRoleError } = await supabase
      .from("mapping_user_role")
      .update({ role_status: true })
      .eq("user_id", userId)
      .eq("role_id", 5);
    const { error: bridgeDonorRoleError } = await supabase
      .from("mapping_user_role")
      .update({ role_status: false })
      .eq("user_id", userId)
      .eq("role_id", 6);
    if (emergencyDonorRoleError || bridgeDonorRoleError)
      throw new Error(
        "Something went wrong while updating your role. Please try again"
      );
  }
  return { bridgePreference, userId };
};

export const storeCertificate = async (pdfName: string, pdfBuffer: Buffer) => {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("chatbot")
    .upload(`certificates/${pdfName}`, pdfBuffer, {
      contentType: "application/pdf",
      cacheControl: "3600",
      upsert: false,
    });
  if (error) {
    if (error.message === "The resource already exists") {
      return;
    } else {
      throw new Error(
        "Something went wrong while storing your certificate. Please try again later."
      );
    }
  }
  return data;
};

export const getCertificateUrl = async (pdfName: string) => {
  const supabase = createClient();
  const {
    data: { publicUrl },
  } = await supabase.storage.from("chatbot").getPublicUrl(`certificates/${pdfName}`);
  return publicUrl;
};
