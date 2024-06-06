describe('GET Product API Test', () => {
  it('should get product information', () => {
    cy.request('GET', 'https://dummyjson.com/products/1')
      .then((response) => {
        expect(response.status).to.eq(200)
        if (Array.isArray(response.body)) {
          expect(response.body.length).to.be.greaterThan(0)
        } else {
          expect(response.body).to.have.property('id')
        }
      })
  })
})

