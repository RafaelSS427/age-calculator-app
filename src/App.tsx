import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { differenceInDays, differenceInYears, differenceInMonths } from 'date-fns'

import { DividerApp, InputApp } from './components'
import { useAnimation } from './hooks'

type FormData = {
  day: number;
  month: number;
  year: number;
}

export const App = () => {
  const { elementRef: daysRef, startAnimate: animationDays } = useAnimation()
  const { elementRef: monthsRef, startAnimate: animationMonths } = useAnimation()
  const { elementRef: yearsRef, startAnimate: animationYears } = useAnimation()

  const [age, setAge] = useState({
    days: 0o1,
    months: 0o1,
    years: 0o1,
  })

  const methods = useForm<FormData>()

  const { register, formState: { errors }, handleSubmit, setError } = methods

  const onSubmit = ({ year, month, day }: FormData) => {
    const userDate = new Date(year, month - 1, day)

    if (userDate.getDate() !== Number(day)) {
      setError('day', {
        message: 'Must be a valid day'
      })

      throw Error('Must be a valid day')
    }

    const getDays = differenceInDays(Date.now(), userDate) % 30
    const getMonths = differenceInMonths(Date.now(), userDate) % 12
    const getYears = differenceInYears(Date.now(), userDate)

    animationDays(age.days, getDays)
    animationMonths(age.months, getMonths)
    animationYears(age.years, getYears)

    setAge({
      days: getDays,
      months: getMonths,
      years: getYears
    })

  }

  return (
    <Fragment>
      <div className="container">

        <form onSubmit={handleSubmit(onSubmit)} id="form-submit" noValidate>
          <div className="stack-row container-inputs">
            <InputApp
              id="day"
              label="Day"
              placeholder="dd"
              type="number"
              {...register('day', {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "Must be a valid day"
                },
                max: {
                  value: 31,
                  message: "Must be a valid day"
                }
              })}
              error={!!errors.day}
              helperText={errors.day?.message}
            />

            <InputApp
              id="month"
              label="Month"
              placeholder="MM"
              type="number"
              {...register('month', {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "Must be a valid month"
                },
                max: {
                  value: 12,
                  message: "Must be a valid month"
                }
              })}
              error={!!errors.month}
              helperText={errors.month?.message}
            />

            <InputApp
              id="year"
              label="Year"
              placeholder="yyyy"
              type="number"
              {...register('year', {
                required: "This field is required",
                validate: (val: number) => {
                  if (val >= new Date().getFullYear()) {
                    return `Must be in the past`
                  }

                  return true
                }
              })}
              error={!!errors.year}
              helperText={errors.year?.message}
            />
          </div>
        </form>

        <DividerApp />

        <div className="stack-col">
          <strong className="text-strong"><span ref={yearsRef} className="number-strong">--</span>years</strong>
          <strong className="text-strong"><span ref={monthsRef} className="number-strong">--</span>months</strong>
          <strong className="text-strong"><span ref={daysRef} className="number-strong">--</span>days</strong>
        </div>
      </div>
    </Fragment>
  )
}