import { Loader } from '@/components/Loader'
import styles from './style.module.scss'

export function SubmitButton ({ buttonText, isLoading }) {
  return (
    <button className={styles.submitButton} type='submit' disabled={isLoading}>
      {isLoading ? <Loader /> : buttonText}
    </button>
  )
}
