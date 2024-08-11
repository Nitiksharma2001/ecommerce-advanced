import { Link } from 'react-router-dom'
import { FaCalendar, FaCartArrowDown } from 'react-icons/fa'
import { FaMusic } from 'react-icons/fa6'
import { useContext, useState } from 'react'
import type { UserContextType } from '../../hooks/context'
import { UserContext } from '../../hooks/context'
import Calendar from '../calendar/main'

export default function Navbar({
  changeRightSidebarOpen,
}: {
  changeRightSidebarOpen: () => void
}) {
  const { user, updateUser } = useContext(UserContext) as UserContextType
  const [showCalender, setShowCalendar] = useState(false)
  return (
    <>
      <div className='flex-1'>
        <Link to='/' className='btn btn-ghost text-xl'>
          Ecommerce
        </Link>
      </div>
      <div className='flex-none'>
        <div className='dropdown dropdown-end'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle' onClick={() => setShowCalendar(!showCalender)}>
            <div className='indicator text-2xl text-green-600'>
              <FaCalendar />
            </div>
          </div>
          {showCalender && <div className='absolute z-10 w-80 -right-32'>
            <Calendar/>
          </div>}
        </div>
        <Link to='/music' className='dropdown dropdown-end'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
            <div className='indicator text-2xl text-red-600'>
              <FaMusic />
            </div>
          </div>
        </Link>
        <div
          tabIndex={0}
          role='button'
          className='btn btn-ghost btn-circle'
          onClick={changeRightSidebarOpen}
        >
          <div className='indicator text-2xl text-blue-600'>
            <FaCartArrowDown />
          </div>
        </div>

        <div className='dropdown dropdown-end'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle avatar'
          >
            <div className='w-10 rounded-full'>
              <img alt='Tailwind CSS Navbar component' src={user?.image} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            <li>
              {/* <Link to='/profile' className='justify-between'>
                Profile
                <span className='badge'>New</span>
              </Link> */}
            </li>
            <li
              onClick={() => {
                updateUser(undefined)
                window.location.reload()
              }}
            >
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
