import styles from './TextInput.module.css'
const TextInput = (props: any) => {
  return (
    <div className={`${props.theme} ${styles.normal} text-field ${props.className}`}>
      <input type='text' value={props.value} onChange={(e) => props.setValue(e.target.value)} />
    </div>
  )
}
export default TextInput
