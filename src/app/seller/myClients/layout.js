import '../../globals.css'

export default function Layout({ children }) {
  return (
    <>
      <h1 className='text-2xl font-medium my-2'>Mis Clientes</h1>
      <p className='text-sm text-gray-700'>
        Aqui puede ver la lista de todos sus clientes
      </p>
      {children}
    </>
  )
}