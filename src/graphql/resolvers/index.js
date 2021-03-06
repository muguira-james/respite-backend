import { AuthenticationError, UserInputError } from 'apollo-server-express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import Parent from '../../dbconfig/Parent'
import Child from '../../dbconfig/Child'
import Host from '../../dbconfig/Host'

import configParameters from '../../utils'


const validateToken = async function (token) {
    // console.log("Header token-->", token)
    let valid
    if (token) {
        try {
            valid = await jwt.verify(token, process.env.SECRET)
            return true
        } catch(err) {
            return false
        }
    }
    
}
const validPassword = async function (password, hash) {
    // console.log("pass->", password, "hash-->", hash)
    return await bcrypt.compare(password, hash);
}

const findLogin = async (name, email) => {

    let parent = await Parent.findOne({ name: name, email: email }).exec()
    if (!parent) {
        throw new AuthenticationError(
            'parent info not found'
        )
    }

    return parent
}



const createToken = async (name, email, secret) => {
    const expiresIn = configParameters.loginDuration
    
    return await jwt.sign( { name, email }, secret, { expiresIn, } )
}

export default {
    Query: {


        getParents: async (root, args, context, info) => {
            const parent = await Parent.find({})
                .populate()
                .exec();

            return parent.map(u => ({
                id: u._id.toString(),
                name: u.name,
                email: u.email,
                age: u.age,
                gender: u.gender,
                phoneNumber: u.phoneNumber,
                streetAddress: u.streetAddress,
                children: u.children.map(c => {
                    return c
                })
            }));
        },

        getParent: async (root, { id }, context, info) => {
            const parent = await Parent.findOne({ _id: id })
                
            if (!parent) {
                throw new AuthenticationError(
                    'parent info not found'
                )
            }
            // const newParent = Parent( {
            //     id: parent._id,
            //     name: parent.name,
            //     email: parent.email,
            //     age: parent.age,
            //     gender: parent.gender,
            //     phoneNumber: parent.phoneNumber,
            //     streetAddress: parent.streetAddress
            // })

            // return newParent

            return parent
           
        },
        getChildren: async (root, args, context, info) => {
            const children = await Child.find( {} )
                .populate()
                .exec()
            
                return children.map(u => ({
                    id: u._id.toString(),
                    name: u.name,
                    age: u.age,
                    gender: u.gender
                }));
        },
        getChild: async (root, { id }, context, info) => {
            const child = await Child.findOne({ _id: id })
                
            if (!child) {
                throw new AuthenticationError(
                    'Child info not found'
                )
            }
            const newChild = {
                id: child._id.toString(),
                name: child.name,
                gender: child.gender,
                age: child.age
            }
            console.log("a child-->", newChild)
            return newChild           
        },
        getChildByParams: async (root, {name, age, gender}, context, info) => {
            const child = await Child.findOne( { name: name, age: age, gender: gender})

            if (!child) {
                throw new AuthenticationError(
                    `Child not found ${name}, ${age}, ${gender}`
                )
            } 
            
            const newChild = {
                id : child._id.toString(),
                name : child.name,
                age : child.age,
                gender : child.gender,
                phoneNumber : child.phoneNumber,
                streetAddress : child.streetAddress
            }
            console.log("found your child (get child by params)-->", child)
            return newChild
        },
        getParentByParams: async (root, {name, age, gender}, context, info) => {
            const parent = await Parent.findOne( { name: name, age: age, gender: gender})

            if (!parent) {
                throw new AuthenticationError(
                    `Parent not found ${name}, ${age}, ${gender}`
                )
            } 
            console.log("found your parent-->", parent)
            const newParent = {
                id : parent._id.toString(),
                name : parent.name,
                age : parent.age,
                gender : parent.gender,
                phoneNumber : parent.phoneNumber,
                streetAddress : parent.streetAddress
            }
            console.log("new parent --->", newParent)
            return newParent
        },

        getHost: async (root, { id }, context, info) => {
            const host = await Host.findOne({ _id: id })
                
            if (!host) {
                throw new AuthenticationError(
                    'Host info not found'
                )
            }
 
            const newHost = {
                name: host.name,
                age: host.age,
                email: host.email,
                phoneNumber: host.phoneNumber,
                streetAddress: host.streetAddress,
                id: host._id.toString()
            }
            return newHost
        },

        getHosts: async (root, args, context, info) => {
            const hosts = await Host.find( {} ).populate().exec()

            return hosts.map(u => ({
                id: u._id.toString(),
                name: u.name,
                email: u.email,
                age: u.age,
                gender: u.gender,
                phoneNumber: u.phoneNumber,
                streetAddress: u.streetAddress,
                managingChildren: u.managingChildren.map(c => {
                    return c
                })
            }));
        },
        getHostByParams: async (root, {name, age, gender}, context, info) => {
            const host = await Host.findOne( { name: name, age: age, gender: gender})

            if (!host) {
                throw new AuthenticationError(
                    `Host not found ${name}, ${age}, ${gender}`
                )
            } 
            // console.log("found your host by params-->", host)
            const newHost = {
                id : host._id.toString(),
                name : host.name,
                age : host.age,
                email: host.email,
                gender : host.gender,
                phoneNumber : host.phoneNumber,
                streetAddress : host.streetAddress
            }
            console.log("get hostByParams --->", newHost)
            return newHost
        },
    },
    Mutation: {
        createChild: async (root, { name, age, gender }, context, info) => {
            console.log("createChild-->", name, age, gender)

            const newChild = new Child({
                name: name,
                age: age,
                gender: gender,
                phoneNumber: "",
                streetAddress: "",
                parentOrGaurdian: []
            })

            return new Promise((resolve, reject) => {
                newChild.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },
        createParent: async (root, { name, email, password, age, gender, phoneNumber, streetAddress }, context, info) => {
            console.log("createParent-->", name, email, password, age)
            const saltRounds = configParameters.numberOfSaltRounds
            let hash = await bcrypt.hash(password, saltRounds);
            console.log("pass hash-->", hash)

            const newParent =  new Parent({
                name: name,
                email: email,
                age: age,
                gender: gender,
                phoneNumber: phoneNumber,
                streetAddress: streetAddress,
                passwordHash: hash,
                children: []
            });

            console.log("new parent-->", newParent)

            return new Promise((resolve, reject) => {
                newParent.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },
        updateParentDetails: async (root, { name, email, age, gender, phoneNumber, streetAddress }, context) => {
            validateToken(req.headers['x-token'])
            let parent = await Parent.findOne({ name: name, email: email }).exec();
            if (!parent) {
                throw new AuthenticationError(
                    'parent info not found'
                )
            }

            parent.name = name
            parent.age = age
            parent.gender = gender
            parent.phoneNumber = phoneNumber
            parent.streetAddress = streetAddress
            parent.email = email

            return new Promise((resolve, reject) => {
                parent.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },
        updateParentPassword: async (root, { name, email, password }, content, info) => {
            validateToken(req.headers['x-token'])
            
            let parent = await Parent.findOne({ name: name, email: email }).exec();
            if (!parent) {
                throw new AuthenticationError("parent info not found")
            }

            let saltRounds = configParameters.numberOfSaltRounds
            let hash = await bcrypt.hash(password, saltRounds)

            parent.name = name
            parent.email = email
            parent.passwordHash = hash

            return new Promise((resolve, reject) => {
                parent.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },

        signIn: async (root, { name, email, password }, { models, secret }, info) => {
            let parent = await findLogin(name, email)
            console.log("parent ==>", parent)
            // first check if I can find the parent
            if (parent) {
                const rett = await validPassword(password, parent.passwordHash)
                // now check their password
                if (!rett) {
                    throw new UserInputError("bad password")
                }
                // ALL Good, so give the UI a token
                let tok = await createToken(name, email, secret)
                
                return { token: tok }
            } else{
                throw new AuthenticationError(
                    'name and email not found?'
                )
            }
            
        },

        echoToken: async (root, { name, email, password }, { models, secret, req }, info) => {
            let good_bad = await validateToken(req.headers['x-token'])
            // console.log("good_bad-->", good_bad)
            if ( good_bad === false) {
                throw new AuthenticationError("Your session has expired")
            }
            let parent = await findLogin(name, email)
            
            // first check if I can find the parent
            if (parent) {
                const rett = await validPassword(password, parent.passwordHash)
                // now check their password
                if (!rett) {
                    throw new UserInputError("bad password")
                }
                
                console.log("you are good to go!!")
                return { token: parent.passwordHash }
            } else{
                throw new AuthenticationError(
                    'name and email not found?'
                )
            }
        },

        addChildToParent: async (root, { childID, parentID }, context, info) => {
            const child = await Child.findOne({ _id: childID })
                
            if (!child) {
                throw new AuthenticationError(
                    'child info not found'
                )
            }
            // console.log("found child-->", child)

            const parent = await Parent.findOne({_id: parentID })
            if (!parent) {
                throw new AuthenticationError(
                    'Parent info not found'
                )
            }
            // console.log("found parent-->", parent)

            if (parent.children.find(function(element) {
                if (element === childID) {
                    throw new AuthenticationError(
                        `Parent already has this child ${childID}`
                    )
                }
            }))

            // console.log("adding child ", childID, " to parent-->", parentID)
            parent.children.push(childID)

            return new Promise((resolve, reject) => {
                parent.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },
        addParentToChild: async (root, { childID, parentID }, context, info) => {
            const child = await Child.findOne( { _id: childID } )

            if (!child) {
                throw new AuthenticationError(
                    'child info not found'
                )
            }

            // console.log("found child-->", child)

            const parent = await Parent.findOne({_id: parentID })
            if (!parent) {
                throw new AuthenticationError(
                    'Parent info not found'
                )
            }
            // console.log("found parent-->", parent)

            if (child.parentOrGuardian.find(function(elm) {
                if (elm === parentID) {
                    throw new AuthenticationError(
                        `Child already has this Parent ${parentID}`
                    )
                }
            }))
            // console.log("adding child ", childID, " to parent-->", parentID)
            child.parentOrGuardian.push(parentID)

            return new Promise((resolve, reject) => {
                child.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },

        createHost: async (root, { name, email, age, gender, phoneNumber, streetAddress }, context, info) => {
            console.log("create host-->", name, email, age, gender, phoneNumber, streetAddress)
            
            // const saltRounds = configParameters.numberOfSaltRounds
            // let hash = await bcrypt.hash(password, saltRounds);
            // console.log("pass hash-->", hash)

            const newHost =  new Host({
                name: name,
                email: email,
                age: age,
                gender: gender,
                phoneNumber: phoneNumber,
                streetAddress: streetAddress,
            });

            // console.log("new host-->", newHost)

            return new Promise((resolve, reject) => {
                newHost.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },

        addChildToHost: async (root, { childID, hostID }, context, info) => {
            console.log("addChildToHost: childID = ", childID, " hostID = ", hostID)
            const child = await Child.findOne( { _id: childID } )

            if (!child) {
                throw new AuthenticationError(
                    `child info not found ${childID}`
                )
            }

            console.log("found child (add child to host)-->", child)

            const host = await Host.findOne( { _id: hostID } )

            if (!host) {
                throw new AuthenticationError(
                    'host info not found'
                )
            }

            
            
            host.managingChildren.push(childID)
            console.log("found host (add child to host)-->", host)

            console.log(`added child ${childID} to host ${hostID}`)

            return new Promise((resolve, reject) => {
                host.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },
        removeChildFromHost: async (root, { childID, hostID }, context, info) => {
            console.log("removeChildFromHost--> childID = ", childID, " hostID->", hostID)
            const host = await Host.findOne( { _id: hostID } )

            if (!host) {
                throw new AuthenticationError(
                    'host info not found'
                )
            }
            console.log("preping to remove child from host care-->", host)
            const newAry = host.managingChildren.filter( (value, index, ary) => {
                console.log("lp -->", value)
                return value.toString() !== childID.toString()
            })
            console.log("removeChildFromHost--> step 1 = ", host)
            host.managingChildren =  newAry
            console.log("removeChildFromHost--> step 2 = ", host)
            return new Promise((resolve, reject) => {
                host.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },
        
    }
}