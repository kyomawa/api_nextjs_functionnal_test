import { prisma } from "@/lib/prisma";
import { Post } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  const posts = await prisma.post.findMany();

  if (!posts) {
    return NextResponse.json<ApiResponse<never>>({
      success: false,
      message: "Erreur lors de la récupération des posts.",
      data: null,
    });
  }

  return NextResponse.json<ApiResponse<Post[]>>({
    success: true,
    message: "Les posts ont été récupérés avec succès.",
    data: posts,
  });
}

// ========================================================================================================

const newPostSchema = z.object({
  title: z.string().min(2, { message: "Le titre doit contenir 2 caractères au minimum" }).max(100),
  description: z.string().min(2, { message: "La description doit contenir 2 caractères au minimum" }).max(500),
  userId: z.string(),
});

export async function POST(req: NextRequest) {
  const json: Partial<Post> = await req.json();
  const { success, data, error } = newPostSchema.safeParse(json);

  if (!success) {
    return NextResponse.json<ApiResponse<never>>({
      success: false,
      message: `Erreur lors de la validation des données: ${error.message}`,
      data: null,
    });
  }

  const { userId } = data;

  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) {
    return NextResponse.json<ApiResponse<never>>({
      success: false,
      message: "L'utilisateur n'existe pas.",
      data: null,
    });
  }

  const post = await prisma.post.create({
    data,
  });

  if (!post) {
    return NextResponse.json<ApiResponse<never>>({
      success: false,
      message: "Erreur lors de la création du post.",
      data: null,
    });
  }

  return NextResponse.json<ApiResponse<Post>>({
    success: true,
    message: "Le post a été créé avec succès.",
    data: post,
  });
}
