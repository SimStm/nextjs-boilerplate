import React, { useRef, useEffect, FC } from 'react'

const AudioPlayer: FC<any> = (props) => {
  const audioRef = useRef<any>(null)

  useEffect(() => {
    if (audioRef) audioRef.current.volume = 0.2
  }, [audioRef])

  useEffect(() => {
    if (props.play) {
      playAudio()
    }
  }, [props.play])

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const handleAudioEnded = () => {
    // Call the callback function when the audio ends
    if (props.onFinish) {
      props.onFinish()
    }
  }

  return (
    <div style={{ display: 'none' }}>
      <audio ref={audioRef} controls onEnded={handleAudioEnded}>
        <source src={props.src} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

export default AudioPlayer
