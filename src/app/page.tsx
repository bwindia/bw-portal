import { SIGN_IN_PATH } from "@/utils/routes";
import { redirect } from "next/navigation";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

export default async function Home() {
  return (
    <>
      <ServiceWorkerRegistration />
      {redirect(SIGN_IN_PATH)}
    </>
  );
}
