import { ArrowIcon } from '@/assets'
import styles from './styles.module.css'

export const DividerApp = () => {
  return (
    <div className={`${styles['divider-container']}`}>
      <div className={styles['hr-container']}>
        <hr />
          <button form="form-submit" type="submit" className={styles['icon-container']}>
            <ArrowIcon />
          </button>
      </div>
    </div>
  )
}
