import { baseUrl } from './apiConfig';

describe('Teste do Endpoint /products/add', () => {
  it('Deve adicionar um novo produto', () => {
    const productData = {
      title: "Perfume Oil",
      description: "Mega Discount, Impression of A...",
      price: 13,
      discountPercentage: 8.4,
      rating: 4.26,
      stock: 65,
      brand: "Impression of Acqua Di Gio",
      category: "fragrances",
      thumbnail: "https://i.dummyjson.com/data/products/11/thumnail.jpg"
    };

    
    cy.request({
      method: 'POST',
      url: '/products/add', 
      body: productData
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('id');
      expect(response.body.title).to.equal(productData.title);
      expect(response.body.price).to.equal(productData.price);
      expect(response.body.discountPercentage).to.equal(productData.discountPercentage);
      expect(response.body.stock).to.equal(productData.stock);
      expect(response.body.rating).to.equal(productData.rating);
      expect(response.body.thumbnail).to.equal(productData.thumbnail);
      expect(response.body.description).to.equal(productData.description);
      expect(response.body.brand).to.equal(productData.brand);
      expect(response.body.category).to.equal(productData.category);
    });
  });
});
