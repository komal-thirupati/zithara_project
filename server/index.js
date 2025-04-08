const express = require("express");
const classifyRoutes = require("./routes/classifyRoutes");
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./db/connection');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Root route handler
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Jewellery App API' });
});

// Routes
app.use("/api", classifyRoutes);
app.use("/api1", productRoutes);
app.use("/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
