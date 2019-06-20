import { gql } from 'apollo-server-express';

import parentSchema from './Parent';
import childSchema from './Child';
import hostSchema from './Host'

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

export default [linkSchema, parentSchema, childSchema, hostSchema];


