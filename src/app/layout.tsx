import Secure from '@modules/components/Secure'
import './globals.css'
import { Inter } from 'next/font/google'

//Prime react
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
        

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'X3',
  description: 'Gerenciamento condominial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
        <body className={inter.className}>
          <Secure>
            {children}
          </Secure>
        </body>
    </html>
  )
}
