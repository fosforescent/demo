// https://jasonwatmore.com/post/2021/08/04/next-js-11-jwt-authentication-tutorial-with-example-app#api-users-authenticate-js

import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import { Link } from '../global/link'

export { NavLink }

function NavLink({
  children,
  href,
  exact,
  ...props
}: {
  children: any
  href: string
  className?: string
  exact?: boolean
} & any) {
  const { pathname } = useRouter()
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  if (isActive) {
    props.className += ' active'
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}
