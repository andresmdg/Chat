import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import { usersModel } from "#models";

const { SCRT } = process.env;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SCRT,
};

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await usersModel.getByEmail(email);
        if (user) {
          return done(null, false, { message: "Email already taken" });
        }
        const avatarUrl = req.file ? `/uploads/avatars/${req.file.filename}` : null;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const { name } = req.body;
        const newUser = await usersModel.add(name, email, hashedPassword, avatarUrl);
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await usersModel.getByEmail(email);
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        const validate = bcrypt.compareSync(password, user.password);
        if (!validate) {
          return done(null, false, { message: "Wrong password" });
        }
        return done(null, user, { message: "Logged in successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await usersModel.getByID(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
