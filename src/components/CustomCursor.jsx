import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', mMove)
      document.addEventListener('mousedown', mDown)
      document.addEventListener('mouseup', mUp)
    }
    const removeEventListeners = () => {
      document.removeEventListener('mousemove', mMove)
      document.removeEventListener('mousedown', mDown)
      document.removeEventListener('mouseup', mUp)
    }

    const mMove = (el) => {
      setPosition({ x: el.clientX, y: el.clientY })
    }
    const mDown = () => setClicked(true)
    const mUp = () => setClicked(false)

    const handleLinkHover = () => setLinkHovered(true)
    const handleLinkLeave = () => setLinkHovered(false)

    // Attach listeners
    addEventListeners()

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .item')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleLinkHover)
      el.addEventListener('mouseleave', handleLinkLeave)
    })

    return () => {
      removeEventListeners()
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkHover)
        el.removeEventListener('mouseleave', handleLinkLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        className={`cursor-dot ${clicked ? 'clicked' : ''} ${linkHovered ? 'hovered' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className={`cursor-outline ${clicked ? 'clicked' : ''} ${linkHovered ? 'hovered' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  )
}
