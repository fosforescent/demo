
export const serverRuntimeConfig = {
    secret: process.env.JWT_SECRET || 'bad secret',
}
let protocol = 'https'
let host = process.env?.['VERCEL_URL'] || process.env?.['NEXT_PUBLIC_VERCEL_URL']


if(!host) {
  if (typeof window !== "undefined"){
    host = window.location.host
  }
}

if (!host) {
  if (process.env?.['NODE_ENV'] === 'development') {
    host = 'localhost:3000'
  } else {
    throw new Error('no host found')
  }
}


if (host.indexOf('localhost') !== -1) {
  protocol = 'http'
}

export const publicRuntimeConfig = {
    apiUrl: `${protocol}://${host}/api`,
    baseUrl: `${protocol}://${host}`
}
    