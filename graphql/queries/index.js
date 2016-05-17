import {
  GraphQLObjectType
} from 'graphql'


import NodeQuery from './node'
import ViewerQuery from './viewer'


export default new GraphQLObjectType({

  name: 'Query',

  fields: () => ({

    node: NodeQuery,
    viewer: ViewerQuery,

  })

})
