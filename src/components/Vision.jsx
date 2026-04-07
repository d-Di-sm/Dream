import { publicImage } from '../assetUrl'

export default function Vision() {
  return (
    <section className="vision" id="vision">
      <div className="vision-meta">
        <span className="label">01 / Vision</span>
        <div className="rule" />
      </div>

      <div className="vision-grid">
        <h2 className="vision-heading">
          We don't build<br />
          visuals.<br />
          We build<br />
          perception.
        </h2>

        <div className="vision-right">
          <div className="vision-divider" />
          <p className="vision-text">
            DREAM is not just a studio. It is a platform for spatial intelligence —
            where architecture meets computation, and experience becomes the medium.
          </p>
          <p className="vision-text">
            We build immersive environments that dissolve the boundary between
            the physical and the imagined. Our work lives at the intersection
            of precision and poetry.
          </p>
        </div>
      </div>

      <img
        className="vision-image"
        src={publicImage('04.jpg')}
        alt="Architectural project — terracotta building with rooftop pool"
      />
      <p className="vision-bottom-label">Architecture  ·  Technology  ·  Storytelling</p>
    </section>
  )
}
