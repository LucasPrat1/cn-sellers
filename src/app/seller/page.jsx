
import '../globals.css'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1 className='text-2xl font-medium my-2'>Welcome seller</h1>
      <p className='text-sm text-gray-700'>
        This is your new control panel,
        from here you will be able to carry out all the managements that correspond to you.
      </p>
      <div className='flex gap-4 mt-3'>
        <Link href={'/seller/myClients'}>
          <button className="btn-blue">My Clients</button>
        </Link>
        <Link href={'/seller/myPayments'}>
        <button className="btn-cyan">My Payments</button>
        </Link>
        <Link href={'/seller/newPayment'}>
          <button className="btn-red">Register Payment</button>
        </Link>
      </div>
    </>
  )
}
