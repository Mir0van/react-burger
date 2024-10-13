describe('test burger constructor', function () {
  const selectors = {
    dragItem: '[data-testid=drag-item]',
    modal: '[data-testid=modal]',
    modalCloseButton: '[data-testid=modal-close-button]',
    modalOverlay: '[data-testid=modal-overlay]'
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    window.localStorage.setItem("accessToken", "Bearer abrakadabra777");

    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
  })

  it('should be open and close ingredient modal', function () {
    cy.visit('/');
    
    cy.get(selectors.dragItem).first().as('firstDragItem');
    cy.get('@firstDragItem').click();
    cy.get(selectors.modal).as('modal');
    cy.get('@modal').contains('булка'); // в будующем может быть ошибка если с сервера придет другое
    cy.get('@modal').should('exist');
    cy.get(selectors.modalCloseButton).as('modalCloseButton');
    cy.get('@modalCloseButton').click();
    cy.get('@modal').should('not.exist');
    
    // проверка клика по оверлею
    cy.get('@firstDragItem').click();
    cy.get(selectors.modalOverlay).as('modalOverlay');
    cy.get('@modalOverlay').should('exist');
    cy.get('@modalOverlay').trigger('click', { force: true }); //такая запись из за клика по центру сквозь контент
    // cy.get('body').click(0, 0); //еще можно так но костыль
    cy.get('@modalOverlay').should('not.exist');

    cy.get(selectors.dragItem).last().as('lastDragItem');
    cy.get('@lastDragItem').click();
    cy.get('@modal').contains('Сыр'); // в будующем может быть ошибка если с сервера придет другое
    cy.get('@modal').should('exist');
    cy.get('@modalCloseButton').click();
    cy.get('@modal').should('not.exist');
  });
});