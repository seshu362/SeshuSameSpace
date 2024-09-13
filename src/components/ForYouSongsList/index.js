import {useState, useEffect} from 'react'

import './index.css'

const ForYouSongsList = props => {
  const {songDetails, getActiveSong, isActive} = props
  const {id, url, artist, name, cover} = songDetails

  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = new Audio(url)
    audio.onloadedmetadata = () => setDuration(audio.duration)
  }, [url])

  const seconds = Math.floor(duration)
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60

  const logo = `https://cms.samespace.com/assets/${cover}`

  const onClickActiveSong = () => {
    getActiveSong(songDetails, id)
  }

  const activeSongClassName = isActive
    ? 'for-you-active-for-you-list-button'
    : ''

  return (
    <li className="your-song-list">
      <button
        className={`for-you-list-button ${activeSongClassName}`}
        type="button"
        onClick={onClickActiveSong}
      >
        <div className="song-detils-first-container">
          <img src={logo} alt={name} className="song-logo" />
          <div className="song-artist-container">
            <p className="song-name">{name}</p>
            <p className="aritst-name">{artist}</p>
          </div>
        </div>
        <p className="duration-text">
          {min}:{sec}
        </p>
      </button>
    </li>
  )
}

export default ForYouSongsList
