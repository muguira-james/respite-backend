# respite-backend
Graphql back end

This is a starting point for the backend.  It is based graphql (vs REST).

to use it:
* 0. create a '.env' file from the file env_template.
* 1. use the same password from step 0 in the file 'create_user.js'
* 2. docker-compose up

NOTE:

You will have to edit the new .env file to add passwords. You have to change each instance of <Your password here>.  For example to use docker-compose, you have to edit 2 lines: the SECRET and line 10.

If all is well, you will see a couple of messages and the sever will tell you were to point your browser to test.

# Testing

With docker-compose, you can issue a docker-compose up and the backend should start.  In a new terminal, you can issue a npm test.

Here are a number of LOW-LEVEL calls you can make.  These are all commented out.  They really are ment to be run form a browser or the device.

# # Write your query or mutation here
# query {
#   getParents {
#     name
#     email
#     phoneNumber
#   }
# }



# mutation {
#   signIn(name: "Paul", email:"paul@cox.net", password: "fuManChu") {
#     token
#   }
# }

mutation {
  echoToken(name:"Paul", email: "paul@cox.net", password: "fuManChu") {
    token
  }
}


# mutation {
#   updateParentPassword(name: "Paul", email: "paul@cox.net", password: "fuManChu") {
#     name
#     age
#   }
# }
