import {FaForwardStep, FaBackwardStep, FaPlay, FaPause} from 'react-icons/fa6'
import {BsThreeDots} from 'react-icons/bs'
import {FaVolumeMute} from 'react-icons/fa'
import {FaVolumeHigh} from 'react-icons/fa6'
import './index.css'
import {useState, useRef, useEffect} from 'react'

const SongPlayingCard = props => {
  const {activeSongPlaying, clickForwardBtn, clickBackwardBtn} = props
  const {artist, url, name, cover} = activeSongPlaying

  const activeImage = `https://cms.samespace.com/assets/${cover}`

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  // Play or pause the audio
  const togglePlayPause = () => {
    const audio = audioRef.current
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Stop the audio
  const stopAudio = () => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = 0
      setIsPlaying(false)
    }
  }

  // Toggle mute
  const toggleMute = () => {
    const audio = audioRef.current
    if (audio) {
      audio.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Update progress bar
  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (audio) {
      const currentTime = audio.currentTime
      if (duration > 0) {
        setProgress((currentTime / duration) * 100)
      }
    }
  }

  // Set duration when metadata is loaded
  const handleLoadedMetadata = () => {
    const audio = audioRef.current
    if (audio) {
      setDuration(audio.duration)
    }
  }

  // Handle song change
  useEffect(() => {
    stopAudio()

    const audio = audioRef.current
    if (audio) {
      audio.src = url
      audio.load()
      setProgress(0)
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(error => console.error('Failed to play the audio:', error))
    }
  }, [url])

  // Attach and clean up event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.addEventListener('loadedmetadata', handleLoadedMetadata)
      audio.addEventListener('timeupdate', handleTimeUpdate)

      if (isPlaying) {
        audio
          .play()
          .catch(error => console.error('Failed to play the audio:', error))
      } else {
        audio.pause()
      }
    }

    return () => {
      if (audio) {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audio.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [isPlaying, url, handleTimeUpdate])

  // Set initial play/pause state on component mount
  useEffect(() => {
    setIsPlaying(false) // Ensure correct initial state
  }, [])

  console.log(isPlaying)

  return (
    <>
      <h1 className="name-heading">{name}</h1>
      <p className="name-artist">{artist}</p>
      <img src={activeImage} className="active-img" alt={name} />
      <div className="audio-container">
        <audio ref={audioRef} className="audio-element" controls>
          <source src={url} type="audio/mp3" />
          <track kind="captions" src="" />

          Your browser does not support the audio element.
        </audio>
        <div className="progress-bar">
          <div className="progress" style={{width: `${progress}%`}} />
        </div>
        <div className="controls-button">
          <button type="button" className="dot-button">
            <BsThreeDots size={25} color="#ffffff" />
          </button>
          <div className="operator-button">
            <button
              type="button"
              className="back-forward-btn"
              onClick={clickBackwardBtn}
              aria-label="Previous"
            >
              <FaBackwardStep size={25} color="#ffffff" />
            </button>
            <button
              type="button"
              className="control-play-pause-btn"
              onClick={togglePlayPause}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <FaPause size={20} color="#000000" />
              ) : (
                <FaPlay size={20} color="#000000" />
              )}
            </button>
            <button
              type="button"
              className="front-forward-btn"
              onClick={clickForwardBtn}
              aria-label="Next"
            >
              <FaForwardStep size={25} color="#ffffff" />
            </button>
          </div>
          <button
            className="volume-btn"
            onClick={toggleMute}
            type="button"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <FaVolumeMute size={20} color="#ffffff" />
            ) : (
              <FaVolumeHigh size={20} color="#ffffff" />
            )}
          </button>
        </div>
      </div>
    </>
  )
}

export default SongPlayingCard
