import { ObjectId } from "mongodb"
import { TProduct } from "./product.types";

export type TWishlist = {
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  product?: TProduct
}