import uuidv4 from 'uuid/v4';
// import console = require('console');
// import console = require('console');
// import console = require('console');

// import userResolvers from './user';
// import messageResolvers from './message';

// export default [userResolvers, messageResolvers];

let peoples = {
    1: {
        id: '1',

        NeedyBasicInfo: {
            firstName: "James",
            lastName: "Muguira",
            gender: "male",
            birthday: "4/11/1950",
            languages: ['spanish', 'english'],
        },

        needs: ['cookies'],
        emergencyContact: {
            firstName: "Julie",
            lastName: "Ray",
            phoneNumber: "757-851-0569",
            streetAddress: "123 main st",
            email: "jul@there.com"
        },
        familyInfo: [
            {
                id: "100",
                parent_firstName: "Frank",
                parent_lastName: "Muguira",
                parent_streetAddress: "1719 Beach Road, Hampton Va 22206",
                parent_email: "frank.muguira@cox.net"
            }
        ]
    },
    2: {
        id: "2",
        NeedyBasicInfo: {
            firstName: "Julie",
            lastName: "Ray",
            gender: "Female",
            birthday: "45/11/1930",
            languages: ['italian', 'french', 'english'],
        },

        needs: ['wine'],
        emergencyContact: {
            firstName: "Sharon",
            lastName: "Ray",
            phoneNumber: "571-851-0569",
            streetAddress: "9001 belvior Woods",
            email: "jul@there.com"
        },
        familyInfo: [
            {
                id: "200",
                parent_firstName: "Mark",
                parent_lastName: "Ray",
                parent_streetAddress: "54 Tampa FLA",
                parent_email: "frank.muguira@cox.net"
            }
        ]
    }
}
export default {
    Query: {
        peopleInNeed: (parent, args) => {
            return Object.values(peoples)
        },
        personInNeed: (parent, { id }) => {
            return peoples[id]
        }
    },
    Mutation: {
        updateNeedyBasicInfo: ( parent, { id, firstName, lastName, gender, birthday }, context) => {
            let person = peoples[id]
            
            if (person != null) {
                person.NeedyBasicInfo.firstName = firstName
                person.NeedyBasicInfo.lastName = lastName
                person.NeedyBasicInfo.gender = gender
                person.NeedyBasicInfo.birthday = birthday
                
                return person.NeedyBasicInfo
            } else {
                return null
            }
        },
        updateEmergencyContact: ( parent, {id, firstName, lastName, phoneNumber, streetAddress, email }, context ) => {
            let person = peoples[id]
            console.log("person-->", person)
            if (person) {
                person.emergencyContact.firstName = firstName
                person.emergencyContact.lastName = lastName
                person.emergencyContact.phoneNumber = phoneNumber
                person.emergencyContact.streetAddress = streetAddress
                person.emergencyContact.email = email

                return person.emergencyContact
            } else {
                throw new NoUserFound (
                    'No user found with this login credentials.',
                  );
            }
        },

        addFamilyInfo: ( parent, { id, firstname, lastName, phoneNumber, streetAddress, email }, context ) => {
            let person = peoples[id]
            console.log("person before-->", person)
            if (person != null) {
                let famObj = {}
                famObj.id = (Math.random() * 10) + id        // notice this added as a string! fix in the db
                famObj.parent_firstName = firstname
                famObj.parent_lastName = lastName
                famObj.parent_phoneNumber = phoneNumber
                famObj.parent_email = email
                famObj.parent_streetAddress = streetAddress
                person.familyInfo.push(famObj)
                console.log("person after-->", person)
                return person.familyInfo
            } else {
                null
            }
        },

        deleteFamilyMember: ( parent, { id_of_child, id_of_familyMember }, context ) => {
            let searchThis = peoples[id_of_child]
            
            let newArray = searchThis.familyInfo.filter(function(v, i, ar) {
                console.log("v ->", v.id, "index-->", i, "old fam->", id_of_familyMember)
                return id_of_familyMember !== v.id
            })
            
            searchThis.familyInfo = newArray
            return searchThis.familyInfo
        }
    }
}

// export default {
//   Query: {
//     users: (parent, args, { models }) => {
//       return Object.values(models.users);
//     },
//     user: (parent, { id }, { models }) => {
//       return models.users[id];
//     },
//     me: (parent, args, { me }) => {
//       return me;
//     },
//     messages: (parent, args, { models }) => {
//       return Object.values(models.messages);
//     },
//     message: (parent, { id }, { models }) => {
//       return models.messages[id];
//     },
//   },

//   Mutation: {
//     createMessage: (parent, { text }, { me, models }) => {
//       const id = uuidv4();
//       const message = {
//         id,
//         text,
//         userId: me.id,
//       };

//       models.messages[id] = message;
//       models.users[me.id].messageIds.push(id);

//       return message;
//     },

//     deleteMessage: (parent, { id }, { models }) => {
//       const { [id]: message, ...otherMessages } = models.messages;

//       if (!message) {
//         return false;
//       }

//       models.messages = otherMessages;

//       return true;
//     },
//   },

//   User: {
//     messages: (user, args, { models }) => {
//       return Object.values(models.messages).filter(
//         message => message.userId === user.id,
//       );
//     },
//   },

//   Message: {
//     user: (message, args, { models }) => {
//       return models.users[message.userId];
//     },
//   },
// };