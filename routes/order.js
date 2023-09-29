import express from 'express';

const router = express.Router();

class Order {
  constructor(id, name, coffeeName, price, size) {
    this.id = id;
    this.name = name;
    this.coffeeName = coffeeName;
    this.price = price;
    this.size = size;
  }
}

let orders = [
  {
    id: "5EF28ECB-736A-4D3A-A6F4-05EDFD89E05D",
    "name": "Customer 1",
    "coffeeName": "Latte",
    "price": 4.5,
    "size": "Medium"
  },
  {
    id: "C74BD378-D4D7-457E-8A2F-EFE376EA9F79",
    "name": "Customer 2",
    "coffeeName": "Hot Americano",
    "price": 4,
    "size": "Small"
  }
]

// Get all orders
router.get('/', (req, res) => {
  res.json(orders);
});

// Get a order by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const order = orders.find(order => order.id == id);
  if (order) {
    res.status(200).json(order)
  } else {
    res.status(400).json({ success: false, message: "Not found this order!" })
  }
})

// Create a new order
router.post('/', (req, res) => {
  const { id, name, coffeeName, size } = req.body;
  const price = parseFloat(req.body.price);

  if (id && name && coffeeName && price && size) {
    let order = new Order(id, name, coffeeName, price, size);
    orders.push(order);
    res.status(200).json(order);
  } else {
    res.status(400).json({ success: false, message: "Missing fields!" })
  }
})

// Delete all orders
router.delete('/', (req, res) => {
  orders = [];
  res.json({ message: "Orders have been cleared!" });
})

// Delete a order by id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const order = orders.find(order => order.id == id);
  if (order) {
    orders = orders.filter(order => order.id != order.id)
    res.status(200).json(order)
  } else {
    res.status(400).json({ success: false, message: "Not found this order!" })
  }
});

// Update a order by id
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { name, coffeeName, price, size } = req.body;
  const updatedOrder = orders.find(order => order.id == id);

  if(updatedOrder) {
    if(name) { updatedOrder.name = name }
    if(coffeeName) { updatedOrder.coffeeName = coffeeName }
    if(price) { updatedOrder.price = price }
    if(size) { updatedOrder.size = size }
  
    res.status(200).json(updatedOrder)
  } else {
    res.status(400).json({ success: false, message: "Not found this order!" })
  }
})

export default router;