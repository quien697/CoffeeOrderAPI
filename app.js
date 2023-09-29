import express from 'express';
import orderRoutes from './routes/order.js';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Coffee Rrder API App!');
});

app.use('/orders', orderRoutes)

app.listen(port, () => {
  console.log(`Coffee Order app running on http://localhost:${port}`);
});