'use client'
import styles from './layout.module.css'
import { userService } from '../../services'
import { useEffect, useState } from 'react'

const name = '[Your Name]'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children, home }: { children: any; home?: boolean }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 768)
    })
    return window.removeEventListener('resize', () => {
      setIsMobile(window.innerWidth < 768)
    })
  }, [])

  return (
    <div className={isMobile ? styles.mobileContainer : styles.container}>
      <header className={styles.header}>
        <div style={{ textAlign: 'left', width: '100%' }}>
          <button
            onClick={() => {
              userService.logout()
            }}
          >
            {' '}
            Logout{' '}
          </button>
        </div>
        {/* {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )} */}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
            <a>← Back to home</a>
        </div>
      )}
    </div>
  )
}
