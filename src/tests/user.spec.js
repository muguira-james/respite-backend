

import { expect } from 'chai';

import * as userApi from './api';

describe('simple test', () => {
  it('user is user', () => {
    expect('user').to.eql('user');
  });
});


describe('users', () => {
  describe('user(id: String!): User', () => {
    it('returns a user when user can be found', async () => {
      const expectedResult = {
        data: {
          user: {
            id: '1',
            username: 'jmuguira',
            email: 'muguira.james@email.com'
          },
        },
      };

      const result = await userApi.user({ id: '1' });

      expect(result.data).to.eql(expectedResult);
    });

    it('return null with no user found', async () => {
      const expectedResult = {
        data: {
          user: null,
        },
      };

      const result = await userApi.user( { id: '42' } )

      expect(result.data).to.eql(expectedResult)
    })

    it('show all users', async () => {
      const expectedResult = {
        "data": {
          "users": [
            {
              "id": "1",
              "username": "jmuguira",
              "email": "muguira.james@email.com"
            },
            {
              "id": "2",
              "username": "julie ray",
              "email": "ray.julie@email.com"
            }
          ]
        }
      }

      const result = await userApi.users( )

      expect(result.data).to.eql(expectedResult)

    })
  });

  
});

