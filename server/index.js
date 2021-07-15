import { ApolloServer, gql } from 'apollo-server-micro';
import * as resolvers from '@/server/resolvers';

const typeDefs = gql`
  type Community {
    id: Int!
    name: String!
    description: String!
    icon: String!
    members: [User!]!
    posts: [Post!]!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    profile_photo: String!
    communities: [Community!]!
    posts: [Post!]!
  }

  type Post {
    id: Int!
    text: String!
    user_id: Int!
    name: String!
  }

  type Feed {
    source_id: Int!
    source_type: String!
    post_id: Int!
  }

  type Query {
    community(id: Int!): Community!
    user(id: Int!): User!
    feed(source_id: Int! source_type: String!): Feed!
  }

  type Mutation {
    addPost(text: String! user_id: Int!): Post
    addFeed(source_id: Int! source_type: String!): Feed
  }

`;

{/*
  type Mutation {
    addPost(text: String!): Post!
  }
*/}
export const server = new ApolloServer({ typeDefs, resolvers });
