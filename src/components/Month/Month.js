import React, { useState, useEffect } from "react"
import styles from "./Month.module.scss"

const Month = ({ today, month, monthDays }) => {
  const [daysArr, setDaysArr] = useState([])

  useEffect(() => {
    setDaysArr(returnDays(monthDays))
  }, [monthDays])

  const returnDays = days => {
    let arr = []
    for (let i = 1; i <= days; i++) {
      arr.push({ dom: i })
    }
    return arr
  }

  return (
    <div className={styles.container}>
      {daysArr.map((day, key) => {
        return (
          <div className={styles.day} key={key}>
            {day.dom}
          </div>
        )
      })}
    </div>
  )
}

export default Month
