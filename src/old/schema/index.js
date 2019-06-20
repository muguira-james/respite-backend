import { gql } from 'apollo-server-express';

import pinSchema from './personinneed';


const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, pinSchema];