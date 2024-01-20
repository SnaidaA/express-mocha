
import express, { Request, Response } from 'express';

const router = express.Router();
const products: { id: string; name: string }[] = [];

router.get('/', (req: Request, res: Response) => {
  res.json({ products });
});

router.post('/', (req: Request, res: Response) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({ error: 'Both id and name are required for creating a product.' });
  }

  const existingProduct = products.find((product) => product.id === id);
  if (existingProduct) {
    return res.status(409).json({ error: 'Product with the same id already exists.' });
  }

  const newProduct = { id, name };
  products.push(newProduct);

  res.status(201).json({ message: 'Product created successfully', product: newProduct });
});

router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json({ product });
});

router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products[productIndex].name = name;

  res.json({ message: 'Product updated successfully', product: products[productIndex] });
});

router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const deletedProduct = products.splice(productIndex, 1)[0];

  res.json({ message: 'Product deleted successfully', product: deletedProduct });
});

export default router;
