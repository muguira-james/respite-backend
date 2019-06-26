import { AuthenticationError, UserInputError } from 'apollo-server-express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import Parent from '../../dbconfig/Parent'

const validPassword = async function (password, hash) {
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
    const expiresIn = '30m'
    
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
                streetAddress: u.streetAddress
            }));
        },

        getParent: async (root, { id }, context, info) => {
            const parent = await Parent.findOne({ _id: id })
                
            if (!parent) {
                throw new AuthenticationError(
                    'parent info not found'
                )
            }
            const newParent = Parent( {
                id: parent._id,
                name: parent.name,
                email: parent.email,
                age: parent.age,
                gender: parent.gender,
                phoneNumber: parent.phoneNumber,
                streetAddress: parent.streetAddress
            })

            return newParent
           
        },
        // me: (parent, args, { models }) => {
        //     return models[1]
        // }
    },
    Mutation: {
        createParent: async (root, { name, email, password, age, gender, phoneNumber, streetAddress }, context, info) => {
            console.log("createParent-->", name, email, password, age)
            const saltRounds = 10;
            let hash = await bcrypt.hash(password, saltRounds);
            console.log("pass hash-->", hash)

            const newParent =  new Parent({
                name: name,
                email: email,
                age: age,
                gender: gender,
                phoneNumber: phoneNumber,
                streetAddress: streetAddress,
                passwordHash: hash
            });

            console.log("new parent-->", newParent)

            return new Promise((resolve, reject) => {
                newParent.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },
        updateParentDetails: async (root, { name, email, age, gender, phoneNumber, streetAddress }, context) => {
            
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
            let parent = await Parent.findOne({ name: name, email: email }).exec();
            if (!parent) {
                throw new AuthenticationError("parent info not found")
            }

            let saltRounds = 5
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
            // first check if I can find the parent
            if (parent) {
                const rett = await validPassword(password, parent.password)
                // now check their password
                if (!rett) {
                    throw new UserInputError("bad password")
                }
                // ALL Good, so give the UI a token
                let tok = await createToken(name, email, secret)

                return { token: tok }
            }
            
        }
    }
}