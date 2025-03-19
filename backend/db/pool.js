const { Pool } = require("pg");
const dotenv = require("dotenv");

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: envFile });

//if (process.env.NODE_ENV === "production") {
module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
});
// } else if (process.env.NODE_ENV === "development") {
//   module.exports = new Pool({
//     host: process.env.HOST,
//     user: process.env.USER,
//     database: process.env.DATABASE,
//     password: process.env.PASSWORD,
//     port: process.env.PORT,
//   });
// }
