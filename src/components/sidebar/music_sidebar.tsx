import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { IoMdArrowBack } from 'react-icons/io'
import songs from '../../assets/songs.json'
import type { SongType } from '../../types/songs'

export default function MusicSidebar({
  updateCurrentSong,
}: {
  updateCurrentSong: (song: SongType) => void
}) {
  return (
    <>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content space-x-2">
        <Link to="/" className="btn drawer-button text-xl shadow-none">
          <IoMdArrowBack />
        </Link>
        <label htmlFor="my-drawer" className="btn drawer-button text-2xl shadow-none">
          <GiHamburgerMenu />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        >
        </label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 text-2xl justify-center">
          {songs.map(song => (
            <li key={song.id} onClick={() => updateCurrentSong(song)}>
              <a>{song.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
