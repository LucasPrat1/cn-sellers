import '../../globals.css'

export default function Layout({ children }) {
  return (
    <>
      <div className="mb-2 mx-2 pb-2 border-b-2">
        <h1 className='text-2xl font-medium mb-1'>Mis Clientes</h1>
        <p className='text-sm text-gray-700'>
          Aqui puede ver la lista de todos sus clientes
        </p>
      </div>
      {children}
    </>
  )
}