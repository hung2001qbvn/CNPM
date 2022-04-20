import express from 'express';
import aProduct from '../model/aproductModel.js';
import { isAuth, isAdmin } from '../ultil.js';

const aproductRouter = express.Router();

aproductRouter.get('/', async (req, res) => {
  const type = req.query.type ? { type: req.query.type } : {};
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: 'i',
        },
      }
    : {};
  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === 'lowest'
      ? { price: 1 }
      : { price: -1 }
    : { _id: -1 };
  const aproducts = await aProduct.find({ ...type, ...searchKeyword }).sort(
    sortOrder
  );
  res.send(aproducts);
});

aproductRouter.get('/:id', async (req, res) => {
  const aproduct = await aProduct.findOne({ _id: req.params.id });
  if (aproduct) {
    res.send(aproduct);
  } else {
    res.status(404).send({ message: 'Product Not Found.' });
  }
});
aproductRouter.put('/:id', isAuth, isAdmin, async (req, res) => {
  const aproductId = req.params.id;
  const aproduct = await aProduct.findById(aproductId);
  if (aproduct) {
    aproduct.name = req.body.name;
    aproduct.price = req.body.price;
    aproduct.image = req.body.image;
    aproduct.type = req.body.type;
    aproduct.countInStock = req.body.countInStock;
    const updatedaProduct = await aproduct.save();
    if (updatedaProduct) {
      return res
        .status(200)
        .send({ message: 'Product Updated', data: updatedaProduct });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Product.' });
});

aproductRouter.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedaProduct = await aProduct.findById(req.params.id);
  if (deletedaProduct) {
    await deletedaProduct.remove();
    res.send({ message: 'Product Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

aproductRouter.post('/', isAuth, isAdmin, async (req, res) => {
  const aproduct = new aProduct({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    type: req.body.type,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
  });
  const newaProduct = await aproduct.save();
  if (newaProduct) {
    return res
      .status(201)
      .send({ message: 'New Product Created', data: newaProduct });
  }
  return res.status(500).send({ message: ' Error in Creating Product.' });
});

export default aproductRouter;