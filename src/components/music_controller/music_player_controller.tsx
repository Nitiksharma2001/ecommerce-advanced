import { useEffect, useRef, useState } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'

import { IoPlayBack, IoPlayForward } from 'react-icons/io5'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { formatDurationProgressbar } from '../../helpers/text_formatter'
import songs from '../../assets/songs.json'

export default function Audio({ songDetails = songs[0] }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLInputElement>(null)
  // const volumeRef = useRef<HTMLInputElement>(null)

  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoadingSong, setIsLoadingSong] = useState(true)
  const progressIdRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!audioRef.current || !progressRef.current) return

    progressRef.current.value = '0'
    // volumeRef.current.value = '0'
    setIsLoadingSong(true)
    setDuration(0)
    setIsPlaying(false)

    return () => {
      clearInterval(progressIdRef.current)
    }
  }, [songDetails.url])

  const onLoadedMetadata = () => {
    if (!audioRef.current) return
    setDuration(audioRef.current.duration)
    setIsLoadingSong(false)
  }

  const updateProgressBar = (time = 10) => {
    progressIdRef.current = setInterval(() => {
      if (!progressRef.current || !audioRef.current) return
      progressRef.current.value = (
        (audioRef.current.currentTime * 100.0) /
        duration
      ).toString()
    }, time)
  }

  const onProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current || !progressRef.current) return
    progressRef.current.value = e.target.value
    audioRef.current.currentTime = (Number(e.target.value) / 100) * duration
  }

  const changePlayback = () => {
    if (!audioRef.current) return
    setIsPlaying(!isPlaying)
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
  }
  const forBackAudio = (time = 1) => {
    if (!audioRef.current || !progressRef.current) return
    audioRef.current.currentTime += time
    progressRef.current.value = (
      (audioRef.current.currentTime * 100.0) /
      duration
    ).toString()
  }

  // const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!audioRef.current || !volumeRef.current) return
  //   volumeRef.current.value = e.target.value
  //   audioRef.current.volume = Number(e.target.value) / 100
  // }
  return (
    <>
      <audio
        ref={audioRef}
        onPlay={() => updateProgressBar()}
        onPause={() => clearInterval(progressIdRef.current)}
        onLoadedMetadata={onLoadedMetadata}
        src={songDetails.url}
      ></audio>
      <>
        <div className='bg-white p-8 rounded-lg shadow-md w-80'>
          <LazyLoadImage
            effect='blur'
            src={songDetails.artwork}
            className='w-64 h-64 mx-auto rounded-lg mb-4 shadow-lg shadow-teal-50'
          />

          <h2 className='text-xl font-semibold text-center'>
            {songDetails.title}
          </h2>
          <p className='text-gray-600 text-sm text-center'>
            {songDetails.artist}
          </p>
          <div className='mt-6 flex justify-center items-center'>
            <button
              className='p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none'
              onClick={() => forBackAudio(-1)}
            >
              <IoPlayBack />
            </button>
            <button
              className={`p-4 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none mx-4 btn ${
                isLoadingSong && 'btn-disabled'
              }`}
              onClick={changePlayback}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              className='p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none'
              onClick={() => forBackAudio()}
            >
              <IoPlayForward />
            </button>
          </div>
          <div className='mt-6 h-2 rounded-full'>
            <input
              type='range'
              onChange={onProgressChange}
              ref={progressRef}
              className='bg-teal-500 h-2 rounded-full w-full'
              defaultValue={0}
            />
          </div>
          <div className='flex justify-between mt-2 text-sm text-gray-600'>
            <span>0:00</span>
            <span>{formatDurationProgressbar(duration)}</span>
          </div>
        </div>
      </>
    </>
  )
}
