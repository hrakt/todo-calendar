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
    if (currentMonth)
      setDisplayMonth(
        updateMonth(currentYear, currentMonth, currentDay, previousMonth)
      )
  }, [currentMonth])

  const getDayObj = (year, month, day) => {
    const dayOfWeek = new Date(`${year}-${month}-${day}`).getDay()
    return { dowIndex: dayOfWeek, dowName: days[dayOfWeek] } //day of week index, day of week name
  }

  const updateMonth = (year, month, day, prevMonth) => {
    let arr = []

    const fom = getDayObj(year, month.index, 1) //first of month
    if (fom !== 0)
      for (let i = 0; i < fom.dowIndex; i++) {
        console.log(prevMonth.days - (fom.dowIndex - 1))
        const date = prevMonth.days - (fom.dowIndex - 1)
        arr[i] = {
          date: date,
          month: prevMonth,
          ...getDayObj(year, prevMonth.index, date),
        }
      }

    for (let i = fom.dowIndex; i <= month.days; i++) {
      arr[i] = {
        date: i,
        month: month,
        ...getDayObj(year, month.index, i),
      }
    }

    console.log(arr)

    return arr
  }

  return (
    <div className={styles.container}>
      <div className={styles.weekDayContainer}>
        {days.map((day, key) => {
          const short = day.substring(0, 3)
          return (
            <div key={key} className={styles.weekDay}>
              {short}
            </div>
          )
        })}
      </div>

      {displayMonth.map((day, key) => {
        // console.log(day)
        return (
          <>
            <div className={styles.day} key={key}>
              {day.date}
            </div>
            {day % 7 === 0 ? <br /> : null}
          </>
        )
      })}
    </div>
  )
}

export default Month
