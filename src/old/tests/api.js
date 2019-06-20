

import axios from 'axios';

const API_URL = 'http://localhost:8000/graphql';

export const user = async variables =>
  axios.post(API_URL, {
    query: `
      query ($id: ID!) {
        user(id: $id) {
          id
          username
          email
        }
      }
    `,
    variables,
  });

  export const peopleInNeed = async variables =>
  axios.post(API_URL, {
    query: `
      query {
        peopleInNeed: [NeedyInfo]
        personInNeed( id: ID!): NeedyInfo
      }
    
      EmergencyContact {
    
        firstName: String!
        lastName: String!
        phoneNumber: String!
        streetAddress: String
        email: String
      }
    
      FamilyInfo {
        id: ID!
        parent_firstName: String
        parent_lastName: String
        parent_phoneNumber: String
        parent_streetAddress: String
        parent_email: String
      }
    
      NeedyBasicInfo {
        firstName: String!
        lastName: String!
        gender: String
        birthday: String
        languages: [String]
      }
    
      NeedyInfo {
        id: ID!
        NeedyBasicInfo: NeedyBasicInfo!
        needs: [String]
        emergencyContact: EmergencyContact!
        familyInfo: [FamilyInfo]
      }
    `,
    variables,
  });
