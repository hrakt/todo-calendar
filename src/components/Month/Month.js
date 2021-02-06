import React, { useState, useEffect } from "react"
import styles from "./Month.module.scss"

const Month = ({
  days,
  currentDay,
  currentMonth,
  previousMonth,
  nextMonth,
  currentYear,
}) => {
  const [displayMonth, setDisplayMonth] = useState([])

  useEffect(() => {
    setDisplayMonth([])
    if (currentMonth)
      setDisplayMonth(
        updateMonth(currentYear, currentMonth, currentDay, previousMonth)
      )
  }, [currentMonth])

  const getDayObj = (year, month, day) => {
    let dayOfWeek = new Date(`${year}-${month}-${day}`)
    // console.log(dayOfWeek)
    dayOfWeek = dayOfWeek.getUTCDay()
    return { dowIndex: dayOfWeek, dowName: days[dayOfWeek] } //day of week index, day of week name
  }

  const updateMonth = (year, month, day, prevMonth) => {
    let arr = []

    const fom = getDayObj(year, month.index, 1) //first of month
    if (fom !== 0)
      for (let i = 0; i <= fom.dowIndex - 1; i++) {
        const date = prevMonth.days - (fom.dowIndex - 1 - i)

        arr[i] = {
          date: date,
          month: prevMonth.name,
          ...getDayObj(year, prevMonth.index, date),
        }
      }

    for (let i = 1; i <= month.days; i++) {
      const dayObj = getDayObj(year, month.index, i)
      console.log(dayObj)
      arr[fom.dowIndex + i] = {
        date: i,
        month: month,
        ...dayObj,
      }
    }

    // console.log(arr)

    return arr
  }

  const returnDays = day => {
    const dayColumn = []
    displayMonth.map((item, key) => {
      if (item.dowName === day) {
        // console.log(day)
        dayColumn.push(
          <div className={styles.day} key={key}>
            {item.date}
          </div>
        )
      }
    })
    return dayColumn
  }

  return (
    <div className={styles.container}>
      <div className={styles.weekDayContainer}>
        {days.map((day, key) => {
          const short = day.substring(0, 3)
          return (
            <div key={key} className={styles.weekDay}>
              {short}
              {returnDays(day)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Month
