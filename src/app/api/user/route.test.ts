import "@testing-library/jest-dom";
import { GET, POST } from "./route";
import { NextRequest } from "next/server";

// ========================================================================================================

describe("GET /users", () => {
  it("should return a list of users with success", async () => {
    const response = await GET();
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toMatchObject({
      success: true,
      message: "Les utilisateurs ont été récupérés avec succès.",
    });

    expect(Array.isArray(data.data)).toBe(true);
  });
});

describe("POST /users", () => {
  it("should create a new user with success", async () => {
    const user = {
      name: "John Doe",
      email: "john.doe@example.com",
    };
    const request = new NextRequest("http://localhost/api/users", {
      method: "POST",
      body: JSON.stringify(user),
    });
    const response = await POST(request);
    expect(response.status).toBe(200);
  });
});
