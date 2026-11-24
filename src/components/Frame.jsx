export default function Frame({ src, alt = '' }) {
  return (
    <div className="overflow-hidden rounded-[20px] border-4 border-frame bg-frame transition-colors duration-300 group-hover:border-line sm:rounded-[28px] sm:border-[6px]">
      <img src={src} alt={alt} loading="lazy" className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]" />
    </div>
  )
}
