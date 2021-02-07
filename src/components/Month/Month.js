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
        updateMonth(
          currentYear,
          currentMonth,
          currentDay,
          previousMonth,
          nextMonth
        )
      )
  }, [currentMonth])

  const getDayObj = (year, month, day) => {
    let dayOfWeek = new Date(`${year}-${month}-${day}`).getUTCDay()
    return { dowIndex: dayOfWeek, dowName: days[dayOfWeek] } //day of week index, day of week name
  }

  const updateMonth = (year, month, day, prevMonth, nextMonth) => {
    let arr = []

    const fom = getDayObj(year, month.index, 1) //first of month
    if (fom !== 0)
      for (let i = 0; i <= fom.dowIndex - 1; i++) {
        const date = prevMonth.days - (fom.dowIndex - 1 - i)
        const yearCheck = prevMonth.index === 12 ? year - 1 : year // yearCheck for jan. switches the year to get the correct weekdays

        arr[i] = {
          date: date,
          month: prevMonth.name,
          ...getDayObj(yearCheck, prevMonth.index, date),
        }
      }

    for (let i = 1; i <= month.days; i++) {
      const dayObj = getDayObj(year, month.index, i)
      arr[fom.dowIndex + i] = {
        date: i,
        month: month,
        ...dayObj,
      }
    }

    const lom = arr[arr.length - 1] // last of month
    console.log(lom.dowIndex + 1)
    if (lom.dowIndex !== 6)
      for (let i = 1; i <= 6 - lom.dowIndex; i++) {
        const arrIndex = arr.length + i
        const dayObj = getDayObj(year, nextMonth.index, i)
        console.log(dayObj)
        arr[arrIndex] = {
          date: i,
          month: nextMonth,
          ...dayObj,
        }
      }

    return arr
  }

  const returnDays = day => {
    const dayColumn = []
    displayMonth.map((item, key) => {
      if (item.dowName === day) {
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
