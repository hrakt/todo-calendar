import React from "react"

const Calendar = () => {
  const monthsArr = [
    { name: "January", days: 31 },
    { name: "February", days: 28 },
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November ", days: 30 },
    { name: "December ", days: 31 },
  ]

  return (
    <div>
      {monthsArr.map((month, key) => {
        return <div key={key}>{month.name}</div>
      })}
    </div>
  )
}

export default Calendar
