import React, { useEffect, useState } from "react"
import styles from "./DatePicker.module.scss"
import cx from "classnames"

const DatePicker = ({ currentDate, currentMonth, currentYear }) => {
  const [selectedPicker, setSelectedPicker] = useState()

  return (
    <div className={styles.container}>
      <div
        className={cx(styles.month, {
          [styles.selected]: selectedPicker === "month",
        })}
        onClick={() => setSelectedPicker("month")}
      >
        {currentMonth.index}
      </div>
      <span>/</span>
      <div
        className={cx(styles.date, {
          [styles.selected]: selectedPicker === "date",
        })}
        onClick={() => setSelectedPicker("date")}
      >
        {currentDate}
      </div>
      <span>/</span>
      <div
        className={cx(styles.year, {
          [styles.selected]: selectedPicker === "year",
        })}
        onClick={() => setSelectedPicker("year")}
      >
        {currentYear}
      </div>
    </div>
  )
}

export default DatePicker
