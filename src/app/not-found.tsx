import Button from "@/components/atoms/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">
        <Button className="mt-3">Return Home</Button>
      </Link>
    </div>
  );
}
