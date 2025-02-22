const dotenv = require("dotenv");
const pool = require("../db/pool");

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: envFile });
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const passport = require("passport");
const { getUserById } = require("../db/post-queries");

const GoogleStrategy = require("passport-google-oauth2");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
//opts.issuer = "accounts.examplesoft.com";
//opts.audience = "yoursite.net";

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      console.log(jwt_payload, " payload");
      console.log("usao");

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
      callbackURL: "http://localhost:5173/oauth2/redirect/google",
    },
    async function verify(issuer, profile, cb) {
      console.log("usaooo");

      try {
        const { rows } = await pool.query(
          "SELECT * FROM users WHERE google_id = $1",
          [profile.id]
        );

        let user = rows[0];

        if (!user) {
          const newUser = await pool.query(
            "INSERT INTO users (user_name, google_id) VALUES ($1, $2) RETURNING *",
            [profile.displayName, profile.id]
          );
          console.log("dodaje usera u bazu");

          user = newUser.rows[0];
        }

        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);
