# Social Media Interface

## How to run
1. yarn install for dependencies
2. Seed local database with yarn dev:seed (sqlite3 database.db < seed.sql on windows)
3. yarn dev to start server
3. Open on http://localhost:3000

## Features
Like any social media platform, users have the ability to create posts on their personal timeline, follow other users, join group communities, and create posts within group communities.

For example, a user can follow their friends and other users, like a seasoned investor who specializes in owning long-term rental properties. A user can also join different group communities, like a “Dallas Fort Worth Investors” community where investors discuss trends and opportunities happening in the greater DFW market.

Created for a part of Fractional's product engineering challenge.

## File Structure

- `components/`: contains our stateless React components.
- `pages/`: contains the app's routes (the file path/name represents the route)
- `server/`: contains our GraphQL schema and resolvers
- `seed.sql`: contains a basic seed of users and communities to populate the DB locally. Feel free to add/modify tables and data as you see fit.

## Route Structure

- `/` (home page)
  - You'll see a list of communities on this page that you can navigate to.
  - Your newsfeed should be rendered in this page.
- `/community/[id]` (community page)
  - This page will contain a specific community’s information and display a list of its community members.
  - The community feed containing all the community’s posts should be rendered here.
- `/profile/[id]` (profile page)
  - This page contains some basic user information and a list of communities the user is a member of.
  - Posts created by the user (the user's timeline) should be rendered here.
- `/api/graphql` (GraphQL API)
  - Our GraphQL API is hosted here.
