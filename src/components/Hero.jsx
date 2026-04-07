import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { publicImage } from '../assetUrl'

const COVER_MARGIN = 1.12

/** Plane size (world units) so texture maps without stretch — like CSS object-fit: cover. */
function useCoverPlaneSize(texture) {
  const { viewport } = useThree()
  return useMemo(() => {
    const img = texture.image
    const iw = img?.naturalWidth || img?.width || 1
    const ih = img?.naturalHeight || img?.height || 1
    const imgAspect = iw / ih
    const vw = viewport.width * COVER_MARGIN
    const vh = viewport.height * COVER_MARGIN
    const viewAspect = vw / vh
    if (imgAspect > viewAspect) {
      const h = vh
      return [h * imgAspect, h]
    }
    const w = vw
    return [w, w / imgAspect]
  }, [texture, viewport.width, viewport.height])
}

function HeroScene() {
  const texture = useTexture(publicImage('01.jpg'))
  const [w, h] = useCoverPlaneSize(texture)
  const meshRef = useRef()

  useFrame(({ mouse }) => {
    if (!meshRef.current) return
    // Subtle parallax follow on mouse move
    meshRef.current.position.x +=
      (mouse.x * 0.14 - meshRef.current.position.x) * 0.04
    meshRef.current.position.y +=
      (mouse.y * 0.10 - meshRef.current.position.y) * 0.04
  })

  return (
    <>
      <color attach="background" args={['#0D1A13']} />
      <mesh ref={meshRef}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={texture} transparent opacity={0.42} />
      </mesh>
    </>
  )
}

export default function Hero() {
  return (
    <section className="hero">
      {/* ── R3F canvas: atmospheric background ── */}
      <div className="hero-canvas">
        <Canvas>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Vignette overlay (CSS gradient) ── */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* ── Navigation ── */}
      <nav className="hero-nav">
        <a href="#" className="hero-nav-logo">DREAM</a>
        <span className="hero-nav-links">Practice  ·  Work  ·  Contact</span>
        <button className="hamburger" aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* ── Center content ── */}
      <div className="hero-content">
        <div className="hero-rule" />
        <h1 className="hero-title">DREAM</h1>
        <p className="hero-tagline">BEYOND  VISUALIZATION</p>
        <p className="hero-desc">
          We design spatial experiences at the intersection of architecture,
          technology, and sensorial storytelling.
        </p>
        <a href="#vision" className="hero-cta">EXPLORE</a>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-scroll" aria-hidden="true" />
    </section>
  )
}
