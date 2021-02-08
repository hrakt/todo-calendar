import { arrayOf } from "prop-types"
import React, { useEffect } from "react"
import styles from "./Year.module.scss"
import cx from "classnames"

const Year = ({ currentYear, setCurrentYear }) => {
  const updateYear = year => {
    setCurrentYear(year)
  }

  const returnYears = year => {
    let yearArr = []
    for (let i = year - 3; i <= year + 3; i++) {
      yearArr.push(
        <div
          className={cx(styles.year, { [styles.selected]: i === year })}
          onClick={() => updateYear(i)}
        >
          {i}
        </div>
      )
    }

    return yearArr
  }

  return <div className={styles.container}>{returnYears(currentYear)}</div>
}

export default Year
