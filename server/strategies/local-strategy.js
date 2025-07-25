import passport from "passport";
import { Strategy } from "passport-local";
import User from "../db/User.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    const findUser = User.find((user) => user.id === id);
    if (!findUser) {
      throw new Error("User not Found");
    }
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy({ usernameField: "email" }, (username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);

    try {
      const findUser = User.find((user) => user.userName === username);
      if (!findUser) {
        throw new Error("User not found!");
        if (findUser.password !== password) {
          throw new Error("Invalid credentials");
        }
      }
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
