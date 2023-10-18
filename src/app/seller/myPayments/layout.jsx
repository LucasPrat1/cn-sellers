import '../../globals.css'
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <>
      <div className="flex justify-between items-center py-4 px-4">
        <div>
          <h1 className='text-2xl font-medium my-2'>Mis Pagos</h1>
          <p className='text-sm text-gray-700 mb-2'>
            Aqui puede ver sus ultimos 10 pagos registrados.
          </p>
        </div>
        <Link href={'/seller/newPayment'}>
          <button className="btn-red">Register Payment</button>
        </Link>
      </div>
      {children}
    </>
  )
}