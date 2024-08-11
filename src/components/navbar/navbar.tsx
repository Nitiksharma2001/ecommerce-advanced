import { Link } from 'react-router-dom'
import { FaCartArrowDown } from 'react-icons/fa'
import { FaMusic } from 'react-icons/fa6'
import { useContext } from 'react'
import type { UserContextType } from '../../hooks/context'
import { UserContext } from '../../hooks/context'

export default function Navbar({
  changeRightSidebarOpen,
}: {
  changeRightSidebarOpen: () => void
}) {
  const { user, updateUser } = useContext(UserContext) as UserContextType
  return (
    <>
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Ecommerce
        </Link>
      </div>
      <div className="flex-none">
        <Link to="/music" className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator text-2xl text-red-600">
              <FaMusic />
            </div>
          </div>
        </Link>
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle"
          onClick={changeRightSidebarOpen}
        >
          <div className="indicator text-2xl text-blue-600">
            <FaCartArrowDown />
          </div>
        </div>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={user?.image} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
