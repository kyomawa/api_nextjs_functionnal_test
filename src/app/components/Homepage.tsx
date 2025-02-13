import { User } from "@prisma/client";
import HomeButton from "./HomeButton";
import HomeUserList from "./HomeUserList";

// ========================================================================================================

type HomePageProps = {
  users: User[] | null;
};

export default function HomePage({ users }: HomePageProps) {
  return (
    <div className="p-12 flex flex-col gap-y-24">
      <section className="flex flex-col gap-y-4">
        <h1 className="text-xl font-bold">Exercice 01</h1>
        <HomeButton />
      </section>
      <section className="flex flex-col gap-y-4">
        <h1 className="text-xl font-bold">Exercice 02</h1>
        <HomeUserList users={users} />
      </section>
    </div>
  );
}

// ========================================================================================================
