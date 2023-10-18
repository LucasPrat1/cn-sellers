import SessionAuthProvider from '@/context/SessionAuthProvider'
import './globals.css'

export const metadata = {
  title: 'Comercial Nevada',
  description: 'Sellers Area',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionAuthProvider>
          {children}
        </SessionAuthProvider>
      </body>
    </html>
  )
}
