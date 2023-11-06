import '../../globals.css'
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <>
      <div className="flex justify-between items-center mb-2 mx-2 pb-2 border-b-2">
        <div>
          <h1 className='text-2xl font-medium mb-1'>Mis Pagos</h1>
          <p className='text-sm text-gray-700'>
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