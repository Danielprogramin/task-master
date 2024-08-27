import styles from './style.module.scss'

export const Notification = ({ status, msj }) => {
  return (
    <div className={`${styles.notification} ${styles[status]}`}>
      <p>{msj}</p>
    </div>
  )
}
