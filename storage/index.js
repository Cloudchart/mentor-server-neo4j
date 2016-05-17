import neo4j from 'neo4j'
const db = new neo4j.GraphDatabase(process.env.NEO4J_DATABASE_URL)

import User from './user'
import Topic from './topic'

export default {
  'UserStore': User,
  'TopicStore': Topic,

  cypher: db.cypher.bind(db),
}

export {
  User,
  Topic
}
