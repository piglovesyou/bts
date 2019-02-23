import merge from 'lodash.merge';

import {
  resolvers as networkStatusResolvers,
  defaults as networkStatusDefaults,
} from './networkStatus';

// Below are used for apollo-link-state and not used in GraphQL server.
export const defaults = merge(networkStatusDefaults);
export const resolvers = merge(networkStatusResolvers);
