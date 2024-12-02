"use client";
import { SIGN_IN_PATH } from "@/utils/routes";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/Button";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-80">
      <div className="flex items-center justify-center rounded-full gap-2">
        <span className="material-symbols-rounded text-4xl text-danger">
          error
        </span>
        <span className="text-center">
          The form you&apos;re looking for has expired!
        </span>
      </div>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => router.push(SIGN_IN_PATH)
        }
      >
        Go to Home
      </Button>
    </div>
  );
}
