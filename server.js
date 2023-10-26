const express = require("express");
const app = express();
const taskRouter = require("./routes/taskRoutes");
const connectDB = require("./db/connect");
require("dotenv").config();

const PORT = 3000;

// JSON Middleware -> to accesses request json body data in our express app
app.use(express.static("./public"));
app.use(express.json());

// Task router middlware
app.use("/api/v1/tasks", taskRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
