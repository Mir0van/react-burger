describe('test burger constructor', function () {
  const selectors = {
    dragItem: '[data-testid=drag-item]',
    dropZone: '[data-testid=drop]',
    orderButton: '[data-testid=order-button]',
    modal: '[data-testid=modal]',
    modalCloseButton: '[data-testid=modal-close-button]',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    window.localStorage.setItem("accessToken", "Bearer abrakadabra777"); // токен будет недействителен если моковый

    // моки
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" }).as("getIngredients");
    cy.intercept("POST", "api/orders", { fixture: "orders.json" }).as("postOrder");
  })

  it('should be able make an order', function () {
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.get(selectors.dragItem).first().trigger('dragstart')
    cy.get(selectors.dropZone).as('dropZone');
    cy.get('@dropZone').trigger('drop');

    cy.contains(selectors.dragItem, 'Соус').trigger('dragstart');
    cy.get('@dropZone').trigger('drop');

    cy.contains(selectors.dragItem, 'Биокотлета').trigger('dragstart');
    cy.get('@dropZone').trigger('drop');

    cy.get(selectors.orderButton).click();
    cy.wait('@postOrder');

    cy.get(selectors.modal).as('modal');
    cy.get('@modal').should('exist');
    cy.get(selectors.modalCloseButton).click();
    cy.get('@modal').should('not.exist');
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