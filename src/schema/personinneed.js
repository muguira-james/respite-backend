

import jwt from 'jsonwebtoken';

const createToken = async user => {
  const { id, email, username } = user;
  return await jwt.sign({ id, email, username });
};

import { gql } from 'apollo-server-express';

export default gql`

  extend type Query {
    peopleInNeed: [NeedyInfo]
    personInNeed( id: ID!): NeedyInfo
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

  type NeedyInfo {
    id: ID!
    NeedyBasicInfo: NeedyBasicInfo!
    needs: [String]
    emergencyContact: EmergencyContact!
    familyInfo: [FamilyInfo]
  }


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
`;

/*
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