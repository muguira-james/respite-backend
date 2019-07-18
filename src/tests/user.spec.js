

import { expect } from 'chai';
import * as userAPI from './api'

const API_URL = 'http://localhost:8000/graphql';


describe('simple test', () => {
  it('user is user', () => {
    expect('user').to.eql('user');
  });
});
describe("inject a parent", () => {
  it("make a set of parents", async () => {

    const parent1 = {
      name: "paul",
      email: "paul@cox.net",
      password: "fumanchu",
      age: 33,
      gender: "male",
      phoneNumber: "757-789-0987",
      streetAddress: "123 Main St"
    }
    const expectedResult = {
      data:
      {
        createParent:
        {
          name: 'paul',
          email: 'paul@cox.net',
          age: 33,
          gender: 'male',
          phoneNumber: '757-789-0987',
          streetAddress: '123 Main St'
        }
      }
    }
    const result = await userAPI.createParent(
      {
        name: parent1.name,
        email: parent1.email,
        password: parent1.password,
        age: parent1.age,
        gender: parent1.gender,
        phoneNumber: parent1.phoneNumber,
        streetAddress: parent1.streetAddress
      })

    console.log("result -->", result.data)

    expect(result.data).to.eql(expectedResult)
  })
})
describe("returns a parent", () => {
  it("returns a parent", async () => {
    const expectedResult = {
      data: {
        getParent: {
          name: "Paul",
          email: "paul@cox.net"
        }
      }
    }
    const result = await userAPI.getParent({ id: "5d2f8f960aa1d22a29bd76d0" })
    // console.log("result -->", result.data)

    expect(result.data).to.eql(expectedResult)
  })
})
describe("get some children: child not found", () => {
  it("child is not in system - return an error", async () => {
    const expectedResult = {
      data: {
        getChild: {
          name: "paul"
        }
      }
    }
    const result = await userAPI.getChild({ id: "5d2f8c5d7008e229bda6ccf5" })
    // console.log("result ->", result.data)
    expect(result.data).to.not.eql(expectedResult)
  })
})

describe("create a child", () => {
  it("create a child", async () => {
    const kid = {
      name: "hana",
      age: 3,
      gender: "female"
    }
    const expectedResult = {
      data: { createChild: { name: kid.name, age: kid.age, gender: kid.gender } }
    }
    const result = await userAPI.createChild({ name: kid.name, age: kid.age, gender: kid.gender })
    // console.log("result->", result.data)

    expect(result.data).to.eql(expectedResult)
  })
})
describe("gather a child", () => {
  it("gets a child", async () => {
    // let result = await userAPI.getChildren()
    //   let tt = Object.prototype.toString.call(result.data)
    //   Object.values(result['data'])[0].getChildren.forEach( it => {
    //     console.log("child -->", it)
    //   })

    let result2 = await userAPI.getChildByParams({ name: "hana", age: 3, gender: "female" })

    console.log("a child-->", Object.values(result2.data)[0].getChildByParams.name)
    expect(Object.values(result2.data)[0].getChildByParams.name).to.eql("bob")
  })
})
// describe('first load data', () => {
//   it('loads data through a mutation', () => {
//     let test = tester({
//       url: API_URL,
//       contentType: 'application/json'
//     })
//     // let test1 = JSON.stringify( { query: `{ getParents { name } } ` })
//     let test1 = JSON.stringify({
//       query: `mutation 
//       {
//         createParent(
//           name: $name, email: $email, age: $age, gender: $gender, phoneNumber: $phoneNumber, streetAddress: $streetAddress) {
//             name
//             email
//             age
//           }
//       }`,
//       variables: {
//           name: "fred", 
//           email: "fred@james.com", 
//           age: 12, 
//           gender: "male", 
//           phoneNumber: "757-581-4118", 
//           streetAddress: "123 zain St"
//       }
//     })
//     console.log("test string =>", test1)
//     const promise = test(
//       test1
//     )
//     promise.then(res => {
//       expect(res.status).to.eql(200)
//     }).catch(err => {
//       console.log(err)
//     })
//   })
// })

// // describe('getParents(): [Parent]', () => {
// //   it('check the exact contents of getParent', () => {

// //     let test = tester({
// //       url: API_URL,
// //       contentType: 'application/json'
// //     })
// //     const promise = test(
// //       JSON.stringify({
// //         query: `{ getParents { name }}`
// //       })
// //     )
// //     promise.then(res => {
// //       expect(res.status).to.eql(200)
// //       expect(res.success == true)
// //       expect(res.data.getParents[0].name).to.be.a('string')
// //       expect(res.data.getParents.length).to.equal(3)
// //       expect(res.data.getParents[0].name).to.equal('james')
// //       expect(res.data.getParents[1].name).to.equal('sam')
// //       expect(res.data.getParents[2].name).to.equal('jill')    
// //     }

// //     ).catch(function (err) {
// //       console.log(err)
// //     })
// //   })
// // })

