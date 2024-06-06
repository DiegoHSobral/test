
import { baseUrl } from './apiConfig';

describe('Teste do Endpoint /users', () => {
  it('Deve validar o endpoint GET /users', () => {
    cy.request('GET', `${Cypress.config('baseUrl')}/users`)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('users');
        expect(response.body.users).to.be.an('array').that.is.not.empty;
      });
  });
});

  
    