import './globals.css'
import { JetBrains_Mono } from 'next/font/google'

const jetBrains = JetBrains_Mono({ subsets: ['latin'] })
import Providers from './Providers'
export const metadata = {
  title: 'Chat GPT playground',
  description: 'Chat GPT playground',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={jetBrains.className}>
        <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-neutral-900">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  )
}
