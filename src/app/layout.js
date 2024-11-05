import { Inter } from 'next/font/google'
import './globals.css'
// Remove these imports:
// import { config, library } from '@fortawesome/fontawesome-svg-core';
// import '@fortawesome/fontawesome-svg-core/styles.css';
import '../utilities/fontawesome'; // This line imports your fontawesome config

// Remove this line:
// config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] })

// ... rest of your layout.js file

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