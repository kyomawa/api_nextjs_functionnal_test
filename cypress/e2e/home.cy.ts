describe("Form Submission", () => {
  // ======================================================================================================

  it("should fill the form with valid name & email and submit successfully", () => {
    cy.visit("http://localhost:3000/");

    cy.get('input[name="name"]').type("Bryan");
    cy.get('input[name="email"]').type("bryancellier@gmail.com");
    cy.get('button[type="submit"]').click();

    cy.contains("L'utilisateur a été créé avec succès.").should("be.visible");
  });

  // ======================================================================================================

  it("should display an error message if the name field is empty", () => {
    cy.visit("http://localhost:3000/");

    cy.get('input[name="name"]').type("");
    cy.get('input[name="email"]').type("bryancellier@gmail.com");
    cy.get('button[type="submit"]').click();

    cy.contains("Le nom doit contenir 2 caractères au minimum").should("be.visible");
  });

  // ======================================================================================================

  it("should display an error message if the name field is empty", () => {
    cy.visit("http://localhost:3000/");

    cy.get('input[name="name"]').type("C'est un nom vraiment très long qui dépasse les 50 caractères");
    cy.get('input[name="email"]').type("bryancellier@gmail.com");
    cy.get('button[type="submit"]').click();

    cy.contains("Le nom doit contenir 50 caractères au maximum").should("be.visible");
  });

  // ======================================================================================================

  it("should display an error message if the email field is empty", () => {
    cy.visit("http://localhost:3000/");

    cy.get('input[name="name"]').type("Bryan");
    cy.get('input[name="email"]').type("");
    cy.get('button[type="submit"]').click();

    cy.contains("L'addresse email doit contenir 2 caractères au minimum").should("be.visible");
  });

  // ======================================================================================================

  it("should display an error message if the email field is not a valid email", () => {
    cy.visit("http://localhost:3000/");

    cy.get('input[name="name"]').type("UnNomRandom");
    cy.get('input[name="email"]').type("ahahcen'estpasunmailmaaan");
    cy.get('button[type="submit"]').click();

    cy.contains("L'adresse email n'est pas valide.").should("be.visible");
  });

  // ======================================================================================================
});
