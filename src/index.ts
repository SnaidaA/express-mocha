
import express from 'express';
import productsRouter from './routes/products';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/products', productsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
