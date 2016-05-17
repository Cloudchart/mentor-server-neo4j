import Node from './node'


const AllQuery = `
  MATCH (node:Topic)
  RETURN node.id as id
  ORDER BY node.name
`


const SubscribedForUserQuery = `
  MATCH (u:User { id: { user_id } }) - [r:SUBSCRIBED] -> (node:Topic)
  RETURN node.id as id
  ORDER BY r.created_at
`

export default new Node('Topic', {

    queries: {
      all: AllQuery,
      subscribedForUser: SubscribedForUserQuery
    }

})
