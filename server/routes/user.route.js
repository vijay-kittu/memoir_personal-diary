import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../db/User.js";

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const findUserEmail = await User.findOne({ email });
    if (findUserEmail) {
      console.log("Email already exists!");
      return res.status(400).json({ message: "Email already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      userName: username,
      email: email,
      password: hashedPassword,
    });

    /*const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );*/

    return res.status(201).send(
      newUser
      /*token,
      user: {
        id: newUser._id,
        email: newUser.email,
        userName: newUser.userName,
      },*/
    );
  } catch (error) {
    console.log("This is the error: ", error);
    return res.status(400).json({ message: "Server error", error });
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials!" });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      console.log("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log(user);
    return res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        username: user.userName,
      },
    });
  } catch (error) {
    console.log("Error while signing up: ", error);
    return res.status(400).json({ message: "Server error", error });
  }
});

export default userRouter;
