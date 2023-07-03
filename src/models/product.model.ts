import mongoose from 'mongoose';

export interface IProduct {
  title: string;
  description: string;
  price: number;
}

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String },
    price: { type: Number },
  },
  { timestamps: true },
);

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
