import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import connectRedis from 'connect-redis'
import expressGraphQL from 'express-graphql'

import Redis from './redis'


let app = express()

app.set('view engine', 'pug')
app.set('viewer', './views')

let RedisSessionStore = connectRedis(session)
app.use(session({
  name: 'mentor-server',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new RedisSessionStore({
    client: Redis,
    prefix: ':session:'
  }),
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(__dirname + '/public'))


app.get('/', (req, res) => {
  res.render('index')
})


import Schema from './graphql/schema'
import { User } from './storage'
let loadViewer = async (req, res, next) => {
  req.user = await User.load('e205a49e-da66-4af4-922d-a9cfcb7c5766').catch(() => null)
  next()
}

let loadFacebookViewer = async (req, res, next) => {
  let facebookUserId = req.get('x-facebook-user-id')
  console.log(facebookUserId)
  next()
}

let checkViewer = (req, res, next) => {
  if (req.user)
    next()
  else {
    res.status(403)
    res.render('error', { status: 403, message: 'Not authorized' })
  }
}

app.use('/graphql', loadViewer, loadFacebookViewer, checkViewer, expressGraphQL(req => ({
  schema: Schema,
  context: {
    viewer: req.user
  },
  graphiql: true
})))


let port = process.env.PORT

app.listen(port, () => {
  console.log('Listening on port', port)
})
