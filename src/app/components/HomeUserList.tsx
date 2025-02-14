import { User } from "@prisma/client";
import HomeUserCard from "./HomeUserCard";

// ========================================================================================================

export default function HomeUserList({ users }: { users: User[] | null }) {
  if (!users || users.length === 0) {
    return <p>Aucun utilisateur(s) trouvé(s).</p>;
  }

  return (
    <ul className="grid grid-cols-3 gap-4">
      {users.map((user) => (
        <HomeUserCard key={user.id} user={user} />
      ))}
    </ul>
  );
}

// ========================================================================================================
