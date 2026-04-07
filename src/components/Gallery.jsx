import { useEffect, useState } from 'react'
import { publicImage } from '../assetUrl'

const MOBILE_MAX_PX = 768

const PROJECTS = [
  {
    caption: 'OHRUS Auditorium — Monterrey',
    type: 'landscape',
    images: [
      { src: publicImage('ACCESO.jpg'),    alt: 'Reception lobby' },
      { src: publicImage('AUDITORIO.jpg'), alt: 'Auditorium' },
      { src: publicImage('PASILLO.jpg'),   alt: 'Corridor & youth space' },
    ],
    mobileExtraImages: [{ src: publicImage('SOCIAL.jpg'), alt: 'Dream Church — interior view' }],
  },
  {
    caption: 'Residential Projects — Mexico',
    type: 'portrait',
    images: [
      { src: publicImage('05.jpg'), alt: 'Terracotta building exterior' },
      { src: publicImage('06.jpg'), alt: 'Residential interior courtyard' },
      { src: publicImage('08.jpg'), alt: 'Interior living space' },
    ],
    mobileExtraImages: [
      { src: publicImage('07.jpg'), alt: 'Social and community space' },
    ],
  },
]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_PX}px)`)
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return isMobile
}

export default function Gallery() {
  const isMobile = useIsMobile()

  return (
    <section className="gallery" id="gallery">
      <div className="gallery-meta">
        <span className="gallery-label">Selected Works</span>
        <div className="gallery-label-rule" />
      </div>

      {PROJECTS.map(({ caption, type, images, mobileExtraImages }) => {
        const gridImages =
          isMobile && mobileExtraImages?.length
            ? [...images, ...mobileExtraImages]
            : images
        return (
          <div key={caption} className="gallery-project">
            <p className="gallery-caption">{caption}</p>
            <div className={`gallery-grid gallery-grid-${type}`}>
              {gridImages.map(({ src, alt }) => (
                <img
                  key={src}
                  className={`gallery-img-${type}`}
                  src={src}
                  alt={alt}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}
