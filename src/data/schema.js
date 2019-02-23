/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import SchemaDefinition from './schema.graphql';
import fetch from 'node-fetch';
import { User, Project, Issue } from './models'

const reactNewsUrl =
  'https://api.rss2json.com/v1/api.json' +
  '?rss_url=https%3A%2F%2Freactjsnews.com%2Ffeed.xml';

// noinspection JSUnusedGlobalSymbols
const resolvers = {
  Mutation: {
    async createNewProject(_, vars) {
      const result = await Project.create(vars);
      return result.dataValues;
    },
    async createIssue(_, vars) {
      const result = await Issue.create(vars);
      return {
        ...result.dataValues,
        project: await Project.findOne({
          where: {
            id: result.dataValues.project,
          }
        }),
      };
    },
  },
  Query: {
    projects() {
      return Project.findAll();
    },
    issues() {
      return Issue.findAll();
    },
    async databaseGetAllUsers() {
      return await User.findAll({});
    },
    async databaseGetUser(parent, { id }) {
      return await User.findOne({
        where: { id },
      });
    },
    async reactjsGetAllNews() {
      const response = await fetch(reactNewsUrl);
      const data = await response.json();
      if (data.status === 'ok') {
        return data.items;
      }
    },
  },
  Timestamp: new GraphQLScalarType({
    name: 'Timestamp',
    description: 'Timestamp custom scalar type',
    parseValue(value) {
      return value;
    },
    serialize(value) {
      return value;
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return ast.value;
      }
      return null;
    },
  }),
};

export default {
  typeDefs: [SchemaDefinition, `
schema {
  query: Query
  mutation: Mutation
}
  `],
  resolvers,
  ...(__DEV__ ? { log: e => console.error(e.stack) } : {}),
};
