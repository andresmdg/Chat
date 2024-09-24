// Modules
import bcrypt from 'bcryptjs'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

// Imports
import { usersModel } from '#models'

// Variables
const { SCRT } = process.env
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SCRT
}

// Middlewares

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      try {
        const existingUser = await usersModel.getByUsername(username)
        if (existingUser) {
          return done(null, false, { message: 'Username already taken' })
        }

        const avatarUrl = req.file?.filename
          ? `/uploads/avatars/${req.file.filename}`
          : null

        const hashedPassword = await bcrypt.hash(password, 10)
        const { name } = req.body
        const newUser = await usersModel.add(
          name,
          username,
          hashedPassword,
          avatarUrl
        )

        return done(null, newUser)
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    async (username, password, done) => {
      try {
        const user = await usersModel.getByUsername(username)
        if (!user) {
          return done(null, false, { message: 'Invalid username or password' })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
          return done(null, false, { message: 'Invalid username or password' })
        }

        return done(null, user, { message: 'Login successful' })
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await usersModel.getByID(jwt_payload.id)
      if (user) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Token not valid' })
      }
    } catch (error) {
      return done(error, false)
    }
  })
)

export default passport
