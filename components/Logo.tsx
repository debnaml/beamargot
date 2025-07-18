export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 60"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-auto h-10 ${className}`}
      role="img"
      aria-label="Bea & Margot"
    >
      <text
        x="0"
        y="45"
        fontFamily="'Bosch Display', sans-serif"
        fontSize="48"
        fill="#111"
      >
        Bea & Margot
      </text>
    </svg>
  )
}