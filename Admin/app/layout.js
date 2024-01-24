
import Wrapper from '@/Components/Wrapper/Wrapper'
import './globals.css'

import 'remixicon/fonts/remixicon.css'
import NextTopLoader from 'nextjs-toploader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const metadata = {
  title : "Home"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Wrapper>
        <NextTopLoader />
          {children}
          <ToastContainer />
          </Wrapper>
       
        </body>
    </html>
  )
}
