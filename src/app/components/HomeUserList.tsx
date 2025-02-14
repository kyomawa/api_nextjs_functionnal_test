import { User } from "@prisma/client";

// ========================================================================================================

export default function HomeUserList({ users }: { users: User[] | null }) {
  if (!users || users.length === 0) {
    return <p>Aucun utilisateur(s) trouvé(s).</p>;
  }

  return (
    <ul className="grid grid-cols-3 gap-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </ul>
  );
}

// ========================================================================================================

function UserCard({ user }: { user: User }) {
  return (
    <li className="flex flex-col gap-y-0.5">
      <h2 className="font-semibold">{user.name}</h2>
      <p className="text-sm text-white/85">{user.email}</p>
    </li>
  );
}

// ========================================================================================================
