
import { gql } from 'apollo-server-express';
import Parent from './Parent'

export default gql`

  extend type Query {
    getChildren: [ Child ]
    getChild( id: ID!): Child
    
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
    createChild(name: String, email: String, age: Int, gender: String, phoneNumber: String, streetAddress: String): Child
    addParentToChild(childId: String, parentId: String): Child
    addChildToParent(childId: String, parentId: String): Parent
    
    updateChild(id: ID, name: String, email: String, age: Int, gender: String, phoneNumber: String, streetAddress: String): Child

  }

`;