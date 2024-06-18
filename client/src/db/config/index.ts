import { MongoClient, ServerApiVersion } from "mongodb"

const uri = process.env.MONGODB_URI!

if (!uri) {
    throw new Error("MongoDB URI required!")
}

let client : MongoClient

export async function getDatabase() {
        if (!client) {
            client = new MongoClient(uri, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true
                }
            })
            await client.connect()
            console.log("Connected to MongoDB")
        }
        return client
    }

    export async function getCollection(name:string){
        return client.db("Ecommerce").collection(name)
    }