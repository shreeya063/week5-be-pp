require('dotenv').config();
const connectDB = require("./config/db");
connectDB();
const express = require("express");
const app = express();
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");
const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");


const morgan = require("morgan");
const { connect } = require('mongoose');
app.use(morgan("dev"));

// Middleware to parse JSON
app.use(express.json());
 
// Use the tourRouter for all "/tours" routes
app.use("/api/tours", tourRouter);

// Use the userRouter for all /users routes
app.use("/api/users", userRouter);

app.use(unknownEndpoint);
// app.use(errorHandler);

app.use(errorHandler);

// Example route that throws an error
app.get('/error', (req, res, next) => {
  // Trigger an error
  const error = new Error("Network problem");
  next(error);
});

const port = process.env.PORT || 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

