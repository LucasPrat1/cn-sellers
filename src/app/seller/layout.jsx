
import '../globals.css'
import Navbar from '../../components/Navbar'
import CurrentUser from '../../components/CurrentUser'
import StoreProvider from '@/context/store'


export const metadata = {
  title: 'Comercial Nevada',
  description: 'Sellers Area',
}

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen p-4">
        <CurrentUser />
        <StoreProvider>
          <section className='container mx-auto p-4 bg-white rounded shadow'>
            {children}
          </section>
        </StoreProvider>
      </main>
    </>
  )
}