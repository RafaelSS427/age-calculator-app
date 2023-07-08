import { HTMLInputTypeAttribute, forwardRef } from 'react'
import styles from './styles.module.css'

interface Props {
  id: string;
  label: string;
  placeholder: string;
  helperText?: string;
  type?: HTMLInputTypeAttribute;
  error?: boolean;
}

export const InputApp = forwardRef<HTMLInputElement, Props>((
  {
    id,
    label,
    helperText,
    placeholder,
    type = "text",
    error = false,
    ...props
  }, ref) => {

  return (
    <div className={`stack-col ${ error ? styles['input-error'] : ''}`} style={{ gap: 7 }}>
      <label className={styles['input-label']} htmlFor={id}>{label}</label>
      <input
        className={`${styles['input-app']}`}
        ref={ref}
        id={id}
        type={type}
        placeholder={placeholder}
        {...props}
      />

      {
        error ? (
          <p className={ styles['input-helper'] }>{helperText}</p>
        ) : null
      }
    </div>
  )
})