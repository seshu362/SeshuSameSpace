import {Component} from 'react'

import ForYouSongsList from './components/ForYouSongsList'
import TrackSongList from './components/TrackSongList'
import SongPlayingCard from './components/SongPlayingCard'

import {LuPanelLeftOpen} from 'react-icons/lu'
import {LuPanelLeftClose} from 'react-icons/lu'
import {IoSearch} from 'react-icons/io5'

import './App.css'

class App extends Component {
  state = {
    songListData: [],
    pannelBtn: true,
    isPannelOpen: false,
    isForYouActive: true,
    isTopTracks: false,
    searchInputValue: '',
    activeSongPlaying: {},
    activeSongId: '',
  }

  componentDidMount() {
    this.getSongListData()
  }

  getSongListData = async () => {
    const response = await fetch('https://cms.samespace.com/items/songs')
    const responseData = await response.json()
    const updatedData = responseData.data.map(eachSong => ({
      id: eachSong.id,
      accent: eachSong.accent,
      artist: eachSong.artist,
      cover: eachSong.cover,
      dateCreated: eachSong.date_created,
      dateUpdated: eachSong.date_updated,
      name: eachSong.name,
      sort: eachSong.sort,
      status: eachSong.status,
      topTrack: eachSong.top_track,
      url: eachSong.url,
      userCreated: eachSong.user_created,
      userUpdated: eachSong.user_updated,
    }))

    this.setState({songListData: updatedData})
    this.setState({activeSongPlaying: updatedData[0]})
    this.setState({activeSongId: updatedData[0].id})

    console.log(updatedData)
  }

  onClickPannelOpenBtn = () => {
    this.setState(prevState => ({pannelBtn: !prevState.pannelBtn}))
    this.setState(prevState => ({isPannelOpen: !prevState.isPannelOpen}))
  }
  onClickClosePannelBtn = () => {
    this.setState(prevState => ({pannelBtn: !prevState.pannelBtn}))
    this.setState(prevState => ({isPannelOpen: !prevState.isPannelOpen}))
  }
  onClickForYouActiveTab = () => {
    this.setState({isForYouActive: true})
    this.setState({isTopTracks: false})
  }
  onClickTopTrackActiveTab = () => {
    this.setState({isForYouActive: false})
    this.setState({isTopTracks: true})
  }

  onChangeSeacrhInput = event => {
    this.setState({searchInputValue: event.target.value})
  }

  getActiveSong = (activeSongData, activeId) => {
    this.setState({activeSongPlaying: activeSongData})
    this.setState({activeSongId: activeId})
  }

  clickBackwardBtn = () => {
    const {songListData, activeSongId, isTopTracks} = this.state

    // Determine which list to use based on the active tab
    const currentSongList = isTopTracks
      ? songListData.filter(song => song.topTrack === true) // Top Tracks list
      : songListData // Full song list

    const currentIndex = currentSongList.findIndex(
      song => song.id === activeSongId,
    )

    // Check if it's not the first song in the list
    if (currentIndex > 0) {
      const previousSong = currentSongList[currentIndex - 1]
      this.setState({
        activeSongPlaying: previousSong,
        activeSongId: previousSong.id,
      })
    } else {
      // If it's the first song, wrap around to the last song
      const lastSong = currentSongList[currentSongList.length - 1]
      this.setState({
        activeSongPlaying: lastSong,
        activeSongId: lastSong.id,
      })
    }
  }

  clickForwardBtn = () => {
    const {songListData, activeSongId, isTopTracks} = this.state

    // Determine which list to use based on the active tab
    const currentSongList = isTopTracks
      ? songListData.filter(song => song.topTrack === true) // Top Tracks list
      : songListData // Full song list

    const currentIndex = currentSongList.findIndex(
      song => song.id === activeSongId,
    )

    // Check if it's not the last song in the list
    if (currentIndex < currentSongList.length - 1) {
      const nextSong = currentSongList[currentIndex + 1]
      this.setState({
        activeSongPlaying: nextSong,
        activeSongId: nextSong.id,
      })
    } else {
      // If it's the last song, wrap around to the first song
      const firstSong = currentSongList[0]
      this.setState({
        activeSongPlaying: firstSong,
        activeSongId: firstSong.id,
      })
    }
  }

