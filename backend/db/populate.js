const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255),
    password_hash VARCHAR(255),
    google_id VARCHAR(255),
    profile_image VARCHAR(255),
    biography TEXT,
    email VARCHAR(100) UNIQUE
);

CREATE TABLE posts (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    post_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE post_likes (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
);

CREATE TABLE comment_likes (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL,
    comment_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments (id) ON DELETE CASCADE
);

CREATE TABLE follows ( 
  follower INTEGER NOT NULL,
  following INTEGER NOT NULL,
  PRIMARY KEY (follower, following),
  FOREIGN KEY (follower) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (following) REFERENCES users (id) ON DELETE CASCADE
);



CREATE TABLE messages ( 
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sender_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users (id) ON DELETE CASCADE
);




`;

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    //connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
