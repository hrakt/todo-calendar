import React, { useEffect } from "react"
import styles from "./DatePicker.module.scss"

const DatePicker = ({ currentDate, currentMonth, currentYear }) => {
  return (
    currentMonth &&
    currentDate &&
    currentYear && (
      <div className={styles.container}>
        <div className={styles.month}>{currentMonth.index}</div>
        <span>/</span>
        <div className={styles.date}>{currentDate}</div>
        <span>/</span>
        <div className={styles.year}>{currentYear}</div>
      </div>
    )
  )
}

export default DatePicker
