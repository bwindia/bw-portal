import Button from "@/components/atoms/Button";
import Link from "next/link";

export default async function Home() {
  return (
    <Link href={"https://bloodwarriors.in"}>
      <Button className="m-10">Visit website</Button>
    </Link>
  );
}
