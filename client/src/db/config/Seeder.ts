import { getDatabase } from './index';

async function seedDatabase() {
    const client = await getDatabase()
    const collection = client.db("Ecommerce").collection("products");
    const products = require("../../../../../db.json")

  try {
    await collection.insertMany(products);
    console.log(`products inserted successfully`);
  } catch (error) {
    console.error('Error inserting products:', error);
  }
}

seedDatabase().catch(console.error);
