import express from 'express'
import isLoggedIn from '../utils/authGuard'
import User from '../models/userModel'

const userRouter = express.Router()

/**
 * Lists all users from the database.
 *
 * @remarks
 * GET /api/v1/user/list
 *
 * @returns <JSON> { User[] }
 */
userRouter.get('/list', async (req, res) => {
  User.find({})
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(500).json({ err })
    })
})

/**
 * Creates a user from the database.
 *
 * @remarks
 * POST /api/v1/user/create [SECURE ROUTE]
 *
 * @param req.body.* - Fields of the user object.
 * @returns <JSON> { User }
 */
// userRouter.post('/create', isLoggedIn, (req, res) => {

userRouter.post('/create', isLoggedIn, (req, res) => {
  // Email is the only required field to create a User.
  if (req.body.email) {
    const newUser = new User(req.body.email)
    newUser.save()
    res.status(200).json(newUser)
  }
})

/**
 * Deletes a user from the database.
 *
 * @remarks
 * GET /api/v1/user/delete [SECURE ROUTE]
 *
 * @param req.body.id - The _id field created by MongoDB.
 * @returns <JSON> { status, result } | { status, err }
 */
userRouter.post('/delete', isLoggedIn, (req, res) => {
  const id = req.body.id
  const user = User.findById(id)
  console.log('User: ' + user)
  user.deleteOne()
    .then(result => {
      res.status(200).json({ status: 'success', result: result })
    })
    .catch(err => {
      res.status(500).json({ status: 'error', err: err })
    })
})

export default userRouter
