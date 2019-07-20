
import { gql } from 'apollo-server-express';
import Child from './Child'

export default gql`

  extend type Query {
    getParents: [Parent]
    getParent( id: ID!): Parent
    getParentByParams (name: String!, age: Int!, gender: String!): Parent
  }

  type Parent {
    id: ID
    name: String!
    email: String!
    age: Int
    gender: String
    phoneNumber: String
    streetAddress: String
    children: [ ID ]
  }

  type Token {
    token: String!
  }

  extend type Mutation {
    createParent(name: String, email: String, password: String, age: Int, gender: String, phoneNumber: String, streetAddress: String): Parent
    updateParentDetails(name: String, email: String, age: Int, gender: String, phoneNumber: String, streetAddress: String): Parent
    updateParentPassword(name: String, email: String, password: String): Parent
    signIn( name: String!, email: String!, password: String! ): Token
    echoToken(name: String, email: String, password: String) : Token

  }

`;


/*


  extend type Mutation {
    updateNeedyBasicInfo (
      id: ID!
      firstName: String!
      lastName: String!
      gender: String!
      birthday: String      
    ): NeedyBasicInfo!

    updateEmergencyContact (
      id: ID!
      firstName: String!
      lastName: String!
      phoneNumber: String!
      streetAddress: String
      email: String
    ): EmergencyContact!

    addFamilyInfo (
      id: ID!
      firstname: String!
      lastName: String!
      phoneNumber: String!
      streetAddress: String!
      email: String!
    ): [FamilyInfo]!

    deleteFamilyMember (
      id_of_child: ID!
      id_of_familyMember: ID!
    ): [FamilyInfo]!
  }

  type EmergencyContact {

    firstName: String!
    lastName: String!
    phoneNumber: String!
    streetAddress: String
    email: String
  }

  type FamilyInfo {
    id: ID!
    parent_firstName: String
    parent_lastName: String
    parent_phoneNumber: String
    parent_streetAddress: String
    parent_email: String
  }

  type NeedyBasicInfo {
    firstName: String!
    lastName: String!
    gender: String
    birthday: String
    languages: [String]
  }




                            multi-sensory
                            behavioral
                            developmental
                            cognitive
                            psychological
                            {Medical?}  - e.g. assistive tech, medication admin, medical devices, insulin, etc.
                          */
/*
      PINProfile: {
        firstName: "",
        lastName: "",
        gender: "",
        birthday: "",
        languages: [],
        needs: [],        /*
                            multi-sensory
                            behavioral
                            developmental
                            cognitive
                            psychological
                            {Medical?}  - e.g. assistive tech, medication admin, medical devices, insulin, etc.
                          */
                         /*
        emergencyContact: {
          firstName: "",
          lastName: "",
          phoneNumber: "",
          streetAddress: "",
          email: ""
        },
        */