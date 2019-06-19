// import Sequelize from 'sequelize';

// let sequelize;
// if (process.env.DATABASE_URL) {
//   console.log("prod db url-->", process.env.DATABASE_URL)
//   sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//   });
// } else {
//   sequelize = new Sequelize(
//     process.env.DATABASE,
//     process.env.DATABASE_USER,
//     process.env.DATABASE_PASSWORD,
//     {
//       dialect: 'postgres',
//     },
//   );
// }
// const models = {
//   User: sequelize.import('./user'),
//   Message: sequelize.import('./message'),
// };

// Object.keys(models).forEach(key => {
//   if ('associate' in models[key]) {
//     models[key].associate(models);
//   }
// });

// export { sequelize }
//  export default models ;


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
export default peoples;