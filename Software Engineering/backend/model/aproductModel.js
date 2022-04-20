import mongoose from 'mongoose';

const prodctSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },
  type: { type: String, required: true },
  countInStock: { type: Number, default: 0, required: true },
});

const aproductModel = mongoose.model('aProduct', prodctSchema);

export default aproductModel;