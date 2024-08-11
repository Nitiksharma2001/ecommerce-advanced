import moment from 'moment'
import { DateType } from '../components/calendar/main'

export const months = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
}
export const getDates = (currentMonth: moment.Moment) => {
  const nextMonth = moment(currentMonth).add(1, 'months')
  const lastMonth = moment(currentMonth).subtract(1, 'month')

  const currentMonthFirstDateDay = currentMonth.startOf('month').day()
  const lastMonthLastDate = lastMonth.endOf('month').date()
  const updated_calendar: DateType[] = []
  for (let i = 0; i < currentMonthFirstDateDay; i++) {
    const temp_date = lastMonthLastDate - (currentMonthFirstDateDay - i) + 1
    updated_calendar.push({
      date: temp_date,
      js_date: lastMonth,
    })
  }
  const totalDaysFitCurrentMonth = Math.min(
    currentMonth.daysInMonth(),
    35 - currentMonthFirstDateDay
  )

  for (let i = 1; i <= totalDaysFitCurrentMonth; i++) {
    updated_calendar.push({
      date: i,
      js_date: currentMonth,
    })
  }

  const nextMonthDatesInCalendar =
    35 - totalDaysFitCurrentMonth - currentMonthFirstDateDay
  for (let i = 1; i <= nextMonthDatesInCalendar; i++) {
    updated_calendar.push({
      date: i,
      js_date: nextMonth,
    })
  }
  return {
    updated_calendar,
    lastMonth,
    nextMonth,
  }
}
