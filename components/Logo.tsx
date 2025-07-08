// components/Logo.tsx
export default function Logo({ className = '' }: { className?: string }) {
    return (
      <svg 
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-auto h-10 ${className}`}
      >
        <text x="0" y="40" fontFamily="'Bosch Display', sans-serif" fontSize="48" fill="#111">
            Bea & Margot
            </text>
      </svg>
    )
  }