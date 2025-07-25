import express from "express";
import journalRouter from "./routes/journal.route.js";
import userRouter from "./routes/user.route.js";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import "./strategies/local-strategy.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/memoir_diary")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error: ${err}`));

app.use(cors());

app.use(userRouter);
app.use(journalRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
