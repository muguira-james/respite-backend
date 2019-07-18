


import { gql } from 'apollo-server-express';


export default gql`

  extend type Query {
    getHosts: [ Host ]
    getHost( id: ID!): Host
    
  }

  type Host {
    id: ID
    name: String!
    age: Int
    gender: String
    phoneNumber: String
    streetAddress: String
    managingChildren: [ ID ]
  }

  extend type Mutation {
    createHost(name: String, email: String, age: Int, gender: String, phoneNumber: String, streetAddress: String): Host
    addChildToHost(childId: String, parentId: String): Host
    updateHost(id: ID, name: String, email: String, age: Int, gender: String, phoneNumber: String, streetAddress: String): Host
    removeChildFromHost(childID: ID, hostID: ID): Host
  }

`;