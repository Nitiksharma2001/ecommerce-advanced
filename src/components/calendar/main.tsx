import moment from 'moment'
import { useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { getDates, months } from '../../helpers/calendar'

export interface DateType {
  date: number
  js_date: moment.Moment
}

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(moment())
  const {updated_calendar, lastMonth, nextMonth} = getDates(currentMonth)
  
  return (
    <>
        <div className='md:p-8 p-5 dark:bg-gray-800 bg-white border-2 border-blue-200 rounded-2xl'>
          <div className='px-4 flex items-center justify-between'>
            <span
              tabIndex={0}
              className='focus:outline-none text-base font-bold dark:text-gray-100 text-gray-800'
            >
              {moment(currentMonth).format('DD MMMM YYYY')}
            </span>
            <div className='flex items-center'>
              <button
                aria-label='calendar backward'
                onClick={() => setCurrentMonth(moment(currentMonth).subtract(1, 'months'))}
                className='focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100 text-2xl'
              >
                <MdKeyboardArrowLeft />
              </button>
              <button
                aria-label='calendar forward'
                onClick={() => setCurrentMonth(moment(currentMonth).add(1, 'months'))}
                className='focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100 text-2xl'
              >
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>
          <div className='pt-12'>
            <div className='grid grid-cols-7'>
              {Object.entries(months).map(([key, value]) => (
                <div className='w-full flex justify-center' key={key}>
                  <p className='text-base font-medium text-center text-gray-800 dark:text-gray-100'>
                    {value.substring(0, 2)}
                  </p>
                </div>
              ))}
            </div>
            <div className='grid grid-cols-7'>
              {updated_calendar.map((date, i) => (
                <div className='pt-6' key={i}>
                  <div className={`p-2 rounded-full hover:bg-red-300 
                    ${date.date === moment().date() && date.js_date.year() === moment().year() && date.js_date.month() === moment().month() && 'bg-blue-600'}
                    cursor-pointer flex w-full justify-center`}>
                    <p
                      className={`${date.js_date === currentMonth && 'text-gray-600'} 
                        ${date.js_date === lastMonth && 'text-gray-400'} 
                        ${date.js_date === nextMonth && 'text-gray-400'}
                        ${date.date === moment().date() && date.js_date.year() === moment().year() && date.js_date.month() === moment().month() && 'text-white'}
                       dark:text-gray-100 font-medium`}
                    >
                      {date.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </>
  )
}
