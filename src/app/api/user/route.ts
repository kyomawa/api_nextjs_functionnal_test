import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { z } from "zod";

// ========================================================================================================

export async function GET() {
  const users = await prisma.user.findMany();

  if (!users) {
    return NextResponse.json<ApiResponse<never>>({
      success: false,
      message: "Erreur lors de la récupération des utilisateurs.",
      data: null,
    });
  }

  return NextResponse.json<ApiResponse<User[]>>({
    success: true,
    message: "Les utilisateurs ont été récupérés avec succès.",
    data: users,
  });
}

// ========================================================================================================

const newUserSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir 2 caractères au minimum" }).max(50),
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  const json: Partial<User> = await req.json();
  const { success, data, error } = newUserSchema.safeParse(json);

  if (!success) {
    return NextResponse.json<ApiResponse<never>>({
      success: false,
      message: `Erreur lors de la validation des données: ${error.message}`,
      data: null,
    });
  }

  const { email } = data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return NextResponse.json<ApiResponse<never>>({
      success: false,
      message: "L'utilisateur existe déjà.",
      data: null,
    });
  }

  const user = await prisma.user.create({
    data,
  });

  if (!user) {
    return NextResponse.json<ApiResponse<never>>({
      success: false,
      message: "Erreur lors de la création de l'utilisateur.",
      data: null,
    });
  }

  return NextResponse.json<ApiResponse<User>>({
    success: true,
    message: "L'utilisateur a été créé avec succès.",
    data: user,
  });
}
