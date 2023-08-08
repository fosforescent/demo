import styles from './Card.module.css'

const Card = (props: any) => {
  return (
    <div className={`${props.theme} ${styles.normal} tertiary-container`}>{props.children}</div>
  )
}

export default Card
