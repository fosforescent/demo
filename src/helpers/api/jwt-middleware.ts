// https://jasonwatmore.com/post/2021/08/04/next-js-11-jwt-authentication-tutorial-with-example-app#api-users-authenticate-js

import { expressjwt } from 'express-jwt'
import * as util from 'util'
import { serverRuntimeConfig } from '@/app/config'

export { jwtMiddleware }

async function jwtMiddleware(req: any, res: any) {
 console.log('jwtMiddleware', req.next, Object.keys(res))


  const middleware = expressjwt({
    secret: serverRuntimeConfig.secret,
    algorithms: ['HS256'],
  }).unless({
    path: [
      // public routes that don't require authentication
      '/api/users/authenticate',
      '/api/users/register',
    ],
  })

  return util.promisify(middleware)(req, res)
}
