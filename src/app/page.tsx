import Breadcrumb from "@/components/molecules/Breadcrum";
import Table from "@/components/organisms/Table";
import { renderCell } from "@/components/organisms/Table/columns";
import { createClient } from "@/lib/supabase/server";
import { TABLE_COLUMNS } from "@/utils/constants";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {users} = await fetch("https://dummyjson.com/users")
    .then((res) => res.json())

  // const { data: users } = await supabase.from("users").select();

  return (
    <ul>
      Hi
      <Breadcrumb/>
      <Table searchable data={users} renderCell={renderCell} columns={TABLE_COLUMNS} />
      {/* <pre>
        {todos?.map((todo) => (
          <li>{todo}</li>
        ))}
      </pre> */}
    </ul>
  );
}
