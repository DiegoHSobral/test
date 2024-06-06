import { baseUrl } from './apiConfig';

describe('Teste do Endpoint /test', () => {
  it('Deve validar o endpoint GET /test', () => {
    cy.request('/test')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('status', 'ok');
        expect(response.body).to.have.property('method', 'GET');
      });
  });
});


