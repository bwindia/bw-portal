import Button from "@/components/atoms/Button";
import {
  SCHEDULE_DONATION_PAGE_ROUTE,
  SIGN_IN_PATH,
  TRACK_DONATION_PAGE_ROUTE,
  TRACK_TRANSFUSION_PAGE_ROUTE,
} from "@/utils/routes";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex gap-4 m-10">
      <Link href={SIGN_IN_PATH}>
        <Button>Sign in</Button>
      </Link>
      <Link href={SCHEDULE_DONATION_PAGE_ROUTE}>
        <Button>Schedule Donation</Button>
      </Link>
      <Link href={TRACK_DONATION_PAGE_ROUTE}>
        <Button>Track Donation</Button>
      </Link>
      <Link href={TRACK_TRANSFUSION_PAGE_ROUTE}>
        <Button>Track Transfusion</Button>
      </Link>
    </div>
  );
}
