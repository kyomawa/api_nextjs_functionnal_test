import { HomeMetadata } from "@/constants/metadata";
import { getUsers } from "./actions/user";
import HomePage from "./components/Homepage";

// ========================================================================================================

export const metadata = HomeMetadata;

export default async function Home() {
  const { data: users } = await getUsers();

  return <HomePage users={users || []} />;
}

// ========================================================================================================
