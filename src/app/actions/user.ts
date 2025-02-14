"use server";

import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { createUserSchema, updateUserSchema } from "./user.schema";
import { cache } from "@/lib/utils";
import { revalidateTag } from "next/cache";

// ========================================================================================================

export const getUsers = cache(
  async (): Promise<ApiResponse<User[]>> => {
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
  },
  [],
  {
    revalidate: 1500,
    tags: ["user"],
  }
);

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

  revalidateTag("user");

  return {
    success: true,
    message: "L'utilisateur a été créé avec succès.",
    data: user,
  };
};

// ========================================================================================================

export const updateUser = async (formData: FormData): Promise<ApiResponse<User>> => {
  const { success, data, error } = updateUserSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!success) {
    console.error(error);
    return {
      success: false,
      message: `Erreur lors de la validation des données`,
      data: null,
    };
  }

  const { id, name, email } = data;

  const existingUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!existingUser) {
    return {
      success: false,
      message: "L'utilisateur n'existe pas.",
      data: null,
    };
  }

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "Erreur lors de la modification de l'utilisateur.",
      data: null,
    };
  }

  revalidateTag("user");

  return {
    success: true,
    message: "L'utilisateur a été modifié avec succès.",
    data: user,
  };
};

// ========================================================================================================

export const deleteUser = async (id: string): Promise<ApiResponse<User>> => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!existingUser) {
    return {
      success: false,
      message: "L'utilisateur n'existe pas.",
      data: null,
    };
  }

  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "Erreur lors de la suppression de l'utilisateur.",
      data: null,
    };
  }

  revalidateTag("user");

  return {
    success: true,
    message: "L'utilisateur a été supprimé avec succès.",
    data: user,
  };
};

// ========================================================================================================
