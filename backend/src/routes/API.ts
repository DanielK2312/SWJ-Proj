import express from 'express'

import authRouter from './authRouter'
import personRouter from './personRouter'
import userRouter from './userRouter'
import analyticRouter from './analyticRouter'

const API = (app: express.Express) => {
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/person', personRouter)
  app.use('/api/v1/user', userRouter)
  app.use('/api/v1/analytics', analyticRouter)
}
export default API
