import { activeConfig } from '@/configs/active'

export default function Gallery() {
  const { gallery } = activeConfig
  if (!gallery || gallery.length === 0) return null
  return (
    <section>
      <div className="wrap">
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: '48px' }}>Our work</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {gallery.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src} alt="" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
          ))}
        </div>
      </div>
    </section>
  )
}
