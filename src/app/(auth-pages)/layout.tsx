import Image from "next/image";
import authBanner from "@/assets/images/banners/auth-banner.jpg";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container flex items-center mx-auto min-h-screen">
      <div className="w-full flex items-center rounded-2xl overflow-hidden shadow-2xl shadow-shadow">
        <div className="w-1/2 h-auto">
          <Image
            src={authBanner}
            alt="auth-banner"
            className="object-cover h-[80vh] w-full"
          />
        </div>
        <div className="w-1/2 p-14">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
