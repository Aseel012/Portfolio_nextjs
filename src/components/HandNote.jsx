export default function HandNote({ children, className = '' }) {
  return (
    <span className={`font-hand -rotate-2 font-medium text-hand transition-transform duration-300 hover:rotate-0 ${className}`}>
      {children}
    </span>
  )
}
