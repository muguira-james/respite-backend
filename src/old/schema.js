

import { gql } from 'apollo-server-express';


const schema = gql`
type Query {
  me: User
  user(id: ID!): User
  users: [User!]

  messages: [Message!]!
  message(id: ID!): Message
}

type User {
  id: ID!
  username: String!
}

type Message {
    id: ID!
    text: String
}

type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
}

`;

module.exports = schema