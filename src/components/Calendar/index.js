import React, { useState, useEffect } from "react"

import Month from "../Month/Month"
import Year from "../Year/Year"
import styles from "./Calendar.module.scss"
import cx from "classnames"
import DatePicker from "../DatePicker"

import { monthsArr, daysOfWeek } from "../dataObjects"

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState() // current month
  const [previousMonth, setPreviousMonth] = useState() // previous month
  const [nextMonth, setNextMonth] = useState() // next month
  const [currentDate, setCurrentDate] = useState() // curent date 1-31
  const [currentDay, setCurrentDay] = useState("") // current day
  const [currentYear, setYear] = useState() // current year
  const [todaysDate] = useState(new Date())

  useEffect(() => {
    var dd = todaysDate.getDay() // Sunaday is 0
    var mm = todaysDate.getMonth() //January is 0!
    var yyyy = todaysDate.getFullYear()

    setCurrentDate(todaysDate.getDate())
    setCurrentDay(dd)
    setYear(yyyy)
    setCurrentMonth(monthsArr[mm])
    updateMonths(mm)
  }, [])

  const updateMonths = i => {
    i > 0 ? setPreviousMonth(monthsArr[i - 1]) : setPreviousMonth(monthsArr[11])
    i < 11 ? setNextMonth(monthsArr[i + 1]) : setNextMonth(monthsArr[0])
  }

  const handleClick = e => {
    updateMonths(
      monthsArr.findIndex(month => month.name === e.target.innerHTML)
    )
  }

  const checkSelectedMonth = month => {
    if (currentMonth && month.name === currentMonth.name) return true
  }

  return (
    <React.Fragment>
      {currentMonth && (
        <DatePicker
          currentDate={currentDate}
          currentYear={currentYear}
          currentMonth={currentMonth}
        />
      )}
      <Year currentYear={currentYear} setCurrentYear={setYear} />
      <div className={styles.container}>
        {monthsArr.map((month, key) => {
          return (
            <div
              className={cx(styles.month, {
                [styles.selectedMonth]: checkSelectedMonth(month),
              })}
              onClick={e => handleClick(e)}
              key={key}
            >
              {month.name}
            </div>
          )
        })}
      </div>
      {
        <Month
          setCurrentDate={setCurrentDate}
          days={daysOfWeek}
          currentDate={currentDate}
          currentMonth={currentMonth}
          currentDay={currentDay}
          currentYear={currentYear}
          nextMonth={nextMonth}
          previousMonth={previousMonth}
        />
      }
    </React.Fragment>
  )
}

export default Calendar
