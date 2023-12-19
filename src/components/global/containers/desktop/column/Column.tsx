import styles from './Column.module.css'

const Column = (props: any) => {
  return (
    <div
      className={`${props.theme} ${styles.normal} secondary-container ${props.className}`}
      {...props}
    >
      {props.children}
    </div>
  )
}

export default Column
