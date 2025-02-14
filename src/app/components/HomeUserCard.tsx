"use client";

// ========================================================================================================

import { Button } from "@/components/ui/button";
import { deleteUser } from "../actions/user";
import { Loader, X } from "lucide-react";
import { User } from "@prisma/client";
import { SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

// ========================================================================================================

export default function HomeUserCard({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <li className={cn("flex justify-between items-center rounded p-4", isLoading && "bg-white/15 animate-pulse")}>
      {isLoading ? (
        <div className="flex items-center justify-center size-full">
          <Loader className="animate-loading" />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-y-0.5">
            <h2 className="font-semibold">{user.name}</h2>
            <p className="text-sm text-white/85">{user.email}</p>
          </div>
          <DeleteButton userId={user.id} setIsLoading={setIsLoading} />
        </>
      )}
    </li>
  );
}

// ========================================================================================================

type DeleteButtonProps = {
  userId: User["id"];
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
};

function DeleteButton({ userId, setIsLoading }: DeleteButtonProps) {
  const handleClick = async () => {
    setIsLoading(true);
    const { success, message } = await deleteUser(userId);
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
    setIsLoading(false);
  };

  return (
    <Button className="hover:bg-red-500/95 transition-colors duration-200" onClick={handleClick}>
      <X className="size-6" />
    </Button>
  );
}

// ========================================================================================================
