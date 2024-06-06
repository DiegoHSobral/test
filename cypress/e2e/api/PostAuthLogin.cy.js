import { baseUrl } from './apiConfig';

describe('Teste do Endpoint /auth/login', () => {
  let userData;

  before(() => {
    cy.request('GET', `${Cypress.config('baseUrl')}/users`).then((response) => {
      userData = response.body.users;
    });
  });

  it('Deve validar o endpoint POST /auth/login', () => {
    expect(userData).to.not.be.undefined;
    const randomUser = Cypress._.sample(userData);
    cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/auth/login`,
      body: {
        username: randomUser.username,
        password: randomUser.password
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});

