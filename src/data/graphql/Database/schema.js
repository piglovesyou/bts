import merge from 'lodash.merge';

/** * Queries ** */
import {
  schema as GetAllUsers,
  queries as GetAllUsersQueries,
  resolvers as GetAllUsersResolver,
} from './users/GetAllUsers';

export const schema = [...GetAllUsers];

export const queries = [...GetAllUsersQueries];

export const resolvers = merge(
  GetAllUsersResolver,
);
