import React, { useState, useEffect } from "react"
import Month from "../Month/Month"
import styles from "./Calendar.module.scss"

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState() // current month
  const [previousMonth, setPreviousMonth] = useState() // previous month
  const [nextMonth, setNextMonth] = useState() // next month
  const [currentDay, setCurrentDay] = useState("") // current day
  const [currentYear, setYear] = useState(2021) // current year
  const [todaysDate] = useState(new Date())

  const monthsArr = [
    { name: "January", days: 31 },
    { name: "February", days: 28 },
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November ", days: 30 },
    { name: "December ", days: 31 },
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

    setCurrentDay(daysOfWeek[dd])
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

  return (
    <>
      <div className={styles.container}>
        {monthsArr.map((month, key) => {
          return (
            <div
              className={styles.month}
              onClick={e => handleClick(e)}
              key={key}
            >
              {month.name}
            </div>
          )
        })}
      </div>
      <Month
        daysOfWeek={daysOfWeek}
        currentMonth={currentMonth}
        currentDay={currentDay}
        currentYear={currentYear}
        nextMonth={nextMonth}
        previousMonth={previousMonth}
      />
    </>
  )
}

export default Calendar
