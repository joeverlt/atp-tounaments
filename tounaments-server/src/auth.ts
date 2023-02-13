import { Request, Response, NextFunction } from 'express'
import Tokenize from './app/utils/tokenize'

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token')

  if (!token) {
    return res.status(401).json({ error: 'No authentication token found' })
  }

  try {
    Tokenize.decode(token)
    next()
  } catch (error) {
    res.status(401).json({ msg: 'Invalid Token' })
  }
}

export default auth
