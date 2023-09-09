import express from 'express';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import path from 'path';
import {
  getMeals,
  createOrder,
  changeOrderStatus,
  getOrdersWithStatus,
  getAllOrders,
} from './database.js';

function trimArrayOfObjects(array) {
  return array.map((obj) => ({
    name: obj.name || '',
    price: obj.price || 0,
    description: obj.description,
  }));
}
const router = express();

router.get('/meals', async (req, res) => {
  try {
    const response = await getMeals();
    if (response) {
      const data = trimArrayOfObjects(response);
      return res.status(200).json({ data });
    } else res.status(500).json({ message: 'failure' });
  } catch (e) {
    console.log(e);
  }
});

router.post('/order', async (req, res) => {
  try {
    const val = await createOrder(req.body);
    if (val) return res.status(200).json({ message: 'Success' });
    else return res.status(400).json({ message: 'Failure' });
  } catch (e) {
    console.log(e);
  }
});

router.put('/finish', async (req, res) => {
  try {
    const val = await changeOrderStatus(JSON.parse(req.body));
    if (val) return res.status(200).json({ message: 'Success' });
    else return res.status(400).json({ message: 'Failure' });
  } catch (e) {
    console.log(e);
  }
});

router.get('/orders', async (req, res) => {
  try {
    const orders = await getAllOrders();
    if (orders.length > 0) {
      return res.status(200).json({ orders });
    } else {
      return res.status(404).json({ message: 'Brak zamówień' });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Wystąpił błąd serwera' });
  }
});

router.get('/ekran1.html', async (req, res) => {
  const meals = await getMeals();
  res.sendFile(path.join(__dirname, '../public/ekran1.html'));
});

router.get('/ekran2.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/ekran2.html'));
});

router.post('/order-ready/:id', async (req, res) => {
  await changeOrderStatus(req.params.id);
  res.redirect('/ekran2.html');
});

router.get('/ekran3.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/ekran3.html'));
});

export default router;
