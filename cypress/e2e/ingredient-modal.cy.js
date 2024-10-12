describe('test burger constructor', function () {
  beforeEach(() => {
    cy.viewport('macbook-15');
    window.localStorage.setItem("accessToken", "Bearer abrakadabra777");

    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
  })

  it('should be open and close ingredient modal', function () {
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid=drag-item]').first().click();
    cy.get('[data-testid=modal]').contains('булка'); // в будующем может быть ошибка если с сервера придет другое
    cy.get('[data-testid=modal]').should('exist');
    cy.get('[data-testid=modal-close-button]').click();
    cy.get('[data-testid=modal]').should('not.exist');
    
    // проверка клика по оверлею
    cy.get('[data-testid=drag-item]').first().click();
    cy.get('[data-testid=modal-overlay]').should('exist');
    cy.get('[data-testid=modal-overlay]').trigger("click", { force: true }); //такая запись из за клика по центру сквозь контент
    // cy.get('body').click(0, 0); //еще можно так но костыль
    cy.get('[data-testid=modal-overlay]').should('not.exist');
    
    cy.get('[data-testid=drag-item]').last().click();
    cy.get('[data-testid=modal]').contains('Сыр'); // в будующем может быть ошибка если с сервера придет другое
    cy.get('[data-testid=modal]').should('exist');
    cy.get('[data-testid=modal-close-button]').click();
    cy.get('[data-testid=modal]').should('not.exist');
  });
});