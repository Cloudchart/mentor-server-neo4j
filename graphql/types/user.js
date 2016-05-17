import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql'

import {
  fromGlobalId,
  globalIdField
} from 'graphql-relay'

import nodeDefinitions from './node'


export default new GraphQLObjectType({

  name: 'User',

  interfaces: () => [nodeDefinitions.nodeInterface],

  isTypeOf: ({ labels }) => labels.indexOf('User') > -1,

  fields: () => ({

    id: globalIdField(),

    name: {
      type: new GraphQLNonNull(GraphQLString)
    }

  })

})
