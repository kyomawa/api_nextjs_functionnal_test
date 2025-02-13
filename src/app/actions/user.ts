import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

// ========================================================================================================

export const getUsers = async (): Promise<ApiResponse<User[]>> => {
  const users = await prisma.user.findMany();

  if (!users) {
    return {
      success: false,
      message: "Erreur lors de la récupération des utilisateurs.",
      data: null,
    };
  }

  return {
    success: true,
    message: "Les utilisateurs ont été récupérés avec succès.",
    data: users,
  };
};

// ========================================================================================================
