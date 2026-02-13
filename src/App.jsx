import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import BackgroundMusic from './components/BackgroundMusic.jsx'

// Sound effect utilities
const playClickSound = () => {
  const audio = new Audio(`${import.meta.env.BASE_URL}clicking/0211 (1).mov`)
  audio.volume = 0.5
  audio.play().catch(() => {})
}

const playBubbleSound = () => {
  const audio = new Audio(`${import.meta.env.BASE_URL}bubble/0211 (1)(1).mov`)
  audio.volume = 0.6
  audio.play().catch(() => {})
}

const playNoClickSounds = () => {
  playClickSound()
  setTimeout(() => playBubbleSound(), 100) // Bubble sound slightly after click
}

const VALENTINE_FONTS = [
  '"Indie Flower", cursive',
  '"Pacifico", cursive',
  '"Dancing Script", cursive',
  '"Great Vibes", cursive',
  '"Lobster", cursive',
  '"Satisfy", cursive',
  '"Courgette", cursive',
  '"Kaushan Script", cursive',
  '"Patrick Hand", cursive',
  '"Permanent Marker", cursive',
  '"Chewy", cursive',
  '"Fredoka One", cursive',
]

const VALENTINE_PHRASES = [
  'Will you be my Valentine?',
  'Be my Valentine?',
  "Say you'll be mine?",
  'Will you be mine?',
  'Be mine? 💕',
  'My Valentine?',
  'You and me?',
  'Will you be my Valentine?',
]

const PLEADING_MESSAGES = [
  'Please? 🥺',
  "I'll tell everyone you said no 😤",
  "My mom already likes you!",
  'Pretty please with a cherry on top!',
  "I practiced asking in the mirror 😭",
  "You're breaking my heart 💔",
  'I made this website for YOU!',
  "I'll learn to cook, I promise!",
  'My pet already loves you!',
  'PLEASE SAY YES 😭😭😭',
  "I'll share my fries with you 🍟",
  'YES YES YES!!!',
  "I've been single for too long 😩",
  'I beg you on my knees!',
  'Say yes or I cry forever',
  "I'll watch your boring shows!",
  'You know you want to 😏',
  'Click. The. Red. Button.',
  'Y E S (it stands for You Excellent Soul)',
  "Fine, I'll just keep asking 🙃",
  "My therapist said to shoot my shot 💀",
  "I already told my friends you said yes...",
  "Don't make this awkward 😬",
  "I'll delete your browser history 👀",
  'EMERGENCY: SAY YES NOW',
  "I'm literally begging here 🧎",
  'My heart can\'t take this 💔💔💔',
  "Plot twist: you say YES",
  "I promise I'm normal (mostly)",
  "Why are you like this 😭",
  "Just one little yes, pleeeease",
  "I'll carry your bags forever!",
]

const PLEADING_DRIFT_NAMES = ['pleading-drift-1', 'pleading-drift-2', 'pleading-drift-3', 'pleading-drift-4']

// Fixed grid positions around the card - evenly distributed, no overlaps
const BUBBLE_POSITIONS = [
  // Top row
  { left: 8, top: 6 }, { left: 25, top: 4 }, { left: 50, top: 3 }, { left: 75, top: 4 }, { left: 92, top: 6 },
  // Upper sides
  { left: 4, top: 22 }, { left: 96, top: 22 },
  // Middle sides  
  { left: 3, top: 42 }, { left: 97, top: 42 },
  { left: 4, top: 58 }, { left: 96, top: 58 },
  // Lower sides
  { left: 4, top: 75 }, { left: 96, top: 75 },
  // Bottom row
  { left: 8, top: 92 }, { left: 25, top: 94 }, { left: 50, top: 95 }, { left: 75, top: 94 }, { left: 92, top: 92 },
]

