
/*
# Write your query or mutation here
# {
#   user(id: "2") {
#     username
#   }
# 	me {
#     username
#   }
#   users {
#     username
#     id
#   }
# }

# query {
# 	message(id: "1") {
#     id
#     text
#   }
# }

# mutation {
#   createMessage(text: "this is my message") {
#     id
#     text
#   }
# }

mutation {
  deleteMessage(id: "be44dcd8-0318-4d44-afd0-f485cd1d7791")
}
*/

let users = {
    1: {
      id: '1',
      username: 'James Muguira',
    },
    2: {
      id: '2',
      username: 'Julie Ray',
    },
  };
  
  const me = users[1]


  let myMessages = {
    1: {
      id: '1',
      text: 'Hello World',
    },
    2: {
      id: '2',
      text: 'Bye World',
    },
  };

  module.exports = { users, me, myMessages } 