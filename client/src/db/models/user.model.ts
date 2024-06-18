import { getDatabase } from "../config";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { TUser } from "@/types/user.types";
import { ObjectId } from "mongodb";

const UserSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters long")
});

export const registerUser = async (userData: {
  name: string,
  username: string,
  email: string,
  password: string
}) => {
  try {
    // console.log("Received data:", userData)
    const validatedData = UserSchema.parse(userData);
    // console.log("Validated data:", validatedData) 
    const client = await getDatabase();
    const collection = client.db("Ecommerce").collection("users");

    const { name, username, email, password } = validatedData;

    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      return { success: false, message: "Username is already taken" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await collection.insertOne({
      name,
      username,
      email,
      password: hashedPassword
    });
    console.log(result);
    
    if (result.acknowledged) {
      return { success: true, message: "User registered successfully" };
    } else {
      return { success: false, message: "Failed to register user" };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((err) => err.message).join(", ");
      return { success: false, message: errorMessage };
    } else {
      return { success: false, message: "Internal server error" };
    }
  }
};

export class User {
    static async findById(_id: string | ObjectId) {
      const client = await getDatabase();
      const collection = client.db("db_ecommerce").collection<TUser>("users");
  
      if (typeof _id === "string") {
        _id = new ObjectId(_id);
      }
  
      return await collection.findOne({ _id });
    }
  
    static async findByEmail(email: string) {
      const client = await getDatabase();
      const collection = client.db("Ecommerce").collection<TUser>("users");
  
      return await collection.findOne({ email });
    }
  }