const PLACEHOLDER_LETTER = `For: The Crowned Queen of Our Kingdom, Diana Muratova.

Before you start reading this, take a deep breath. Look at me.

Over a year ago, I handed you a letter filled with a "new language" I was just starting to learn—the language of trying to figure you out from a distance. I was a guy standing outside a tightly closed door, praying you would let me in.

Today, reading that old letter feels like looking at two different people. We aren't those two hesitant kids navigating the Shenzhen subways anymore. You let me in, you gave me the key, and you let me make a home inside your heart.

To start this off, I want to say something important: I am sorry.

I know this isn't the grand, sweeping Valentine's Day you might have dreamed of. I know you deserve the entire world handed to you on a silver platter. But please, Diana, know this: I am trying my absolute best to make something you can remember. Everything I do, every step I take, is to build a future for us. I promise you, I will be successful, I will be rich, and I will give you the life and the happiness that a true Princess deserves. Your patience with me is the greatest gift I have ever received.

Let's look back at the guy who wrote that first letter. Remember him? The guy who completely lost his mind and sat on his floor for hours because of a heart emoji? The guy who got an asthma attack on Wutong Mountain just because he was terrified of losing sight of you?

Looking back, that Leonardo was terrified. I was so used to being alone, so used to people leaving, that I was waiting for the universe to take you away from me before we even started.

But you didn't leave. You stayed.

These are the things I've learned about you after loving you for more than a year:

1. You are no longer "cold." You are the warmest, safest place I know in this entire world.

2. That "fake smile" I saw at the bus stand? I haven't seen it in months. I only get the real, unfiltered, beautifully messy Diana now.

3. You still eat sushi like a baby, but now, watching you eat it is my absolute favorite tradition.

4. You don't have to act strong until it hurts anymore. Because now, when you are exhausted or in pain, you finally let me take care of you. You don't have to carry the weight of your future on your shoulders alone anymore. I am here to carry it with you.

5. You still have those four different types of smiles, but I now know exactly which one means you're genuinely happy, and which one means you're plotting something mischievous.

6. You healed my inner child, and you continue to do it every single day. > "For a brief moment, I feel like we have the whole world for myself."

I wrote that about our time coming down the mountain last year. Now, I feel that way every time I look at you. I feel that way every time we go to get food, every time you laugh, and every time we are just sitting together in silence.

We've had our moments, our ups and downs. But the difference between now and a year ago is that I am no longer scared you will walk away. You proved to me that love isn't just about the butterflies on a beach in Dameisha; it's about choosing each other every single day.

I used to look for every possible excuse just to accidentally bump into you in the dorm room. Now, I get to hold you whenever I want. It feels like a dream I never have to wake up from. I am still just as addicted to your presence as I was on day one.

I still watch you when you don't realize it.

I watch how your eyes still spark when you see flowers. I watch how you still do stupid, funny things when you walk, just to make me smile. I watch how you navigate this world, and I am constantly in awe of the woman you are becoming.

You are an independent woman, but you will always be my baby girl.

If you ever reach this part of the letter, then...

Hai.

It's me again.

Matthew.

You might've been asking yourself a year ago:

Does this guy love me?
Is he serious?
Is it okay for me to open my heart to him?

I told you back then I wouldn't answer it. I told you to figure it out for yourself.

But today, looking at you after more than a year together, I will answer it for you.

Yes. I love you crazily, deeply, and unconditionally.

Yes. I am more serious about you than I have ever been about anything in my life.

And I hope, with every fiber of my being, that opening your heart to me was the best decision you ever made.

Because you choosing me was the best thing that ever happened to me. You fused everything together. You gave my life a beautiful, profound meaning.

Thank you for surviving this past year with me. Thank you for choosing me. I promise you, the beautiful future I am building for us will be worth it.

Happy Anniversary, and Happy Valentine's Day, my love.

Regards,
Leonardo Matthew`

const IOS_LOVE_EMOJIS = [
  '❤️', '💕', '💗', '💖', '💘', '💝', '💓', '💞', '💟', '❣️', '🩷', '🩵', '🤍', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤎',
  '💋', '💌', '💐', '🌹', '🌸', '🏵️', '🌺',
]
const FLOWER_EMOJIS = new Set(['💋', '💌', '💐', '🌹', '🌸', '🏵️', '🌺'])

const FLOAT_EMOJI_COUNT = 72
const SPAWN_EDGES = ['top', 'bottom', 'left', 'right']

