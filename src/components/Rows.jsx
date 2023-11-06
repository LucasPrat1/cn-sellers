
const RowPayment = ({ pay }) => {
  return (
    <li key={pay._id} className="flex justify-between gap-x-6 p-2 bg-gray-100 hover:bg-gray-200 rounded">
      <div className="flex min-w-0 gap-x-4">
        <p className="text-sm font-semibold leading-6 text-gray-900">{pay.date.slice(0, 10)}</p>
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{pay.client.code + ' - ' + pay.client.name}</p>
          {pay.documents.map((doc) => (
            <p key={doc._id} className="mt-1 truncate text-xs leading-5 text-gray-500">FAC {doc.number + ' - ' + doc.date.slice(0, 10) + ' - $' + doc.amount}</p>
          ))}
          {pay.devols && pay.devols?.map((devol) => (
            <p key={devol._id} className="mt-1 truncate text-xs leading-5 text-gray-500">Credit Note: $ {devol.amount}</p>
          ))}
        </div>
      </div>

      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 font-semibold text-gray-900">TOTAL: ${pay.total} </p>
        <p className="text-sm leading-6 font-semibold text-gray-900">Discount: {pay.discount}%</p>
        <p className="mt-1 text-xs leading-5 text-gray-500">Cash: $ {pay.cash}</p>
        <p className="mt-1 text-xs leading-5 text-gray-500">Pay in Account: ${pay.payAccount}</p>
        {pay.transfers && pay.transfers?.map((tran) => (
          <p key={tran._id} className="mt-1 truncate text-xs leading-5 text-gray-500">Transfer: $ {tran.amount}</p>
        ))}
        {pay.cheques && pay.cheques.map((ch) => (
          <p key={ch._id} className="mt-1 truncate text-xs leading-5 text-gray-500">Cheque {ch.number} $ {ch.amount}</p>
        ))}
      </div>
    </li>
  )
}

const RowClient = ({ client }) => {
  return (
    <li key={client._id} className="flex justify-between gap-x-6 py-2 px-5 bg-gray-100 hover:bg-gray-200 rounded">
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
  )
}

export { RowClient, RowPayment }