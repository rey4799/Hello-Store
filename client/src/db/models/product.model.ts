import { getDatabase } from "../config";

export class Product {
    static async findAll() {
        const client = await getDatabase()
        const collection = client.db("Ecommerce").collection("products")

        const products = await collection.find().toArray()

        return products
    }
    static async findBySlug(slug: string){
        const client = await getDatabase();
        const collection = client.db("Ecommerce").collection("products");

        const product = await collection.findOne({ slug });
        return product
    }
}