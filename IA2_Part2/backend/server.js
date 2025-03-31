import express from "express";
import bcrypt from "bcryptjs";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection (Replace with your actual MongoDB Atlas URL)
const mongoURI = "mongodb+srv://shreyjce22:shrey@cluster0.cnicu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
const client = new MongoClient(mongoURI);
let usersCollection;

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    const db = client.db("test");
    usersCollection = db.collection("users");
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
connectDB();

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await usersCollection.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

    res.json({ message: "Login successful!" }); 
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
