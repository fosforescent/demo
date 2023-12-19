import styles from 'Row.module.css'

const Row = (props: any) => {
  return (
    <div className={`${props.theme} ${styles.normal} secondary-container ${props.className}`}>
      {props.children}
    </div>
  )
}

export default Row
