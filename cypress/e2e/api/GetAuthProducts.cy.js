import { baseUrl } from './apiConfig';

describe('Teste do Endpoint /auth/products', () => {
  let authToken;

  before(() => {
    cy.request('GET', `${Cypress.config('baseUrl')}/users`).then((response) => {
      const users = response.body.users;
      const randomUser = Cypress._.sample(users);
      cy.request({
        method: 'POST',
        url: `${Cypress.config('baseUrl')}/auth/login`,
        body: {
          username: randomUser.username,
          password: randomUser.password
        }
      }).then((loginResponse) => {
        expect(loginResponse.status).to.equal(200);
        authToken = loginResponse.body.token;
      });
    });
  });

  it('Deve validar o endpoint GET /auth/products', () => {
    expect(authToken).to.not.be.undefined;
    cy.request({
      method: 'GET',
      url: `${Cypress.config('baseUrl')}/auth/products`,
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      
    });
  });

  it('Deve retornar "Authentication Problem" se o token estiver ausente', () => {
    
    cy.request({
      method: 'GET',
      url: `${Cypress.config('baseUrl')}/auth/products`,
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.status).to.equal(403);
      expect(response.body).to.have.property('message', 'Authentication Problem');
    });
  });

  it('Deve retornar "Invalid/Expired Token" se o token for inválido ou expirado', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.config('baseUrl')}/auth/products`,
      headers: {
        Authorization: 'Bearer invalid_token'
      },
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('name', 'JsonWebTokenError');
      expect(response.body).to.have.property('message', 'Invalid/Expired Token!');
    });
  });
});
