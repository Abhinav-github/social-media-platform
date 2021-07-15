DROP TABLE IF EXISTS memberships;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS communities;
DROP TABLE IF EXISTS feeds;
DROP TABLE IF EXISTS posts;


CREATE TABLE users (
  id             INTEGER       PRIMARY KEY,
  name           VARCHAR(128)  NOT NULL,
  bio            TEXT          NOT NULL,
  profile_photo  VARCHAR(256)  NOT NULL,
  created_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE communities (
  id          INTEGER       PRIMARY KEY,
  name        VARCHAR(256)  NOT NULL,
  description TEXT          NOT NULL,
  icon        VARCHAR(256)  NOT NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE memberships (
  user_id,
  community_id,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, community_id)
);

CREATE TABLE feeds (
  source_id     INTEGER       NOT NULL,
  source_type   VARCHAR(256)  NOT NULL,
  post_id       INTEGER       NOT NULL,
  PRIMARY KEY (source_id, source_type,post_id)
);

CREATE TABLE posts (
  id          INTEGER       PRIMARY KEY,
  text        VARCHAR(256)  NOT NULL,
  user_id     INTEGER       NOT NULL,
  created_ts  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_ts  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users
(id, created_at, updated_at, profile_photo, name, bio)
VALUES
(1,  "2021-05-28 06:26", "2021-05-28 06:26", "https://mock-images.s3-us-west-1.amazonaws.com/green-placeholder.svg", "Mario Gonzalez", "I'm a retired software engineer turned single-family home investor in DFW."),
(2,  "2021-05-28 08:26", "2021-05-28 08:26", "https://mock-images.s3-us-west-1.amazonaws.com/red-placeholder.svg",   "Paquita Perez",  "I'm a local loan officer and RE investor in Dallas."),
(3,  "2021-06-11 08:26", "2021-06-11 08:26", "https://mock-images.s3-us-west-1.amazonaws.com/blue-placeholder.svg",   "Abhinav Singh",  "I'm a full stack developer looking for real estate opportunities in NJ.");

INSERT INTO communities
(id, created_at, updated_at, icon, name, description)
VALUES
(1,  "2021-05-28 06:26", "2021-05-28 06:26", "🤠",  "Dallas Fort Worth Investors", "Home to all investors in the Dallas Fort Worth market"),
(2,  "2021-05-28 08:26", "2021-05-28 08:26", "🔨",  "BRRRR Investors", "We're not cold. We just want to buy, rehab, rent, refinance, and repeat.");


INSERT INTO memberships
(user_id, community_id, created_at)
VALUES
(1,  1, "2021-05-28 06:26"),
(1,  2, "2021-05-28 07:26"),
(2,  2, "2021-05-28 08:26"),
(3,  2, "2021-06-11 08:26");


INSERT INTO posts
(id, text, user_id, created_ts, updated_ts)
VALUES
(1,  "How does this work?", 3,"2021-06-30 06:26", "2021-06-30 06:26"),
(2,  "Nvm got it", 3, "2021-06-30 08:26", "2021-06-30 08:26"),
(3,  "I can handle the business side", 1, "2021-07-01 09:26", "2021-07-01 09:26"),
(4,  "A", 1, "2021-06-30 08:26", "2021-06-30 08:26"),
(5,  "How much is the down payment?", 2, "2021-06-30 08:26", "2021-06-30 08:26"),
(6,  "C", 1, "2021-06-30 08:26", "2021-06-30 08:26");

INSERT INTO feeds
(source_id, source_type, post_id)
VALUES
(3, 'user', 1),
(3, 'user', 2),
(1, 'user', 3),
(2, 'community', 4),
(2, 'user', 5),
(1, 'community', 6);
