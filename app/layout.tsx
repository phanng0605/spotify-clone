import { Figtree } from 'next/font/google'

import getSongsByUserID from '@/actions/getSongByUserID'
// import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'
import Player from '@/components/Player'
import Sidebar from '@/components/Sidebar'
import ToasterProvider from '@/providers/ToasterProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import SupabaseProvider from '@/providers/SupabaseProvider'
import {Song} from '@/types'
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'
// import Player from '@/components/Player'

import './globals.css'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'SPOTIFAN',
  description: 'Listen to music!',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const products = await getActiveProductsWithPrices();
  const userSongs = await getSongsByUserID();
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products = {products}/>
            <Sidebar songs = {userSongs}>
              {children}
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}