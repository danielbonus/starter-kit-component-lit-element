import { ComponentExampleObject } from '../../pageObjects/componentExample/componentExampleObject';

context('the shadow Root', () => {
  let page;

  beforeEach(() => {
    page = new ComponentExampleObject(cy);
    page.open();
  });

  it('Expect there is component', () => {
      cy.get('component-example');
  });
});
