const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const main = require('../views/main')
const { db } = require('../models')
const pg = require('pg')
const models = require('../models')
const userRouter = require('../routes/user')
const wikiRouter = require('../routes/wiki')


const wiki = express()

wiki.use(express.static('public'))
wiki.use(express.urlencoded({ extended: false }))
wiki.use('/user', userRouter)
wiki.use('/wiki', wikiRouter)

wiki.get('/', (req, res, next) => {
  res.send(main(''))
})

const PORT = 3000



const init = async () => {
  await models.db.sync({
    force: true
  })

  wiki.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`)
  })
}

init()

// models.db.sync({force: true})

// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

