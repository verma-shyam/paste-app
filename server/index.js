import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Paste from "./models/Paste.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//  ROUTES

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// CREATE PASTE 
app.post("/api/paste", async (req, res) => {
  try {
    const paste = new Paste(req.body);
    const saved = await paste.save();
    res.status(201).json(saved);
  } catch (error) {
    console.log("POST ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// GET ALL PASTES 
app.get("/api/paste", async (req, res) => {
  try {
    const pastes = await Paste.find();
    res.json(pastes);
  } catch (error) {
    console.log("GET ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// UPDATE PASTE 
app.put("/api/paste/:id", async (req, res) => {
  try {
    const updatedPaste = await Paste.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPaste) {
      return res.status(404).json({ message: "Paste not found" });
    }

    res.json(updatedPaste);
  } catch (error) {
    console.log("PUT ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// DELETE PASTE 
app.delete("/api/paste/:id", async (req, res) => {
  try {
    const deleted = await Paste.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Paste not found" });
    }

    res.json({ message: "Paste deleted successfully" });
  } catch (error) {
    console.log("DELETE ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
});
// CONNECT DB THEN START SERVER

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.log("❌ Mongo Error:", err.message);
  });