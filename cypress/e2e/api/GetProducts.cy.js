import { baseUrl } from './apiConfig';

describe('Teste do Endpoint /products', () => {
  it('Deve obter a lista de produtos', () => {
    cy.request('/products')
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('products');
        expect(response.body.products).to.be.an('array').that.is.not.empty;
      });
  });
});










