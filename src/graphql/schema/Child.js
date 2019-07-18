
import { gql } from 'apollo-server-express';
import Parent from './Parent'

export default gql`

  extend type Query {
    getChildren: [ Child ]
    getChild( id: ID!): Child
    getChildByParams (name: String!, age: Int!, gender: String!): Child
  }

  type Child {
    id: ID
    name: String!
    age: Int
    gender: String
    phoneNumber: String
    streetAddress: String
    parentOrGuardian: [ Parent ]
  }

  extend type Mutation {
    createChild(name: String, age: Int, gender: String, phoneNumber: String, streetAddress: String): Child
    addParentToChild(childID: ID, parentID: ID): Child
    addChildToParent(childID: ID, parentID: ID): Parent
    
    updateChild(id: ID, name: String, age: Int, gender: String, phoneNumber: String, streetAddress: String): Child

  }

`;