import express from "express";
import cors from "cors";
import connectDB from "./connectDB.js";
import { config } from 'dotenv';
import userRouter from "./routers/User.js";
import taskRouter from "./routers/Task.js";
import categoryRouter from "./routers/Category.js";

config();

const app = express();
const PORT = 5000;

app.use(cors()); // cho phép RN gọi API
app.use(express.json());

connectDB(process.env.DB_URL);

// Route test
app.get("/", (req, res) => {
  res.json({ message: "Backend running OK 🚀" });
});

// Route API ví dụ
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);
app.use('/api/category', categoryRouter);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});