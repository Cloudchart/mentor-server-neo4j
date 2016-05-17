import {
  fromGlobalId,
  nodeDefinitions
} from 'graphql-relay'

import Stores from '../../storage'

export default nodeDefinitions(

  (globalId) => {
    let { type, id } = fromGlobalId(globalId)

    let store = Stores[type + 'Store']
    if (!store)
      return new Error(`${type} store not found.`)

    return store.load(id)
  }

)
