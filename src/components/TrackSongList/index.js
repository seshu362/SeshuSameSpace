import {useState, useEffect} from 'react'

import './index.css'

const TrackSongList = props => {
  const {trackSongDetails, getActiveSong, isActive} = props
  const {id, url, artist, name, cover} = trackSongDetails

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
    getActiveSong(trackSongDetails, id)
  }

  const activeSongClassName = isActive ? 'track-active-for-you-list-button' : ''

  return (
    <li className="your-song-list">
      <button
        className={`track-list-button ${activeSongClassName}`}
        type="button"
        onClick={onClickActiveSong}
      >
        <div className="track-song-detils-first-container">
          <img src={logo} alt={name} className="track-song-logo" />
          <div className="track-song-artist-container">
            <p className="track-song-name">{name}</p>
            <p className="track-aritst-name">{artist}</p>
          </div>
        </div>
        <p className="track-duration-text">
          {min}:{sec}
        </p>
      </button>
    </li>
  )
}

export default TrackSongList
