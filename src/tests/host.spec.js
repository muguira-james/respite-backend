

import { expect } from 'chai';
import * as userAPI from './api'

const API_URL = 'http://localhost:8000/graphql';

const host1 = {
  name: "paul",
  email: "paul@cox.net",
  age: 33,
  gender: "male",
  phoneNumber: "757-789-0987",
  streetAddress: "123 Main St"
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




// useful vars for testing
let host_id = null
let child_id = null

//
// =================== tests start =======================
//
describe("setuptest making and retrieving hosts and children", () => {
  it("make hosts and children", async () => {

    const resultH = await userAPI.createHost(host1)
    // console.log("result create -->", resultH.data)

    const resultC1 = await userAPI.createChild(child1)
    // console.log("result -->", resultC1.data)

    const resultC2 = await userAPI.createChild(child2)

  })

  it("returns a hostByParams", async () => {

    const result = await userAPI.getHostByParams ( { name: "paul", age: 33, gender: "male" } )
    // console.log("result -->", Object.values(result['data'])[0])
    let result_age = Object.values(result['data'])[0].getHostByParams.age
    let result_name = Object.values(result['data'])[0].getHostByParams.name

    host_id = Object.values(result['data'])[0].getHostByParams.id
    // console.log("host_id = ", host_id)
    expect(result_age).to.eql(33)
    expect(result_name).to.eql('paul')
  })

  it("returns a host by id", async () => {
    const id_obj = { id: host_id }
    
    const result = await userAPI.getHost( id_obj )

    let result_age = Object.values(result['data'])[0].getHost.age
    let result_name = Object.values(result['data'])[0].getHost.name

    // console.log("result.data-->", result.data)
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

  it("adds a child to a host", async () => {
    
    const id_obj = { childID: child_id, hostID: host_id }
    // console.log("child_id = ", id_obj)

    const result = await userAPI.addChildToHost(id_obj)
    const child = Object.values(result.data)[0].addChildToHost.managingChildren[0]
    expect(child).to.eql(child_id)
  })

  it("removes child from host", async () => {
    const id_obj = { childID: child_id, hostID: host_id }
    console.log("child_id = ", id_obj)

    const result = await userAPI.removeChildFromHost(id_obj)
    // console.log("m c -->", Object.values(result.data)[0].removeChildFromHost)
    let managedLength = Object.values(result.data)[0].removeChildFromHost.managingChildren.length
    expect(managedLength).to.eql(0)
  })
})