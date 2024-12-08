import Image from "next/image";
import authBanner from "@/assets/images/banners/auth-banner.jpg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex items-center mx-auto min-h-screen p-4">
      <div className="w-full flex items-center rounded-2xl overflow-hidden shadow-small">
        <div className="md:w-1/2 hidden md:block h-auto">
          <Image
            src={authBanner}
            alt="auth-banner"
            className="object-cover h-[80vh] w-full"
          />
        </div>
        <div className="md:w-1/2 w-full p-14">{children}</div>
      </div>
    </div>
  );
}