// Pictures from /pictures - rain on sides of letter in success phase (JPG/PNG for browser support)
const PICTURE_FILES = [
  '24e0d9d417a66cc6068cb4b1f2035804.JPG',
  '25b2b66aa07ac1fce0189c142eb62070.JPG',
  '305d55a5f2af161c49b0740ae579bcc4.JPG',
  '34e11dc013d98876ab09829df5fb98bc.JPG',
  '372824edee42e5af15e03105ac125bc6.JPG',
  '3f3a23f470709ad2dc5d26473ccd6c9e.JPG',
  '481be416e35886d1b9cef0e22f22f22f.JPG',
  '5a8a2557a4ec7cc0437e2014bb06c67e.JPG',
  '8c6a350a137ecc279d33d6e06cc04d49.JPG',
  '9d7384a4d78a769e33f2ce3c5f8dff83.JPG',
  '9e469b2d1075895364de9b1ed45c9c96.JPG',
  'a5b1322bc22e10859f6ea4b8a97057ac.JPG',
  'a857e316a5ea06feb593503802505a6d.JPG',
  'a92e7758598b8ec81651a5fba8a6892a.JPG',
  'b0859243d67f94c119053aed9ce89392.JPG',
  'b8bc7d2689c9050bd7c8749a32b3aec6.JPG',
  'be56a9335d77b974c07e7b9e94f3bfde.JPG',
  'bfff88e2c1aedff3827308b7a212c2e9.JPG',
  'f6cd9bba13b7c23762972ee80064a848.JPG',
  'IMG_0324.JPG',
  'IMG_1791.PNG',
  'IMG_3505.JPG',
  'IMG_3506.JPG',
  'IMG_3721.PNG',
  'IMG_3727.JPG',
  'IMG_3870.jpg',
  'IMG_3959.jpg',
  'IMG_4019.jpg',
  'IMG_4038.jpg',
  'IMG_4222.JPG',
  'IMG_5020.jpg',
  'IMG_5270.jpg',
  'IMG_5305.jpg',
  'IMG_5306.jpg',
  'IMG_5320.jpg',
  'IMG_5389.JPG',
  'IMG_5390.JPG',
  'IMG_5391.jpg',
  'IMG_5392.jpg',
  'IMG_5399.jpg',
  'IMG_5421.jpg',
  'IMG_5431.PNG',
  'IMG_5477.PNG',
  'Weixin Image_20260210184710_1205_8.jpg',
  'Weixin Image_20260210184717_1206_8.jpg',
  'Weixin Image_20260210184720_1207_8.jpg',
  'Weixin Image_20260210184727_1208_8.jpg',
  'Weixin Image_20260210184735_1211_8.jpg',
  'Weixin Image_20260210184742_1212_8.jpg',
  'Weixin Image_20260211150759_1251_8.jpg',
]
const PICTURE_DROP_DURATION_MIN = 35
const PICTURE_DROP_DURATION_MAX = 50
// Left side: 10-20%, Right side: 80-90% (keep within screen, avoid center where letter is)
const LEFT_SIDE = { min: 10, max: 20 }
const RIGHT_SIDE = { min: 80, max: 90 }

const PICTURES_PER_SIDE = 1

function pickDifferentPicture(current, exclude) {
  const available = PICTURE_FILES.filter((f) => f !== current && f !== exclude)
  if (available.length === 0) return PICTURE_FILES[0]
  return available[Math.floor(Math.random() * available.length)]
}

