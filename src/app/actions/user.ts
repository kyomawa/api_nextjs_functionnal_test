"use server";

import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { createUserSchema } from "./user.schema";

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

export const createUser = async (formdata: FormData): Promise<ApiResponse<User>> => {
  const { success, data, error } = createUserSchema.safeParse({
    name: formdata.get("name"),
    email: formdata.get("email"),
  });

  if (!success) {
    console.error(error);
    return {
      success: false,
      message: `Erreur lors de la validation des données`,
      data: null,
    };
  }

  const { email } = data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      message: "L'utilisateur existe déjà.",
      data: null,
    };
  }

  const user = await prisma.user.create({
    data,
  });

  if (!user) {
    return {
      success: false,
      message: "Erreur lors de la création de l'utilisateur.",
      data: null,
    };
  }

  return {
    success: true,
    message: "L'utilisateur a été créé avec succès.",
    data: user,
  };
};

// ========================================================================================================
