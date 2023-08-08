// https://jasonwatmore.com/post/2021/08/04/next-js-11-jwt-authentication-tutorial-with-example-app#api-users-authenticate-js

import NextLink from 'next/link'

function Link({ href, children, ...props }: { href: string; children: any; props: any }) {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  )
}

export { Link }
