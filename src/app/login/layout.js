import '../globals.css'
import Link from 'next/link'
import Image from 'next/image'

export default function Layout({ children }) {
  return (
    <section className='flex min-h-full flex-1 flex-col justify-between items-center px-6 py-10 lg:px-8 '>
        <Link href={'/'}>
          <Image src={'/logo.png'} height={40} width={150} alt='Comercial Nevada' />
        </Link>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h1 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Iniciar sesión</h1>
        {children}
      </div>
      <div className='text-center'>
        <p><strong>Bienvenido al área de vendedores de Comercial Nevada</strong></p>
        <p><small>Si no posee usuario y contraseña comuníquese con su gerente</small></p>
      </div>
    </section>
  )
}
