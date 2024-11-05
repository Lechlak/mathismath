import { Inter } from 'next/font/google'
import './globals.css'
import '../utilities/fontawesome'; // This line imports your fontawesome config
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Math is Math',
  description: 'This is an INCREDIBLE math app showing that math is math. :) ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}