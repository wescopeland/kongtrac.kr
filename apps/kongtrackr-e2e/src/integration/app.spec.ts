describe('kongtrackr', () => {
  beforeEach(() => cy.visit('/'));

  it('should work', () => {
    cy.get('[data-test=page-title]').should('have.text', 'KONGTRAC.KR');
  });
});
