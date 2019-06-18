
// import 'dotenv/config';
import cors from 'cors';
import uuidv4 from 'uuid/v4';
import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';

import jwt from 'jsonwebtoken';

import schema from './schema'
import resolvers from './resolvers'
// import console = require('console');
// import models, {sequelize } from './models'

const app = express();
app.use(cors());

const server = new ApolloServer( { 
  typeDefs: schema,
  resolvers,
} )

server.applyMiddleware({app, path: '/graphql' })

app.listen({port: 8000}, () => {
  console.log("server is listening on http://localhost:8000/graphql")
})
// const getMe = async req => {
//   const token = req.headers['x-token'];

//   if (token) {
//     try {
//       return await jwt.verify(token, process.env.SECRET);
//     } catch (e) {
//       throw new AuthenticationError(
//         'Your session expired. Sign in again.',
//       );
//     }
//   }
// };

// const server = new ApolloServer({
//   playground: true,
//   introspection: true,
//   typeDefs: schema,
//   resolvers,
//   context: async ({ req }) => {
//     const me = await getMe(req);

//     return {
//       models,
//       me,
//       secret: process.env.SECRET,
//     };
//   },
// });

// server.applyMiddleware({ app, path: '/graphql' });

// const eraseDatabaseOnSync = true;
// const port = process.env.PORT || 8000;

// sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
//   if (eraseDatabaseOnSync) {
//     createUsersWithMessages();
//   }


//   app.listen({ port }, () => {
//     console.log('Apollo Server on', process.env.DATABASE_URL, port, '/graphql');
//   });
// });

// const createUsersWithMessages = async () => {
//   await models.User.create(
//     {
//       username: 'jmuguira',
//       email: 'muguira.james@email.com',
//       password: '1234567',
//       messages: [
//         {
//           text: 'published a dissertation',
//         },
//       ],
//     },
//     {
//       include: [models.Message],
//     },
//   );

//   await models.User.create(
//     {
//       username: 'julie ray',
//       email: 'ray.julie@email.com',
//       password: 'chuckray',
//       messages: [
//         {
//           text: 'helped me write a dissertation',
//         },
//         {
//           text: 'Published a thesis ...',
//         },
//       ],
//     },
//     {
//       include: [models.Message],
//     },
//   );
// };

