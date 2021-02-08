import React, { useState, useEffect } from "react"

import Month from "../Month/Month"
import Year from "../Year/Year"
import styles from "./Calendar.module.scss"
import cx from "classnames"

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState() // current month
  const [previousMonth, setPreviousMonth] = useState() // previous month
  const [nextMonth, setNextMonth] = useState() // next month
  const [currentDate, setCurrentDate] = useState() // curent dat 1-31
  const [currentDay, setCurrentDay] = useState("") // current day
  const [currentYear, setYear] = useState() // current year
  const [todaysDate] = useState(new Date())

  const monthsArr = [
    { name: "January", days: 31, index: 1 },
    { name: "February", days: 28, index: 2 },
    { name: "March", days: 31, index: 3 },
    { name: "April", days: 30, index: 4 },
    { name: "May", days: 31, index: 5 },
    { name: "June", days: 30, index: 6 },
    { name: "July", days: 31, index: 7 },
    { name: "August", days: 31, index: 8 },
    { name: "September", days: 30, index: 9 },
    { name: "October", days: 31, index: 10 },
    { name: "November ", days: 30, index: 11 },
    { name: "December ", days: 31, index: 12 },
  ]

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]

  useEffect(() => {
    var dd = todaysDate.getDay() // Sunaday is 0
    var mm = todaysDate.getMonth() //January is 0!
    var yyyy = todaysDate.getFullYear()

    setCurrentDate(todaysDate.getDate())
    setCurrentDay(dd)
    setYear(yyyy)
    updateMonths(mm)
  }, [])

  const updateMonths = i => {
    setCurrentMonth(monthsArr[i])
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
