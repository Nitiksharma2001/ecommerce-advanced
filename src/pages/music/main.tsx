import { useState } from 'react'
import MusicPlayerControlBar from '../../components/music_controller/music_player_controller'
import MusicSidebar from '../../components/sidebar/music_sidebar'
import songs from '../../assets/songs.json'
import type { SongType } from '../../types/songs'

export default function Music() {
  const [currentSong, setCurrentSong] = useState<SongType>(songs[0])

  const updateCurrentSong = (song: SongType) => {
    setCurrentSong(song)
  }
  return (
    <main className="bg-gray-100">
      <div className="drawer absolute top-0 z-10">
        <MusicSidebar updateCurrentSong={updateCurrentSong} />
      </div>
      <div className="p-4 flex flex-col justify-center items-center h-screen gap-4">
        <span className="text-2xl text-center font-bold text-blue-600"> Listen to Some Amazing Songs</span>
        <MusicPlayerControlBar songDetails={currentSong} />
      </div>
    </main>
  )
}
