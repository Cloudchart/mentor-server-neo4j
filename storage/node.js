import DataLoader from 'dataloader'
import neo4j from '.'


let objectify = (records) =>
  records.reduce((memo, { node }) => {
    memo[node.properties.id] = {
      _id: node._id,
      ...node.properties,
      labels: node.labels
    }
    return memo
  }, {})


let LoadAllQuery = (name) => `
  MATCH (node:${name})
  RETURN node.id as id
`


let LoadManyQuery = (name) => `
  MATCH (node:${name})
  WHERE node.id in { ids }
  RETURN node
`


let idsLoader = (query, params = {}) =>
  new Promise((resolve, reject) => {
    neo4j.cypher({
      query,
      params
    }, (error, result) => {
      if (error)
        reject(error)
      else
        resolve(result.map(record => record.id))
    })
  })


let nodeLoader = (query) =>
  (ids) =>
    new Promise((resolve, reject) => {
      neo4j.cypher({
        query: query,
        params: { ids: ids }
      }, (error, result) => {
        if (error)
          reject(error)
        else {
          let records = objectify(result)
          resolve(ids.map(id => records[id] || new Error(id)))
        }
      })
    })


class Node {

  constructor(name, descriptor = {}) {
    this.name = name
    this.allQuery = LoadAllQuery(this.name)
    this.manyQuery = LoadManyQuery(this.name)
    this.nodeLoader = nodeLoader(this.manyQuery)
    this.dataLoader = new DataLoader(this.nodeLoader)
  }

  load = (id) =>
    this.dataLoader.load(id)

  loadMany = (ids) =>
    this.dataLoader.loadMany(ids)

  loadAll = () =>
    idsLoader(this.allQuery)
      .then(ids => this.loadMany(ids))

  clear = (id) => {
    this.dataLoader.clear(id)
    return this
  }

  clearAll = () => {
    this.dataLoader.clearAll()
    return this
  }

}


export default Node
