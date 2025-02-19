import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

type Keys = { [x: string]: any }

const apiSecret: string = process.env.API_SECRET as string

export default class Tokenize {
  public static encode = (data: Keys): string => {
    let payload = JSON.stringify(data)
    payload = JSON.parse(payload)
    return jwt.sign(payload, apiSecret, {})
  }

  public static decode = (token: string): string | JwtPayload => {
    return jwt.verify(token, apiSecret)
  }
}
