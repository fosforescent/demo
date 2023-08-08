// https://jasonwatmore.com/post/2021/08/04/next-js-11-jwt-authentication-tutorial-with-example-app

import { checkAuth, errorHandler, jwtMiddleware } from './'

export { apiHandler, apiHandlerPublic }

function apiHandler(handler: any) {
  return async (req: any, res: any) => {
    try {
      // global middleware
      await checkAuth()

      // route handler
      return await handler(req, res)

    } catch (err) {
      // global error handler
      return errorHandler(err, res)
    }
  }
}

function apiHandlerPublic(handler: any) {
  return async (req: any, res: any) => {
    try {

      // route handler
      return await handler(req, res)

    } catch (err) {
      // global error handler
      return errorHandler(err, res)
    }
  }
}
