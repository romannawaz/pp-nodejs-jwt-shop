import { Request, Response } from 'express';
import ProductModel, { IProduct } from '@models/product.model';

const getAll = async (req: Request, res: Response) => {
  const products = await ProductModel.find();

  return res.status(200).send({ products });
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(403).send({ message: 'Id is require' });

  const product = await ProductModel.find({ _id: id });
  if (!product)
    return res
      .status(404)
      .send({ message: "Product with this id doesn't exist" });

  return res.status(200).send({ product });
};

const create = async (req: Request, res: Response) => {
  const { title, description, price }: IProduct = req.body;
  if (!(title || description || price))
    return res.status(403).send({ message: 'All fields are required' });

  const newProduct = await ProductModel.create({ title, description, price });

  return res.status(200).send({ newProduct });
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(403).send({ message: 'Id is require' });

  const { changes } = req.body;
  if (Object.keys(changes).length === 0)
    return res.status(200).send({ message: 'Already up to date' });

  const updatedProduct = await ProductModel.findByIdAndUpdate(id, changes);

  return res.status(200).send({ updatedProduct });
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(403).send({ message: 'Id is require' });

  const removedProduct = await ProductModel.findByIdAndRemove(id);

  return res.status(200).send({ removedProduct });
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
