describe('test burger constructor', function () {
  beforeEach(() => {
    cy.viewport('macbook-15');
    window.localStorage.setItem("accessToken", "Bearer abrakadabra777"); // токен будет недействителен если моковый

    // моки
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" }).as("getIngredients");
    cy.intercept("POST", "api/orders", { fixture: "orders.json" }).as("postOrder");
  })

  it('should be able make an order', function () {
    cy.visit('http://localhost:3000/');
    cy.wait('@getIngredients');

    cy.get('[data-testid=drag-item]').first().trigger('dragstart')
    cy.get('[data-testid=drop]').trigger('drop')

    cy.contains('[data-testid=drag-item]', 'Соус').trigger('dragstart');
    cy.get('[data-testid=drop]').trigger('drop');

    cy.contains('[data-testid=drag-item]', 'Биокотлета').trigger('dragstart');
    cy.get('[data-testid=drop]').trigger('drop');

    cy.get('[data-testid=order-button]').click();
    cy.wait('@postOrder');

    cy.get('[data-testid=modal]').should('exist');
    cy.get('[data-testid=modal-close-button]').click();
    cy.get('[data-testid=modal]').should('not.exist');
  });

  // -------------------------------------------------------------
  // оставил как подсказку. можно и без моковых данных пройти весь путь входа в акк и продолжить тесты над булками. но тогда есть риск чето не то получить с сервера.
  // let login = 'qqq@qqq.q'
  // let password = 'qqqqqq'
  // it('should be login in app', function () {
  //   cy.visit('http://localhost:3000/login');
  //   cy.get('[data-testid=login-email]').type(`${login}{enter}`)
  //   cy.get('[data-testid=login-password]').type(`${password}{enter}`)
  //   cy.get('[data-testid=login-submit]').click()
  // });
  // --------------------------------------------------------------
});