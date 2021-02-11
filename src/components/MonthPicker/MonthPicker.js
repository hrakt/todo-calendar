import React from "react"
import styles from "./MonthPicker.module.scss"
import cx from "classnames"

import { monthsArr } from "../dataObjects"

const MonthPicker = ({ currentMonth, setCurrentMonth }) => {
  const handleClick = e => {
    const selectedMonth =
      monthsArr[monthsArr.findIndex(month => month.name === e.target.innerHTML)]
    setCurrentMonth(selectedMonth)
  }

  const checkSelectedMonth = month => {
    if (currentMonth && month.name === currentMonth.name) return true
  }

  return (
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
  )
}

export default MonthPicker
