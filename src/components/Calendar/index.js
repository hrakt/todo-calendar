import React, { useState, useEffect } from "react"
import Month from "../Month/Month"
import styles from "./Calendar.module.scss"

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState("January")
  const [monthDays, setMonthDays] = useState()

  useEffect(() => {
    setMonthDays(monthsArr.find(i => i.name === currentMonth).days)
  }, [currentMonth])

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

  const handleClick = e => {
    setCurrentMonth(e.target.innerHTML)
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
      <Month monthDays={monthDays} />
    </>
  )
}

export default Calendar
