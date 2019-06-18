
import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server';

const peopleInNeed = {
  1: {
    id: '1',
    firstName: "James",
    lastName: "Muguira",
    gender: "male",
    birthday: "4/11/1950"
  },
  2: {
    id: '2',
    firstName: "Julie",
    lastName: "Ray",
    gender: "female",
    birthday: "5/1/1953"
  }
}
export default {
  Query: {
    personInNeed: (parent, args) => { return peopleInNeed[1] }
  }
}
// const createToken = async (user, secret, expiresIn) => {
//   const { id, email, username } = user;
//   return await jwt.sign({ id, email, username }, secret, {
//     expiresIn,
//   });
// };

// export default {
//   Query: {
//     users: async (parent, args, { models }) => {
//       return await models.User.findAll();
//     },
//     user: async (parent, { id }, { models }) => {
//       return await models.User.findByPk(id);
//     },
//     me: async (parent, args, { models, me }) => {
//       return await models.User.findByPk(me.id);
//     },
//   },

//   Mutation: {
//     signUp: async (
//       parent,
//       { username, email, password },
//       { models, secret },
//     ) => {
//       const user = await models.User.create({
//         username, 
//         email,
//         password
//       })

//       return { token: createToken(user, secret, '30m') }
//     },
      
//     signIn: async (
//       parent,
//       { login, password },
//       { models, secret },
//     ) => {
//       const user = await models.User.findByLogin(login);

//       if (!user) {
//         throw new UserInputError(
//           'No user found with this login credentials.',
//         );
//       }

//       const isValid = await user.validatePassword(password);
//       console.log("login-->", login, "password-->", password)
//       if (!isValid) {
//         throw new AuthenticationError('Invalid password.');
//       }

//       return { token: createToken(user, secret, '30m') };
//     },
    
//   },
//   User: {
//     messages: async (user, args, { models }) => {
//       return await models.Message.findAll({
//         where: {
//           userId: user.id,
//         },
//       });
//     },
//   },
// };