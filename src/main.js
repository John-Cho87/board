// @ts-check
/*eslint-env es6*/

const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('./public'))
app.set('view engine', 'pug')

const PORT = 5000
const userRouter = express.Router()
const USERS = {
  15: {
    name: 'cho',
  },
}

userRouter.param('id', (req, res, next, value) => {
  console.log('id parameter', value)
  //@ts-ignore
  req.user = USERS[value]
  next()
})

userRouter.get('/:id', (req, res) => {
  const resMimeType = req.accepts(['json', 'html'])

  if (resMimeType == 'json') {
    //@ts-ignore
    res.send(req.user)
  } else if (resMimeType == 'html') {
    res.render('user-profile')
  }
})

userRouter.post('/:id/name', (req, res) => {
  console.log('middle_2')
  res.send('hello express post')
})

app.use('/users', userRouter)

app.get('/', (req, res) => {
  res.render('index', { message: 'hola!' })
})

app.listen(PORT, () => {
  console.log(`I am litsning at port ${PORT}`)
})
