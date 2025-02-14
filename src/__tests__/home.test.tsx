/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { createUser, getUsers } from "@/app/actions/user";
import HomeButton from "@/app/components/HomeButton";
import HomeUserList from "@/app/components/HomeUserList";
import { HomeForm } from "@/app/components/HomeForm";

// ========================================================================================================

jest.mock("@/app/actions/user", () => ({
  getUsers: jest.fn(),
  createUser: jest.fn(),
}));

// ========================================================================================================

describe("Home", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ======================================================================================================

  it("should render a button with correct text", async () => {
    render(<HomeButton />);

    const button = screen.getByRole("button", { name: "Click here !" });

    expect(button).toBeInTheDocument();
  });

  // ======================================================================================================

  it("should display the list of users", async () => {
    (getUsers as jest.Mock).mockResolvedValue({
      data: [
        { id: "1", name: "Bryan", email: "bryancellier@gmail.com" },
        { id: "2", name: "Juliette", email: "juliette.dumont@gmail.com" },
      ],
    });

    render(
      <HomeUserList
        users={[
          { id: "1", name: "Bryan", email: "bryancellier@gmail.com" },
          { id: "2", name: "Juliette", email: "juliette.dumont@gmail.com" },
        ]}
      />
    );

    const list = await screen.findByRole("list");
    expect(list).toBeInTheDocument();
  });

  // ======================================================================================================

  it("should display 'Aucun utilisateur(s) trouvé(s).' when no users exist", async () => {
    (getUsers as jest.Mock).mockResolvedValue({ data: [] });

    render(<HomeUserList users={[]} />);

    const message = await screen.findByText("Aucun utilisateur(s) trouvé(s).");
    expect(message).toBeInTheDocument();
  });

  // ======================================================================================================

  it("should display 'L'utilisateur a été créé avec succès.' when a user is created", async () => {
    (createUser as jest.Mock).mockResolvedValue({ data: { name: "Bryan", email: "bryancellier@gmail.com" } });

    render(<HomeForm />);

    const message = await screen.findByText("L'utilisateur a été créé avec succès.");
    expect(message).toBeInTheDocument();
  });

  // ======================================================================================================
});
