import { User } from '../../../models';

export const schema = [
  `
  # A user stored in the local database
  type DatabaseUser {
    id: String
    name: String
    icon: String
  }
`,
];

export const queries = [
  `
  # Retrieves all users stored in the local database
  databaseGetAllUsers: [DatabaseUser]

  # Retrieves a single user from the local database
  databaseGetUser(
    # The user's email address
    id: String!
  ): DatabaseUser
`,
];

export const resolvers = {
  RootQuery: {
    async databaseGetAllUsers() {
      const users = await User.findAll({});
      return users;
    },
    async databaseGetUser(parent, { id }) {
      const user = await User.findOne({
        where: { id },
      });
      return user;
    },
  },
};
