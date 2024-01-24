
import 'remixicon/fonts/remixicon.css'
import Nav from '@/Components/Nav/Nav'
import './globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from '@/Components/Wrapper/Wrapper';
import NextTopLoader from 'nextjs-toploader';




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Wrapper>
        <NextTopLoader />
        {/* <Nav/> */}
        {children}
        <ToastContainer />
        </Wrapper>
     
        </body>
    </html>
  )
}
