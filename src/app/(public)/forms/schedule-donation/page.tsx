import ScheduleDonationForm from "@/components/organisms/forms/ScheduleDonation";
import { verifyFormToken } from "@/lib/auth/form-auth";

const ScheduleDonation = async ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  const { token } = searchParams;
  if (!token) {
    throw new Error("Token is required");
  }

  const payload = await verifyFormToken(token);
  if (!payload) {
    throw new Error("Invalid token");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Schedule donation</h1>
      <ScheduleDonationForm
        scheduleRequestId={payload.scheduleRequestId as string}
      />
    </div>
  );
};

export default ScheduleDonation;
