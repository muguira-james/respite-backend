
import Parent from '../../dbconfig/Parent'

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
            return await Parent.findOne({ _id: id }).exec();
          },
        // me: (parent, args, { models }) => {
        //     return models[1]
        // }
    },
    Mutation: {
        createParent: async (root, { name, email, age, gender, phNum, street }, context, info) => {
            const newParent = await new Parent({
                name: name,
                email: email,
                age: age,
                gender: gender,
                phoneNumber: phNum,
                streetAddress: street
            });

            return new Promise((resolve, reject) => {
                newParent.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },
        updateParent: async (root, { id, name, email, age, gender, phNum, street }, context) => {
            let parent = await Parent.findOne({ _id: id }).exec();
            // console.log("update parent-->", parent)

            parent.name = name
            parent.age = age
            parent.gender = gender
            parent.phoneNumber = phNum
            parent.streetAddress = street
            parent.email = email

            return new Promise((resolve, reject) => {
                parent.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        }
    }
}