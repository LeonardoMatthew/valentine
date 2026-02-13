import { useEffect, useRef, useState } from 'react'

// Song options - put your MP3 files in the public folder
const SONG_OPTIONS = [
  { file: `${import.meta.env.BASE_URL}music/POV_ you are falling in love - Love & Chill Vibes [XHjxj78AYc0].mp3`, name: 'Love & Chill Vibes' },
]

export default function BackgroundMusic({ volume = 100, isPlaying = true, currentSongIndex = 0 }) {
  const audioRef = useRef(null)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Handle first user interaction (required by browsers)
  useEffect(() => {
    if (hasInteracted) return
    
    const onFirstInteraction = () => {
      setHasInteracted(true)
      const audio = audioRef.current
      if (audio && isPlaying) {
        audio.play().catch(e => console.warn('Autoplay blocked:', e))
      }
    }
    
    document.addEventListener('click', onFirstInteraction)
    document.addEventListener('touchstart', onFirstInteraction)
    document.addEventListener('keydown', onFirstInteraction)
    
    return () => {
      document.removeEventListener('click', onFirstInteraction)
      document.removeEventListener('touchstart', onFirstInteraction)
      document.removeEventListener('keydown', onFirstInteraction)
    }
  }, [hasInteracted, isPlaying])

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !hasInteracted) return
    
    if (isPlaying) {
      audio.play().catch(e => console.warn('Play failed:', e))
    } else {
      audio.pause()
    }
  }, [isPlaying, hasInteracted])

  // Sync volume (0-100 to 0-1)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume / 100
  }, [volume])

  // Change song
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    
    const songFile = SONG_OPTIONS[currentSongIndex]?.file || SONG_OPTIONS[0].file
    if (audio.src !== songFile) {
      audio.src = songFile
      if (hasInteracted && isPlaying) {
        audio.play().catch(e => console.warn('Play failed:', e))
      }
    }
  }, [currentSongIndex, hasInteracted, isPlaying])

  return (
    <audio
      ref={audioRef}
      src={SONG_OPTIONS[currentSongIndex]?.file || SONG_OPTIONS[0].file}
      loop
      preload="auto"
      className="hidden"
    />
  )
}

export { SONG_OPTIONS }
