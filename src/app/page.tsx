import { SIGN_IN_PATH } from "@/utils/routes";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect(SIGN_IN_PATH);
}
