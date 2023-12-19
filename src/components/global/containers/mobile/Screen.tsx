import styles from './Screen.module.css'

const Screen = (props: any) => {
  return (
    <div
      className={`${props.theme} ${styles.normal} secondary-container ${props.className}`}
      {...props}
    >
      {props.children}
    </div>
  )
}

export default Screen
