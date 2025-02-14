describe("Form Submission", () => {
  // ======================================================================================================

  it("should fill the form with valid name & email and submit successfully", () => {
    cy.visit("http://localhost:3000/");

    cy.get('input[name="name"]').type("Ce mec Random");
    cy.get('input[name="email"]').type("cemecrandom@gmail.com");
    cy.get('button[type="submit"]').click();

    cy.contains("L'utilisateur a été créé avec succès.").should("be.visible");
  });

  // ======================================================================================================

  it("should display an error message if the name field is too short", () => {
    cy.visit("http://localhost:3000/");

    cy.get('input[name="name"]').type("d");
    cy.get('input[name="email"]').type("bryancellier@gmail.com");
    cy.get('button[type="submit"]').click();

    cy.contains("Le nom doit contenir 2 caractères au minimum").should("be.visible");
  });

  // ======================================================================================================

  it("should display an error message if the name field is too long", () => {
    cy.visit("http://localhost:3000/");

    cy.get('input[name="name"]').type("C'est un nom vraiment très long qui dépasse les 50 caractères");
    cy.get('input[name="email"]').type("bryancellier@gmail.com");
    cy.get('button[type="submit"]').click();

    cy.contains("Le nom doit contenir 50 caractères au maximum").should("be.visible");
  });

  // ======================================================================================================

  it("should display an error message if the email field is too short", () => {
    cy.visit("http://localhost:3000/");

    cy.get('input[name="name"]').type("Bryan");
    cy.get('input[name="email"]').type("d");
    cy.get('button[type="submit"]').click();

    cy.contains("L'adresse email doit contenir 2 caractères au minimum").should("be.visible");
  });

  // ======================================================================================================

  it("should display an error message if the email field is not a valid email", () => {
    cy.visit("http://localhost:3000/");

    cy.get('input[name="name"]').type("UnNomRandom");
    cy.get('input[name="email"]').type("ahahcen'estpasunmailmaaan");
    cy.get('button[type="submit"]').click();

    cy.contains("L'adresse email n'est pas valide").should("be.visible");
  });

  // ======================================================================================================

  it("should delete the last user from the list", () => {
    cy.visit("http://localhost:3000/");

    cy.get("ul li")
      .its("length")
      .then((initialLength) => {
        cy.get("ul li")
          .last()
          .within(() => {
            cy.get("button").click();
          });

        cy.get("ul li").should("have.length", initialLength - 1);
      });
  });

  // ======================================================================================================
});
