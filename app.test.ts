// tests/products.test.ts

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './src/routes/products';

const { expect } = chai;
chai.use(chaiHttp);

describe('Products API', () => {
  it('should fetch and display products', async () => {
    const res = await chai.request(app).get('/');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('products').to.be.an('array');
    expect(res.body.products).to.have.length.above(0);
  });

  it('should create a new product', async () => {
    const newProduct = { id: '1', name: 'Test Product' };

    const res = await chai.request(app).post('/').send(newProduct);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message', 'Product created successfully');
    expect(res.body).to.have.property('product');
    expect(res.body.product).to.deep.equal(newProduct);
  });

  it('should retrieve a specific product', async () => {
    const productId = '1';

    const res = await chai.request(app).get(`/${productId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('product');
    expect(res.body.product).to.have.property('id', productId);
  });

  it('should update an existing product', async () => {
    const productId = '1';
    const updatedProduct = { name: 'Updated Test Product' };

    const res = await chai.request(app).put(`/${productId}`).send(updatedProduct);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'Product updated successfully');
    expect(res.body).to.have.property('product');
    expect(res.body.product).to.have.property('name', updatedProduct.name);
  });

  it('should delete an existing product', async () => {
    const productId = '1';

    const res = await chai.request(app).delete(`/${productId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'Product deleted successfully');
    expect(res.body).to.have.property('product');
    expect(res.body.product).to.have.property('id', productId);
  });

  it('should return 404 for non-existing product', async () => {
    const nonExistingProductId = '999';

    const res = await chai.request(app).get(`/${nonExistingProductId}`);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error', 'Product not found');
  });
});
