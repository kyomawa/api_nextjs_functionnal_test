import "@testing-library/jest-dom";
import { GET, POST } from "./route";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// ========================================================================================================

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

// ========================================================================================================

describe("GET /users", () => {
  it("should return a list of users with success", async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue([
      {
        id: "123",
        name: "Bryan",
        email: "bryancellier@gmail.com",
      },
    ]);
    const response = await GET();
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toMatchObject({
      success: true,
      message: "Les utilisateurs ont été récupérés avec succès.",
      data: [
        {
          id: "123",
          name: "Bryan",
          email: "bryancellier@gmail.com",
        },
      ],
    });

    expect(Array.isArray(data.data)).toBe(true);
    expect(data.data.length).toBe(1);
  });
});

// ========================================================================================================

describe("POST /users", () => {
  it("should create a new user with success", async () => {
    const user = {
      name: "John Doe",
      email: "john.doe@example.com",
    };

    // 🛠️ Prisma doit retourner `null` pour signifier que l'utilisateur n'existe pas encore
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    // 🔹 Prisma doit renvoyer l'utilisateur créé
    (prisma.user.create as jest.Mock).mockResolvedValue({
      id: "123",
      name: user.name,
      email: user.email,
    });

    const request = new NextRequest("http://localhost/api/users", {
      method: "POST",
      body: JSON.stringify(user),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toMatchObject({
      success: true,
      message: "L'utilisateur a été créé avec succès.",
      data: {
        id: "123",
        name: user.name,
        email: user.email,
      },
    });
  });
});

// ========================================================================================================
