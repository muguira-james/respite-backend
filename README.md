# respite-backend
Graphql back end

This is a starting point for the backend.  It is based graphql (vs REST).

to use it:
* 0. create a '.env' file from the file env_template. Add passwords for mongodb
* 1. use the same password from step 0 in the file 'create_user.js'
* 2. docker-compose up

If all is well, you will see a couple of messages and the sever will tell you were to point your browser to test.

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
