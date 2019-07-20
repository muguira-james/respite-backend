

import { expect } from 'chai';
import * as userAPI from './api'

const API_URL = 'http://localhost:8000/graphql';

const parent1 = {
  name: "paul",
  email: "paul@cox.net",
  password: "fumanchu",
  age: 33,
  gender: "male",
  phoneNumber: "757-789-0987",
  streetAddress: "123 Main St"
}
const expectedParentResult = {
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

const child1 = {
  name: "kelly",
  age: 3,
  gender: "female",
  phoneNumber: "757-789-0987",
  streetAddress: "123 Main St"
}
const child2 = {
  name: "marc",
  age: 6,
  gender: "male",
  phoneNumber: "757-789-0987",
  streetAddress: "123 Main St"
}

const expectedChildResult1 = {
  data:
  {
    createChild:
    {
      age: 3,
      gender: 'female',
      name: 'kelly',
    }
  }
}
const expectedChildResult2 = {
  data:
  {
    createChild:
    {
      age: 6,
      gender: 'male',
      name: 'marc',
    }
  }
}

// 
// useful vars for testing
let parent_id = null
let child_id = null

//
// =================== tests start =======================
//
describe("setuptest making and retrieving parents and children", () => {
  before("make parents and children", async () => {

    const resultP = await userAPI.createParent(parent1)
    // console.log("result -->", resultP.data)

    expect(resultP.data).to.eql(expectedParentResult)

    const resultC1 = await userAPI.createChild(child1)
    // console.log("result -->", resultC1.data)

    expect(resultC1.data).to.eql(expectedChildResult1)

    const resultC2 = await userAPI.createChild(child2)
    // console.log("result->", resultC2.data)

    expect(resultC2.data).to.eql(expectedChildResult2)

  })
  it("returns a parent", async () => {

    const result = await userAPI.getParentByParams({ name: "paul", age: 33, gender: "male" })
    // console.log("result -->", Object.values(result['data'])[0].getParentByParams)
    let result_age = Object.values(result['data'])[0].getParentByParams.age
    let result_name = Object.values(result['data'])[0].getParentByParams.name

    parent_id = Object.values(result['data'])[0].getParentByParams.id
    expect(result_age).to.eql(33)
    expect(result_name).to.eql('paul')
  })


  it("returns a parent by id", async () => {
    const id_obj = { id: parent_id }
    // console.log("parent id ->", id_obj)
    const result = await userAPI.getParent(  id_obj  )
    // console.log("parent found ->", result.data)
    let result_email = Object.values(result['data'])[0].getParent.email
    let result_name = Object.values(result['data'])[0].getParent.name

    expect(result_email).to.eql('paul@cox.net')
    expect(result_name).to.eql('paul')
  })

  it("returns a child", async () => {
    const result = await userAPI.getChildByParams({ name: "kelly", age: 3, gender: "female" })
    // console.log("result -->", Object.values(result['data'])[0].getParentByParams)
    let result_age = Object.values(result['data'])[0].getChildByParams.age
    let result_name = Object.values(result['data'])[0].getChildByParams.name

    child_id = Object.values(result['data'])[0].getChildByParams.id
    expect(result_age).to.eql(3)
    expect(result_name).to.eql('kelly')
  })

  it("returns a child by id", async () => {
    const id_obj = { id: child_id }
    // console.log("child id ->", id_obj)

    const result = await userAPI.getChild(id_obj)
    // console.log("result -->", Object.values(result['data'])[0].getChild)

    let result_age = Object.values(result['data'])[0].getChild.age
    let result_name = Object.values(result['data'])[0].getChild.name

    expect(result_age).to.eql(3)
    expect(result_name).to.eql('kelly')
  })

})
