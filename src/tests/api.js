

import axios from 'axios';

const API_URL = 'http://localhost:8000/graphql';

// export const getParent = async variables =>
//   axios.post(API_URL, {
//     query: `
//       query ($id: ID!) {
//         getParent(id: $id) {

//           name
//           email
//         }
//       }
//     `,
//     variables,
//   });

export let getParents = async variables => {
  try {
    var result = axios({
      url: API_URL,
      method: 'post',
      data: {
        query: `
          query  {
            getParents {
              
              name
              email
            }
          }
        `
      }
    })
  } catch(err) {
    console.log("error-->", err)
  }
   }
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
