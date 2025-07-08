import './globals.css'
import { IBM_Plex_Mono, Inter, PT_Serif } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Playfair_Display } from 'next/font/google'

const display = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '700'],
})

const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})

const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  // weight: ['500', '700', '800'], // optional
})

const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})

export const metadata = {
  title: 'Bea & Margot',
  description: 'A lifestyle blog by Bea & Margot',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable} ${serif.variable} ${display.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}