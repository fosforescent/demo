// https://jasonwatmore.com/post/2021/08/04/next-js-11-jwt-authentication-tutorial-with-example-app#api-users-authenticate-js
import { NextResponse } from "next/server"

export { errorHandler }

function errorHandler(err: any, res: any) {
  if (typeof err === 'string') {
    // custom application error
    return NextResponse.json({ message: err }, { status: 400 })
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return NextResponse.json({ message: 'Invalid Token' }, { status: 401 })
  }

  // default to 500 server error
  return NextResponse.json({ message: err.message }, { status: 500 })
}
