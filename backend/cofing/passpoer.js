const dotenv = require("dotenv");
const pool = require("../db/pool");
const jwt = require("jsonwebtoken");

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: envFile });
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const passport = require("passport");
const { getUserById } = require("../db/usersQueries");

const GoogleStrategy = require("passport-google-oauth2").Strategy;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
//opts.issuer = "accounts.examplesoft.com";
//opts.audience = "yoursite.net";

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await getUserById(jwt_payload.user.id);
      if (!user) {
        return done(null, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/oauth2/redirect/google",
      scope: ["profile", "email"],
      passReqToCallback: true,
    },
    async function verify(request, accessToken, refreshToken, profile, done) {
      try {
        const { rows } = await pool.query(
          "SELECT * FROM users WHERE google_id = $1",
          [profile.id]
        );

        let user = rows[0];

        if (!user) {
          const newUser = await pool.query(
            "INSERT INTO users (username,email,google_id) VALUES ($1,$2,$3) RETURNING *",
            [profile.displayName, profile.email, profile.id]
          );
          console.log("dodaje usera u bazu");

          //user = newUser.rows[0];
          const created = newUser.rows[0];

          const token = jwt.sign({ created }, process.env.SECRET_KEY, {
            expiresIn: "24h",
          });

          user = { token, created };
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
