import '../../globals.css'

export default function Layout({ children }) {
  return (
    <>
      <div className="mb-2 mx-2 pb-2 border-b-2">
        <h1 className='text-2xl font-medium mb-1'>Register New Payment</h1>
        <p className='text-sm text-gray-700'>
          Complete el siguiente formulario para registrar un pago
        </p>
      </div>
      {children}
    </>
  )
}