import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const posRef = useRef({ dotX: -100, dotY: -100, ringX: -100, ringY: -100 })
  const targetRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef(null)
  const hoveredRef = useRef(false)

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t

    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = (e) => {
      hoveredRef.current = true
      dotRef.current?.classList.add('hover')
      ringRef.current?.classList.add('hover')
      const text = e.currentTarget.dataset.cursorText
      if (text) {
        ringRef.current?.classList.add('hover-text')
        const textSpan = document.getElementById('cursor-text-inner')
        if (textSpan) textSpan.innerText = text
      }
    }
    const onLeave = () => {
      hoveredRef.current = false
      dotRef.current?.classList.remove('hover')
      ringRef.current?.classList.remove('hover')
      ringRef.current?.classList.remove('hover-text')
      const textSpan = document.getElementById('cursor-text-inner')
      if (textSpan) textSpan.innerText = ''
    }
    const onPress = () => {
      ringRef.current?.classList.add('press')
    }
    const onRelease = () => {
      ringRef.current?.classList.remove('press')
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mousedown', onPress)
    document.addEventListener('mouseup', onRelease)

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    const t = setTimeout(addHoverListeners, 200)

    const tick = () => {
      // Dot follows immediately
      posRef.current.dotX = lerp(posRef.current.dotX, targetRef.current.x, 0.95)
      posRef.current.dotY = lerp(posRef.current.dotY, targetRef.current.y, 0.95)

      // Ring follows with lag (luxury feel)
      posRef.current.ringX = lerp(posRef.current.ringX, targetRef.current.x, 0.12)
      posRef.current.ringY = lerp(posRef.current.ringY, targetRef.current.y, 0.12)

      if (dotRef.current) {
        dotRef.current.style.left = posRef.current.dotX + 'px'
        dotRef.current.style.top = posRef.current.dotY + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = posRef.current.ringX + 'px'
        ringRef.current.style.top = posRef.current.ringY + 'px'
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      clearTimeout(t)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onPress)
      document.removeEventListener('mouseup', onRelease)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span id="cursor-text-inner" className="cursor-text-inner" />
      </div>
    </>
  )
}
