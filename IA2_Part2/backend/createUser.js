import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

// MongoDB Connection (Replace with your actual MongoDB Atlas URL)
const mongoURI = "mongodb+srv://shreyjce22:shrey@cluster0.cnicu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
const client = new MongoClient(mongoURI);

async function createUser() {
  try {
    await client.connect();
    const db = client.db("test");
    const usersCollection = db.collection("users");

    // User details (Change this for different users)
    const username = "shreyjce22";
    const password = "shrey";

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };

    // Insert user into MongoDB
    await usersCollection.insertOne(newUser);
    console.log("User created successfully!");

    // Close connection
    await client.close();
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

// Run the function
createUser();
