import mongoose from 'mongoose'
import config from './index.js'

// pass in config values to CONNECTION_URL
const CONNECTION_URL = `mongodb://${config.db.url}/${config.db.name}`

// form a mongo connection with the database 
  // useNewUrlParser tells mongoose to use the new parser by Mongo
  // useUnifiedToplogy opts into MongoDB driver's new connection management engine
mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// mongoose event handlers
mongoose.connection.on('connected', () => {
  console.log(CONNECTION_URL)
  console.log('Mongo has connected successfully')
})
mongoose.connection.on('reconnected', () => {
  console.log('Mongo has reconnected')
})
mongoose.connection.on('error', error => {
  console.log('Mongo connection has an error', error)
  mongoose.disconnect()
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongo connection is disconnected')
})