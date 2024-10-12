describe('service is available', function() {
  beforeEach(() => {
    cy.viewport('macbook-15');
    window.localStorage.setItem("accessToken", "Bearer abrakadabra777"); // токен будет недействителен если моковый

    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
  })

  it('should be available on localhost:3000', function() {
    cy.visit('http://localhost:3000');
  });
});