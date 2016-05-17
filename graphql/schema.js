import {
  GraphQLSchema,
} from 'graphql'

import Query from './queries'
import Mutation from './mutations'


export default new GraphQLSchema({

  query: Query,
  // mutation: Mutation,

})
