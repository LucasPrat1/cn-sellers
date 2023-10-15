import '../globals.css'
import Navbar from '../components/navbar/Navbar'
import CurrentUser from '../components/CurrentUser'

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
        <section className='container mx-auto p-4 bg-white rounded shadow'>
          {children}
        </section>
      </main>
    </>
  )
}