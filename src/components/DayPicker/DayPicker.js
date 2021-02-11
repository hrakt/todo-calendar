import React, { useState, useEffect } from "react"
import styles from "./DayPicker.module.scss"
import cx from "classNames"

import { monthsArr } from "../dataObjects"

const DayPicker = ({
  days,
  currentDay,
  currentMonth,
  currentDate,
  currentYear,
}) => {
  const [displayMonth, setDisplayMonth] = useState([])
  const [previousMonth, setPreviousMonth] = useState({}) // previous month
  const [nextMonth, setNextMonth] = useState({}) // next month

  const monthUpdates = i => {
    console.clear()
    console.log(i)
    console.log(monthsArr[i - 2])
    i > 0 ? setPreviousMonth(monthsArr[i - 1]) : setPreviousMonth(monthsArr[11])
    i < 11 ? setNextMonth(monthsArr[i + 1]) : setNextMonth(monthsArr[0])
    updateMonth(currentYear, currentMonth, currentDay, previousMonth, nextMonth)
  }

  useEffect(() => {
    currentMonth && monthUpdates(currentMonth.index)
  }, [])

  useEffect(() => {
    setDisplayMonth([])
    monthUpdates(currentMonth.index)
  }, [currentMonth])

  const getDayObj = (year, month, day) => {
    let dayOfWeek = new Date(`${year}-${month}-${day}`).getUTCDay()
    return { dowIndex: dayOfWeek, dowName: days[dayOfWeek] } //day of week index, day of week name
  }

  const updateMonth = (year, month, day, prevMonth, nextMonth) => {
    let arr = []

    const fom = getDayObj(year, month.index, 1) //first of month
    console.log(prevMonth)
    if (fom !== 0)
      for (let i = 0; i <= fom.dowIndex - 1; i++) {
        const date = prevMonth.days - (fom.dowIndex - 1 - i)
        const yearCheck = prevMonth.index === 12 ? year - 1 : year // yearCheck for jan. switches the year to get the correct weekdays

        arr[i] = {
          date: date,
          month: prevMonth,
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
    if (lom.dowIndex !== 6)
      for (let i = 1; i <= 6 - lom.dowIndex; i++) {
        const arrIndex = arr.length + i
        const yearCheck = nextMonth.index === 1 ? year + 1 : year
        const dayObj = getDayObj(yearCheck, nextMonth.index, i)
        arr[arrIndex] = {
          date: i,
          month: nextMonth,
          ...dayObj,
        }
      }

    setDisplayMonth([])
    setDisplayMonth(arr)
  }

  const checkSelectedDate = date => {
    if (date.date === currentDate && date.month.name === currentMonth.name)
      return true
  }

  const returnDays = day => {
    var dayColumn = []
    displayMonth.map((item, key) => {
      const notCurrentMonth = item.month !== currentMonth
      if (item.dowName === day) {
        dayColumn.push(
          <div
            className={cx(styles.day, {
              [styles.greyedOut]: notCurrentMonth,
              [styles.selectedDate]: checkSelectedDate(item),
            })}
            key={key}
          >
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

export default DayPicker
