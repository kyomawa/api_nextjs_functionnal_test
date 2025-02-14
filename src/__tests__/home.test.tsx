/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
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
    const getUsersMocked = getUsers as jest.Mock;
    const users = [
      { id: "1", name: "Titouan lecool", email: "titouan.lecool@gmail.com" },
      { id: "2", name: "Bastien levenère", email: "bastien.levenere@gmail.com" },
    ];

    getUsersMocked.mockResolvedValue({ users });

    render(<HomeUserList users={users} />);

    const list = await screen.findByRole("list");
    expect(list).toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);

    expect(listItems[0]).toHaveTextContent("Titouan lecool");
    expect(listItems[0]).toHaveTextContent("titouan.lecool@gmail.com");

    expect(listItems[1]).toHaveTextContent("Bastien levenère");
    expect(listItems[1]).toHaveTextContent("bastien.levenere@gmail.com");
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

  it("should display 'L'adresse email n'est pas valide' when user email is invalid", async () => {
    const form = render(<HomeForm />);

    const emailInput = form.getByRole("textbox", { name: "email" });
    fireEvent.change(emailInput, { target: { value: "UneAdresseEmailVreuuuumeeeeent" } });

    const submitButton = form.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText("L'adresse email n'est pas valide");
    expect(errorMessage).toBeInTheDocument();
  });

  // ======================================================================================================
});
