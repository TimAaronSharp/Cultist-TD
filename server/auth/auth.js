let router = require('express').Router()
let Users = require('../models/user')

router.post('/register', (req, res) => {
  // debugger
  Users.create(req.body)
    .then((user) => {
      req.session.uid = user._id
      req.session.save()
      user.password = null
      delete user.password
      res.send({
        message: 'Successfully created user account',
        data: user
      })
    })
    .catch(err => {
      res.send({ error: err })
    })
})


router.post('/login', (req, res) => {
  // debugger
  Users.findOne({ email: req.body.email })
    .then(user => {
      user.validatePassword(req.body.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).send({ error: 'Invalid Email or Password' })
          }

          req.session.uid = user._id.toString();
          req.session.save((err, s) => {
            console.log('err:', err)
            console.log('s:', s)
            user.password = null
            delete user.password
            res.send({
              message: 'successfully logged in',
              data: user,
              err,
              s
            })
          })
        })
        .catch(err => {
          res.status(401).send({ error: err || 'Invalid Email or Password' })
        })
    })
    .catch(err => {
      res.status(401).send({
        error: err,
        message: 'Invalid Email or Password'
      })
    })
})

router.delete('/logout', (req, res) => {
  req.session.destroy()
  res.status(200).send({
    message: 'Please come back soon!'
  })
})


router.get('/authenticate', (req, res) => {
  Users.findById(req.session.uid).then(user => {
    if (!user) {
      return res.status(401).send({ "error": "Please Login" })
    }
    return res.send({
      data: user
    })

  }).catch(err => {
    return res.status(500).send({
      error: err
    })
  })
})


module.exports = router