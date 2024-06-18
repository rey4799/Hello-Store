import { getDatabase } from "@/db/config";
import { ObjectId } from "mongodb";
import { TWishlist } from "@/types/wishlist.types";

export interface WishlistItem {
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export class Wishlist {
  
  static async add(userId: ObjectId, productId: ObjectId): Promise<boolean> {
    try {
      const client = await getDatabase();
      const collection = client.db("Ecommerce").collection<WishlistItem>("wishlist");

      const result = await collection.insertOne({
        userId,
        productId,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return result.acknowledged;
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      return false;
    }
  }


  static async remove(userId: ObjectId, productId: ObjectId): Promise<boolean> {
    try {
      const client = await getDatabase();
      const collection = client.db("Ecommerce").collection<WishlistItem>("wishlist");

      const result = await collection.deleteOne({
        userId,
        productId,
      });

      return result.deletedCount > 0;
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      return false;
    }
  }

  static async findAllByUserId(userId: string | ObjectId): Promise<TWishlist[]> {
    const client = await getDatabase();
    const collection = client.db("Ecommerce").collection<TWishlist>("wishlist");

    const objectId = typeof userId === "string" ? new ObjectId(userId) : userId;

    const wishlist = await collection.aggregate([
      {
        $lookup: {
          from: "products", 
          localField: "productId",
          foreignField: "_id",
          as: "product", 
        },
      },
      {
        $unwind: "$product", 
      },
      {
        $match: {
          userId: objectId,
        },
      },
    ]).toArray();

    return<TWishlist[]> wishlist;
  }

  static async findById(id: string | ObjectId): Promise<TWishlist | null> {
    const client = await getDatabase();
    const collection = client.db("Ecommerce").collection<TWishlist>("wishlist");

    const objectId = typeof id === "string" ? new ObjectId(id) : id;

    return await collection.findOne({ _id: objectId });
  }
}
