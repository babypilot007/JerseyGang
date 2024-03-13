import React from 'react'
import DateTimePicker from 'react-datetime-picker'

function Date() {

  const [dateValue, onchange] = useState(new Date());

  return (

<DateTimePicker></DateTimePicker>    
  )
}

export default Date