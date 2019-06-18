

import uuidv4 from 'uuid/v4';

import { users, myMessages } from './static_data'

const resolvers = {
  Query: {

    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findByPk(id);
    },
    me: async (parent, args, { models, me }) => {
      return await models.User.findByPk(me.id);
    },
    // me: (parent, args, { me }) => {
    //   return me
    // },
    // user: (parent, { id }) => {
    //   console.log("id->", id)
    //   return users[id];
    // },
    // users: () => {
    //   return Object.values(users);
    // },

    messages: () => {
      return Object.values(myMessages);
    },

    message: (parent, { id }) => {
      console.log("message id -->", id)
      return myMessages[id]
    },

  },
  Mutation: {
    createMessage: (parent, { text }, { me }) => {
      const newId = uuidv4()
      const message = {
        text,
        id: newId
      };

      // side effect is to write tot he database
      myMessages[newId] = message
      return message;
    },
    deleteMessage: (parent, { id }) => {
      const { [id]: message, ...otherMessages } = myMessages;

      if (!message) {
        return false;
      }

      myMessages = otherMessages;

      return true;
    },
  },
};

module.exports = { resolvers }