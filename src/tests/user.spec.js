

import { expect } from 'chai';


const API_URL = 'http://localhost:8000/graphql';
import { tester } from 'graphql-tester';

describe('simple test', () => {
  it('user is user', () => {
    expect('user').to.eql('user');
  });
});

describe('first load data', () => {
  it('loads data through a mutation', () => {
    let test = tester({
      url: API_URL,
      contentType: 'application/json'
    })
    // let test1 = JSON.stringify( { query: `{ getParents { name } } ` })
    let test1 = JSON.stringify({
      query: `mutation 
      {
        createParent(
          name: $name, email: $email, age: $age, gender: $gender, phoneNumber: $phoneNumber, streetAddress: $streetAddress) {
            name
            email
            age
          }
      }`,
      variables: {
          name: "fred", 
          email: "fred@james.com", 
          age: 12, 
          gender: "male", 
          phoneNumber: "757-581-4118", 
          streetAddress: "123 zain St"
      }
    })
    console.log("test string =>", test1)
    const promise = test(
      test1
    )
    promise.then(res => {
      expect(res.status).to.eql(200)
    }).catch(err => {
      console.log(err)
    })
  })
})

// describe('getParents(): [Parent]', () => {
//   it('check the exact contents of getParent', () => {

//     let test = tester({
//       url: API_URL,
//       contentType: 'application/json'
//     })
//     const promise = test(
//       JSON.stringify({
//         query: `{ getParents { name }}`
//       })
//     )
//     promise.then(res => {
//       expect(res.status).to.eql(200)
//       expect(res.success == true)
//       expect(res.data.getParents[0].name).to.be.a('string')
//       expect(res.data.getParents.length).to.equal(3)
//       expect(res.data.getParents[0].name).to.equal('james')
//       expect(res.data.getParents[1].name).to.equal('sam')
//       expect(res.data.getParents[2].name).to.equal('jill')    
//     }

//     ).catch(function (err) {
//       console.log(err)
//     })
//   })
// })

