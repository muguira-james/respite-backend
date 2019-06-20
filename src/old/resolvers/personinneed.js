


export default {
    Query: {
        peopleInNeed: (parent, args, { models }) => {
            console.log("peopleInNeed")
            return Object.values(models)
        },
        personInNeed: (parent, { id }, { models }) => {
            return models[id]
        },
        me: (parent, args, { models }) => {
            return models[1]
        }
    },
    Mutation: {
        updateNeedyBasicInfo: ( parent, { id, firstName, lastName, gender, birthday }, { models }) => {
            let person = models[id]
            
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
        updateEmergencyContact: ( parent, {id, firstName, lastName, phoneNumber, streetAddress, email }, { models } ) => {
            let person = models[id]
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

        // 
        // family info is currently an array.  Probably should be an associtive array (hash)
        addFamilyInfo: ( parent, { id, firstname, lastName, phoneNumber, streetAddress, email }, { models } ) => {
            let person = models[id]
            console.log("person before-->", person)
            if (person != null) {
                let famObj = {}
                famObj.id = uuidv4()       // notice this added as a string! fix in the db
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

        deleteFamilyMember: ( parent, { id_of_child, id_of_familyMember }, { models } ) => {
            let searchThis = models[id_of_child]
            
            let newArray = searchThis.familyInfo.filter(function(v, i, ar) {
                console.log("v ->", v.id, "index-->", i, "old fam->", id_of_familyMember)
                return id_of_familyMember !== v.id
            })
            
            searchThis.familyInfo = newArray
            return searchThis.familyInfo
        }
    }
}