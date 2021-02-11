import React, { useState, useEffect } from "react"

import DayPicker from "../DayPicker/DayPicker"
import Year from "../Year/Year"

import DatePicker from "../DatePicker"

import MonthPicker from "../MonthPicker/MonthPicker"

import { monthsArr, daysOfWeek } from "../dataObjects"

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState() // current month
  const [currentDate, setCurrentDate] = useState() // curent date 1-31
  const [currentDay, setCurrentDay] = useState("") // current day
  const [currentYear, setYear] = useState() // current year
  const [todaysDate] = useState(new Date())

  useEffect(() => {
    var dd = todaysDate.getDay() // Sunaday is 0
    var mm = todaysDate.getMonth() //January is 0!
    var yyyy = todaysDate.getFullYear()

    setCurrentDate(todaysDate.getDate())
    setCurrentDay(dd)
    setYear(yyyy)
    setCurrentMonth(monthsArr[mm])
  }, [])

  return (
    <React.Fragment>
      {currentMonth && (
        <DatePicker
          currentDate={currentDate}
          currentYear={currentYear}
          currentMonth={currentMonth}
        />
      )}
      <Year currentYear={currentYear} setCurrentYear={setYear} />
      <MonthPicker
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      {currentMonth && (
        <DayPicker
          // setCurrentDate={setCurrentDate}
          days={daysOfWeek}
          currentDate={currentDate}
          currentMonth={currentMonth}
          currentDay={currentDay}
          currentYear={currentYear}
        />
      )}
    </React.Fragment>
  )
}

export default Calendar