function createPictureRainDrops() {
  const duration = (PICTURE_DROP_DURATION_MIN + PICTURE_DROP_DURATION_MAX) / 2
  const staggerRatio = 0.75
  const rightDelay = -duration * staggerRatio
  const drops = [
    { id: 0, side: 'left', delay: 0 },
    { id: 1, side: 'right', delay: rightDelay },
  ]
  return drops.map(({ id, side, delay }) => {
    const zone = side === 'left' ? LEFT_SIDE : RIGHT_SIDE
    const left = zone.min + Math.random() * (zone.max - zone.min)
    const size = 168 + Math.random() * 120
    return {
      id,
      side,
      left,
      duration,
      delay,
      size,
    }
  })
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function createEmojiRainDrops() {
  const pool = []
  IOS_LOVE_EMOJIS.forEach((emoji) => {
    for (let n = 0; n < 3; n++) pool.push({ emoji, size: 'big' })
    for (let n = 0; n < 2; n++) pool.push({ emoji, size: 'small' })
  })
  const shuffled = shuffle(pool).slice(0, FLOAT_EMOJI_COUNT)
  return shuffled.map(({ emoji, size }, i) => {
    const duration = 42 + Math.random() * 60
    const isFlower = FLOWER_EMOJIS.has(emoji)
    const edge = SPAWN_EDGES[Math.floor(Math.random() * SPAWN_EDGES.length)]
    let left = 50
    let top = 50
    if (edge === 'top') {
      left = Math.random() * 100
      top = 0
    } else if (edge === 'bottom') {
      left = Math.random() * 100
      top = 100
    } else if (edge === 'left') {
      left = 0
      top = Math.random() * 100
    } else {
      left = 100
      top = Math.random() * 100
    }
    let fontSize
    if (size === 'big') {
      fontSize = isFlower ? 75 + Math.random() * 90 : 150 + Math.random() * 240
    } else {
      fontSize = isFlower ? 42 + Math.random() * 30 : 60 + Math.random() * 52.5
    }
    return {
      id: i,
      emoji,
      left,
      top,
      duration,
      delay: -(Math.random() * duration),
      fontSize,
      animation: `emoji-spawn-${edge}`,
    }
  })
}

// Track used positions to avoid overlaps
let usedPositions = []

function getNextBubblePosition() {
  // Find positions not currently in use
  const available = BUBBLE_POSITIONS.filter((_, i) => !usedPositions.includes(i))
  
  // If all used, reset
  if (available.length === 0) {
    usedPositions = []
    const idx = Math.floor(Math.random() * BUBBLE_POSITIONS.length)
    usedPositions.push(idx)
    const pos = BUBBLE_POSITIONS[idx]
    return { left: `${pos.left}%`, top: `${pos.top}%` }
  }
  
  // Pick random available position
  const availableIdx = Math.floor(Math.random() * available.length)
  const actualIdx = BUBBLE_POSITIONS.indexOf(available[availableIdx])
  usedPositions.push(actualIdx)
  
  const pos = available[availableIdx]
  return { left: `${pos.left}%`, top: `${pos.top}%` }
}

function parsePercent(str) {
  if (typeof str === 'number') return str
  const s = String(str).replace('%', '')
  const n = parseFloat(s, 10)
  return Number.isFinite(n) ? n : 50
}

const BUBBLE_MIN_DISTANCE = 6

// Generate position in a specific zone around the center card
// CARD SAFE ZONE (never place bubbles here): x: 28-72%, y: 20-80%
// Bubbles go in the ring AROUND this safe zone, staying within screen bounds
function getPleadingBubblePositionForZone(zone, existingBubbles, newPositionsSoFar) {
  const existing = [
    ...existingBubbles.map((b) => ({ left: parsePercent(b.left), top: parsePercent(b.top) })),
    ...newPositionsSoFar,
  ]
  const dist = (x1, y1, x2, y2) => Math.hypot(x1 - x2, y1 - y2)
  let left, top
  let tries = 0
  const maxTries = 50
  
  // Get position for specific zone - each zone is clearly outside the card
  const getPositionForZone = (z) => {
    switch (z) {
      case 0: // Above card (y: 2-18%, x: 8-75%)
        return { left: 8 + Math.random() * 67, top: 2 + Math.random() * 16 }
      case 1: // Below card (y: 75-88%, x: 15-70%) - moved closer to center
        return { left: 15 + Math.random() * 55, top: 75 + Math.random() * 13 }
      case 2: // Left of card (x: 2-26%, y: 15-85%)
        return { left: 2 + Math.random() * 24, top: 15 + Math.random() * 70 }
      case 3: // Right of card (x: 52-70%, y: 15-85%) - moved closer to center
        return { left: 52 + Math.random() * 18, top: 15 + Math.random() * 70 }
      default:
        return { left: 10, top: 10 }
    }
  }
  
  do {
    const pos = getPositionForZone(zone)
    left = pos.left
    top = pos.top
    // Verify we're not in the card safe zone (x: 28-72%, y: 20-80%)
    const inSafeZone = left > 28 && left < 72 && top > 20 && top < 80
    const tooClose = existing.some((p) => dist(left, top, p.left, p.top) < BUBBLE_MIN_DISTANCE)
    if (!tooClose && !inSafeZone) break
    tries++
  } while (tries < maxTries)
  
  return { left: `${left}%`, top: `${top}%` }
}

const TITLE_CYCLE_MS = 200
const TITLE_FONTS = VALENTINE_FONTS.slice(0, 5)

// Fixed positions for the No button - always visible, never behind Yes
// These are around the card but avoid the center where Yes is
const NO_BUTTON_POSITIONS = [
  { left: 15, top: 35 },   // Upper left
  { left: 85, top: 35 },   // Upper right
  { left: 15, top: 65 },   // Lower left
  { left: 85, top: 65 },   // Lower right
  { left: 50, top: 20 },   // Top center
  { left: 50, top: 85 },   // Bottom center
  { left: 10, top: 50 },   // Left center
  { left: 90, top: 50 },   // Right center
]

export default function App() {
  const [phase, setPhase] = useState('intro')
  const [noClickCount, setNoClickCount] = useState(0)
  const [yesButtonMultiplier, setYesButtonMultiplier] = useState(1)
  const emojiRainDrops = useMemo(() => createEmojiRainDrops(), [])
  const pictureRainDrops = useMemo(() => createPictureRainDrops(), [])
  const [floatingBubbles, setFloatingBubbles] = useState([])
  const [noButtonPosition, setNoButtonPosition] = useState(null)
  const [volume, setVolume] = useState(80)
  const [valentineTextIndex, setValentineTextIndex] = useState(0)
  const [isMusicPlaying, setIsMusicPlaying] = useState(true)
  const [pictureRain, setPictureRain] = useState({ left: PICTURE_FILES[0], right: PICTURE_FILES[1] })

  useEffect(() => {
    if (phase === 'success') {
      const shuffled = shuffle([...PICTURE_FILES])
      setPictureRain({ left: shuffled[0], right: shuffled[1] })
    }
  }, [phase])

  const handlePictureCycle = useCallback((side) => {
    setPictureRain((prev) => ({
      ...prev,
      [side]: pickDifferentPicture(prev[side], prev[side === 'left' ? 'right' : 'left']),
    }))
  }, [])

  useEffect(() => {
    if (phase !== 'success') return
    const durationMs = ((PICTURE_DROP_DURATION_MIN + PICTURE_DROP_DURATION_MAX) / 2) * 1000
    const quarterMs = durationMs / 4
    let tick = 0
    const id = setInterval(() => {
      tick++
      if (tick % 4 === 2) handlePictureCycle('right')
      else if (tick % 4 === 3) handlePictureCycle('left')
    }, quarterMs)
    return () => clearInterval(id)
  }, [phase, handlePictureCycle])

  useEffect(() => {
    const htmlEl = document.documentElement
    const bodyEl = document.body
    const previousHtmlOverflow = htmlEl.style.overflow
    const previousBodyOverflow = bodyEl.style.overflow
    htmlEl.style.overflow = 'hidden'
    bodyEl.style.overflow = 'hidden'
    return () => {
      htmlEl.style.overflow = previousHtmlOverflow
      bodyEl.style.overflow = previousBodyOverflow
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'asking') return
    const id = setInterval(() => {
      setValentineTextIndex((i) => i + 1)
    }, TITLE_CYCLE_MS)
    return () => clearInterval(id)
  }, [phase])

  const handleNoClick = useCallback(() => {
    if (noClickCount >= 5) return
    playNoClickSounds() // Play click + bubble sounds
    const nextCount = noClickCount + 1
    setNoClickCount(nextCount)
    setYesButtonMultiplier((m) => m * 1.3)
    
    // Add 16 bubbles per click (4 per zone: top, bottom, left, right), with increasing scale
    const kept = floatingBubbles.slice(-64)
    const newBubbles = []
    const BUBBLES_PER_ZONE = 4 // 4 zones x 4 bubbles = 16 total
    const scale = Math.pow(1.25, nextCount) // Increases by 25% each stage (1.25, 1.56, 1.95, 2.44, 3.05)
    const shuffledMessages = shuffle([...PLEADING_MESSAGES])
    
    // Distribute evenly: 4 bubbles per zone (top=0, bottom=1, left=2, right=3)
    let bubbleIndex = 0
    for (let zone = 0; zone < 4; zone++) {
      for (let i = 0; i < BUBBLES_PER_ZONE; i++) {
        const pos = getPleadingBubblePositionForZone(
          zone,
          kept,
          newBubbles.map((b) => ({ left: parsePercent(b.left), top: parsePercent(b.top) }))
        )
        newBubbles.push({
          id: Date.now() + Math.random() + bubbleIndex,
          text: shuffledMessages[bubbleIndex % shuffledMessages.length],
          ...pos,
          staggerMs: bubbleIndex * 60,
          scale,
          driftName: PLEADING_DRIFT_NAMES[Math.floor(Math.random() * PLEADING_DRIFT_NAMES.length)],
          driftDuration: 55 + Math.random() * 40,
        })
        bubbleIndex++
      }
    }
    
    setFloatingBubbles((bubbles) => [...bubbles.slice(-64), ...newBubbles])
    // Pick a random position from fixed positions that are always clickable
    const pos = NO_BUTTON_POSITIONS[Math.floor(Math.random() * NO_BUTTON_POSITIONS.length)]
    setNoButtonPosition({
      left: `${pos.left}%`,
      top: `${pos.top}%`,
    })
  }, [noClickCount, floatingBubbles])

  const handleYesClick = useCallback(() => {
    playClickSound() // Play click sound
    setPhase('success')
  }, [])

  const handleIntroContinue = useCallback(() => {
    playClickSound() // Play click sound
    setPhase('asking')
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-pastel-cycle">
      <BackgroundMusic 
        volume={volume} 
        isPlaying={isMusicPlaying}
      />
      
      {/* Music Control Panel - Fixed at bottom right */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-2xl border-2 border-rose-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
        <button
          type="button"
          onClick={() => setIsMusicPlaying(!isMusicPlaying)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-white shadow-md transition hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400"
          aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
        >
          {isMusicPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-pink-600">🔊</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="h-2 w-24 cursor-pointer accent-rose-500"
            title={`Volume ${volume}%`}
            aria-label="Volume"
          />
          <span className="w-8 text-xs text-pink-600 tabular-nums">{volume}%</span>
        </div>
      </div>

      {/* Floating love emojis – reduced motion respected via CSS */}
      <div className="emoji-float-layer pointer-events-none fixed inset-0 z-[5]" aria-hidden="true">
        {emojiRainDrops.map((drop) => (
          <span
            key={drop.id}
            className="emoji-float"
            style={{
              left: `${drop.left}%`,
              top: `${drop.top}%`,
              fontSize: `${drop.fontSize}px`,
              animationName: drop.animation,
              animationDuration: `${drop.duration}s`,
              animationDelay: `${drop.delay}s`,
              animationIterationCount: 'infinite',
            }}
          >
            {drop.emoji}
          </span>
        ))}
      </div>

      {/* Picture rain – outside scroll container so it isn't clipped */}
      {phase === 'success' && (
        <div className="pointer-events-none fixed inset-0 z-[8] overflow-hidden" aria-hidden="true">
          {pictureRainDrops.map((drop) => (
            <img
              key={drop.id}
              src={`${import.meta.env.BASE_URL}pictures/${encodeURIComponent(pictureRain[drop.side])}`}
              alt=""
              className="picture-rain-drop"
              style={{
                left: `${drop.left}%`,
                top: 0,
                width: `${drop.size}px`,
                height: 'auto',
                animation: 'picture-drop',
                animationDuration: `${drop.duration}s`,
                animationDelay: `${drop.delay}s`,
                animationIterationCount: 'infinite',
              }}
            />
          ))}
        </div>
      )}

      {/* Floating pleading bubbles */}
      {phase === 'asking' &&
        floatingBubbles.map((b) => (
          <div
            key={b.id}
            className="pleading-bubble absolute z-20 rounded-xl border-2 border-rose-300 bg-white/95 font-bold shadow-lg"
            style={{
              left: b.left,
              top: b.top,
              animation: `fadeIn 0.5s ease-out forwards, ${b.driftName || 'pleading-drift-1'} ${b.driftDuration || 60}s ease-in-out 0.5s infinite`,
              animationDelay: `${b.staggerMs ?? 0}ms, ${(b.staggerMs ?? 0) + 500}ms`,
              fontSize: `${b.scale ?? 1}rem`,
              padding: `${0.5 * (b.scale ?? 1)}rem ${0.75 * (b.scale ?? 1)}rem`,
            }}
          >
            {b.text}
          </div>
        ))}

      <div
        className={`relative z-20 ${phase === 'success' ? 'h-screen overflow-y-auto' : 'min-h-screen overflow-hidden'}`}
        style={phase !== 'success' ? { perspective: '1000px' } : undefined}
      >
      {phase === 'intro' ? (
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-4">
          <div className="animate-card-in w-full max-w-md shrink-0 rounded-2xl border-2 border-rose-200 bg-white/90 px-6 py-6 shadow-xl backdrop-blur sm:px-8 sm:py-8">
            <p className="mb-6 text-center text-lg text-pink-800 sm:text-xl">
              I have something to ask you…
            </p>
            <button
              type="button"
              onClick={handleIntroContinue}
              className="min-h-[44px] w-full rounded-xl bg-rose-500 px-6 py-3 font-bold text-white shadow-lg transition hover:scale-[1.02] hover:bg-rose-600 hover:shadow-rose-300/50 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
            >
              Tell me
            </button>
          </div>
        </div>
      ) : phase === 'asking' ? (
        <>
          {/* Center card with entrance */}
          <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-4">
            <div className="animate-card-in w-full max-w-md shrink-0 rounded-2xl border-2 border-rose-200 bg-white/90 px-6 py-6 shadow-xl backdrop-blur sm:px-8 sm:py-8">
              <h1
                className="mb-2 text-center text-2xl font-bold text-pink-900 sm:text-3xl"
                style={{
                  fontFamily: TITLE_FONTS[valentineTextIndex % TITLE_FONTS.length],
                }}
              >
                {VALENTINE_PHRASES[valentineTextIndex % VALENTINE_PHRASES.length]}
              </h1>
              <p className="mb-8 text-center text-pink-700">I&apos;ve been thinking about you 💕</p>
              <div className="relative flex min-h-[80px] flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleYesClick}
                  className="yes-btn min-h-[44px] rounded-xl bg-rose-500 px-6 py-3 font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-rose-600 hover:shadow-xl hover:shadow-rose-300/40 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
                  style={{
                    fontSize: `${1.25 * yesButtonMultiplier}rem`,
                    padding: `${0.75 * yesButtonMultiplier}rem ${1.5 * yesButtonMultiplier}rem`,
                    zIndex: 30,
                  }}
                >
                  Yes
                </button>
                {noClickCount < 5 ? (
                  <button
                    type="button"
                    onClick={handleNoClick}
                    className="min-h-[44px] rounded-xl border-2 border-rose-300 bg-white px-6 py-3 font-medium text-pink-800 transition hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
                    style={
                      noButtonPosition
                        ? {
                            position: 'absolute',
                            left: noButtonPosition.left,
                            top: noButtonPosition.top,
                            transform: 'translate(-50%, -50%)',
                            zIndex: 35,
                          }
                        : {}
                    }
                  >
                    No
                  </button>
                ) : (
                  <p className="text-center text-sm font-medium text-pink-600">
                    There&apos;s only Yes now 💕
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Success phase */
        <div className="relative z-10 min-h-screen px-4 py-8 pt-12">
            <h2 className="mb-8 animate-fade-in text-center text-3xl font-bold text-pink-900 sm:text-4xl">
              Yay! I love you! 💖
            </h2>

            {/* Love letter */}
          <div className="mx-auto mb-10 max-w-2xl rounded-2xl border-2 border-amber-200 bg-amber-50/90 p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-bold text-pink-900">A letter for you</h3>
            <div className="text-pink-900/90">
              {PLACEHOLDER_LETTER.split('\n\n').map((p, i) => (
                <p key={i} className="mb-4 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
