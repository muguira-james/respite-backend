

import axios from 'axios';

const API_URL = 'http://localhost:8000/graphql';

//
// anything with input paraemters works??
export const getParent = async variables =>
  axios.post(API_URL, {
    query: `
      query ($id: ID!) {
        getParent(id: $id) {
          name
          email
        }
      }
    `,
    variables,
  });


export const getChild = async variables => 
  axios.post(API_URL, {
    query: `
      query ($id: ID!){
        getChild (id: $id) {
          name
        }
      }
    `,
    variables,
  });
  //
  // not sure why, this does not work??
  export const getParents = async => 
  axios.post(API_URL, {
    query: `
      {
        getParents {
          name
          id
          phoneNumber
          gender
          children
        }
      }
    `
  });


export const getChildByParams = async variables => 
  axios.post(API_URL, {
    query: `
      query ($name: String!, $age: Int!, $gender: String!){
        getChildByParams (name: $name, age: $age, gender: $gender) {
          name
          age
          gender
          id
        }
      }
    `,
    variables,
  })

export const createParent = async variables =>
  axios.post(API_URL, {
    query: `
      mutation (
        $name: String, 
        $email: String, 
        $password: String, 
        $age: Int, 
        $gender: String, 
        $phoneNumber: String, 
        $streetAddress: String) {

        createParent(name: $name, email: $email, password: $password, age: $age, gender: $gender, phoneNumber: $phoneNumber, streetAddress: $streetAddress) {
          name
          email
          age
          gender
          phoneNumber
          streetAddress
        }
      }
    `,
    variables,
  })
export const createChild = async variables => 
  axios.post(API_URL, {
    query: `
      mutation ($name: String!, $age: Int!, $gender: String!, $phoneNumber: String, $streetAddress: String) {
        createChild(name: $name, age: $age, gender: $gender, phoneNumber: $phoneNumber, streetAddress: $streetAddress) {
          name
          age
          gender
        }
      }
      
    `,
    variables,
  })

export const getChildren = async => 
  axios.post(API_URL, {
    query: `
    {
      getChildren {
        name
        age
        gender
        id
      }
    }
  `
  })
    
// export let getParents = async variables => {
//   try {
//     var result = axios({
//       url: API_URL,
//       method: 'post',
//       data: {
//         query: `
//           query  {
//             getParents {
              
//               name
//               email
//             }
//           }
//         `
//       }
//     })
//   } catch(err) {
//     console.log("error-->", err)
//   }
//    }
  // axios.post(API_URL, {
  //   query: `
  //     query  {
  //       getParents {

  //         name
  //         email
  //       }
  //     }
  //   `,
  //   variables,
  // });
