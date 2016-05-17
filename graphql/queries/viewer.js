import {
  GraphQLID
} from 'graphql'

import User from '../types/user'


export default {
  type: User,
  resolve: (root, _, { viewer }) => viewer
}