  render() {
    const {
      pannelBtn,
      isPannelOpen,
      isForYouActive,
      isTopTracks,
      songListData,
      searchInputValue,
      activeSongPlaying,
      activeSongId,
    } = this.state

    const topTrackSong = songListData.filter(each => each.topTrack === true)
    const activeForYouTab = isForYouActive ? 'active-for-you-btn' : null
    const activeTopTrackTab = isTopTracks ? 'active-top-tracks-btn' : null
    const searchFilteredForYouList = songListData.filter(
      each =>
        each.name.toLowerCase().includes(searchInputValue.toLowerCase()) ||
        each.artist.toLowerCase().includes(searchInputValue.toLowerCase()),
    )

    const searchFilteredTopTrackList = topTrackSong.filter(
      each =>
        each.name
          .toLowerCase()
          .includes(searchInputValue.toLocaleLowerCase()) ||
        each.artist
          .toLocaleLowerCase()
          .includes(searchInputValue.toLocaleLowerCase()),
    )

    return (
      <div
        className="bg-container"
        style={{backgroundColor: activeSongPlaying.accent}}
      >
        <div className="mobile-song-playing-container">
          {pannelBtn && (
            <button
              className="mobile-panel-btn"
              type="button"
              onClick={this.onClickPannelOpenBtn}
            >
              <LuPanelLeftOpen size={50} color="#ffffff" />
            </button>
          )}
          {isPannelOpen && (
            <div className="pannel-home-container">
              <div className="pannel-header">
                <img
                  src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White.png"
                  alt="logo"
                  className="website-logo"
                />
                <button
                  type="button"
                  className="close-pannel-btn"
                  onClick={this.onClickClosePannelBtn}
                >
                  <LuPanelLeftClose size={40} color="#ffffff" />
                </button>
              </div>

              <div className="mobile-view-song-list-container">
                <div className="for-track-btn-container">
                  <button
                    type="button"
                    onClick={this.onClickForYouActiveTab}
                    className={`for-you-btn ${activeForYouTab}`}
                  >
                    For You
                  </button>
                  <button
                    type="button"
                    onClick={this.onClickTopTrackActiveTab}
                    className={`top-tracks-btn ${activeTopTrackTab}`}
                    color="red"
                  >
                    Top Tracks
                  </button>
                </div>
                <div className="search-container">
                  <input
                    type="search"
                    className="search-input"
                    placeholder="Search Song, Artist"
                    value={searchInputValue}
                    onChange={this.onChangeSeacrhInput}
                  />
                  <IoSearch size={25} color="#898d94" className="search-icon" />
                </div>
                {isForYouActive && (
                  <ul className="for-you-song-list-container">
                    {searchFilteredForYouList.map(each => (
                      <ForYouSongsList
                        key={each.id}
                        songDetails={each}
                        getActiveSong={this.getActiveSong}
                        isActive={activeSongId === each.id}
                      />
                    ))}
                  </ul>
                )}
                {isTopTracks && (
                  <ul className="top-track-song-list-container">
                    {searchFilteredTopTrackList.map(eachTrackSong => (
                      <TrackSongList
                        key={eachTrackSong.id}
                        trackSongDetails={eachTrackSong}
                        getActiveSong={this.getActiveSong}
                        isActive={activeSongId === eachTrackSong.id}
                      />
                    ))}
                  </ul>
                )}
                <div className="mobile-profile-logo-container">
                  <img
                    src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1726166919/user_2_ob7j3m.png"
                    alt="profile-logo"
                    className="mobile-profile-logo"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="song-card">
            <SongPlayingCard
              activeSongPlaying={activeSongPlaying}
              clickForwardBtn={this.clickForwardBtn}
              clickBackwardBtn={this.clickBackwardBtn}
            />
          </div>
        </div>
        <div className="desktop-logo-container">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White.png"
            alt="desktop-logo"
            className="desktop-website-logo"
          />
          <img
            src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1726166919/user_2_ob7j3m.png"
            alt="profile-logo"
            className="profile-logo"
          />
        </div>
        <div className="song-list-details-container">
          <div className="for-track-btn-container">
            <button
              type="button"
              onClick={this.onClickForYouActiveTab}
              className={`for-you-btn ${activeForYouTab}`}
            >
              For You
            </button>
            <button
              type="button"
              onClick={this.onClickTopTrackActiveTab}
              className={`top-tracks-btn ${activeTopTrackTab}`}
              color="red"
            >
              Top Tracks
            </button>
          </div>
          <div className="search-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search Song, Artist"
              value={searchInputValue}
              onChange={this.onChangeSeacrhInput}
            />
            <IoSearch size={25} color="#898d94" className="search-icon" />
          </div>
          {isForYouActive && (
            <ul className="for-you-song-list-container">
              {searchFilteredForYouList.map(each => (
                <ForYouSongsList
                  key={each.id}
                  songDetails={each}
                  getActiveSong={this.getActiveSong}
                  isActive={activeSongId === each.id}
                />
              ))}
            </ul>
          )}
          {isTopTracks && (
            <ul className="top-track-song-list-container">
              {searchFilteredTopTrackList.map(eachTrackSong => (
                <TrackSongList
                  key={eachTrackSong.id}
                  trackSongDetails={eachTrackSong}
                  getActiveSong={this.getActiveSong}
                  isActive={activeSongId === eachTrackSong.id}
                />
              ))}
            </ul>
          )}
        </div>
        <div className="desktop-song-playing-container">
          <SongPlayingCard
            activeSongPlaying={activeSongPlaying}
            clickForwardBtn={this.clickForwardBtn}
            clickBackwardBtn={this.clickBackwardBtn}
          />
        </div>
      </div>
    )
  }
}

export default App
