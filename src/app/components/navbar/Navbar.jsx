import '../../globals.css'
import Image from 'next/image'
import Link from 'next/link'
import ButtonLogin from './ButtonLogin'


const Navbar = () => {
  return (
    <header className="bg-white">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative flex h-16 items-center justify-between">

          {/* <!-- Mobile menu button--> */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400
                  hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:justify-around">
            <div className="flex flex-shrink-0 items-center">
              <Link href={'/'}>
                <Image src={'/logo.png'} height={40} width={150} alt='Comercial Nevada' />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link href={"/seller"} className='text-gray-300 hover:bg-gray-700 hover:text-white focus:bg-gray-500 focus:text-black rounded-md px-3 py-2 text-sm font-medium'>Home</Link>
                <Link href={"/seller/myClients"} className='text-gray-300 hover:bg-gray-700 hover:text-white focus:bg-gray-500 focus:text-black rounded-md px-3 py-2 text-sm font-medium'>My Clients</Link>
                <Link href={"/seller/myPayments"} className='text-gray-300 hover:bg-gray-700 hover:text-white focus:bg-gray-500 focus:text-black rounded-md px-3 py-2 text-sm font-medium'>My Payments</Link>
              </div>
            </div>
            <ButtonLogin />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar