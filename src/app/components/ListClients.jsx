const fetchClients = async (token) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CN_API_URL}/clients/bySeller`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    const res = await response.json();
    if (res.error) {
      throw res
    }
    return res.data
  } catch (error) {
    console.error(error.message)
    return error
  }
};

export default async function ListClients({ token }) {
  const clients = await fetchClients(token);

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {clients.map((client) => (
        <li key={client._id} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{client.code + ' - ' + client.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{client.email + ' - ' + client.address + ' - ' + client.city}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{client.companyName}</p>
            <p className="mt-1 text-xs leading-5 text-gray-500">{client.cuit}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}