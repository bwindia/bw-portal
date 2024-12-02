import { SIGN_IN_PATH } from "@/utils/routes";
import { redirect } from "next/navigation";

export const Home = async () => {
  redirect(SIGN_IN_PATH);
};

export default Home;
