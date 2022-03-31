import express from 'express'

import authRouter from './authRouter'
import personRouter from './personRouter'

const API = (app: express.Express) => {
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/person', personRouter)
}

export default API
