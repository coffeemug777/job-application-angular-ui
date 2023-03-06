describe("login flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/");
  });

  it("should display error message", () => {
    cy.get('[data-test-id="error-message"]').should("not.exist");
    cy.get('[data-test-id="login-button"]').click();
    cy.get('[data-test-id="error-message"]').should("exist");
  });

  it("should move to register if register is clicked", () => {
    cy.get('[data-test-id="register-button"]').click();
    cy.url().should("include", "/register");
  });

  it("should login just fine", () => {
    const userApiUrl = "http://localhost:8080/api/user/";
    cy.intercept(
      {
        method: "POST",
        url: userApiUrl + "login",
      },
      {
        email: "test3@test.com",
        password: "test1234",
      }
    );

    cy.get("#email").type("test3@test.com");
    cy.get("#password").type("test1234");
    cy.get('[data-test-id="login-button"]').click();
  });

  it("should show password doesn't match", () => {
    cy.get('[data-test-id="error-message"]').should("not.exist");
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("test12345");
    cy.get('[data-test-id="login-button"]').click();
    cy.get('[data-test-id="error-message"]')
      .should("exist")
      .find("ul li#0")
      .should("have.text", "Email and Password does not match, please re-check the information");
  });
});
