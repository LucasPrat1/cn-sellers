import { Table, Button } from 'flowbite-react';

const TableDocs = ({ type, documents, setDocuments }) => {

  const check =
    <svg className="w-6 h-6 text-gray-800" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
      <path fill="rgb(4 108 78)" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z" />
      <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z" />
    </svg>

  const deleteDoc = (doc) => {
    const result = documents.filter((d) => d.number !== doc.number);
    setDocuments(result);
  }

  switch (type) {
    case 'FACT':
      return (
        <Table>
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Number</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
            <Table.HeadCell className="hidden sm:table-cell">Observations</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {documents.map((doc, index) => (
              <Table.Row key={index} className="bg-white text-xs sm:text-sm">
                <Table.Cell className="whitespace-nowrap">{doc.date}</Table.Cell>
                <Table.Cell>{doc.number}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">$ {doc.amount}</Table.Cell>
                <Table.Cell className="hidden sm:table-cell">{doc.description}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => deleteDoc(doc)} pill color="failure" className='font-bold w-6 md:w-8 h-6 md:h-8'>
                    X
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )
    case 'DEVOL':
      return (
        <Table>
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Number</Table.HeadCell>
            <Table.HeadCell className="hidden sm:table-cell">Cod Prod</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
            <Table.HeadCell className="hidden lg:table-cell">Observations</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {documents.map((doc, index) => (
              <Table.Row key={index} className="bg-white text-xs sm:text-sm">
                <Table.Cell className="whitespace-nowrap">{doc.date}</Table.Cell>
                <Table.Cell>{doc.number}</Table.Cell>
                <Table.Cell className="hidden sm:table-cell">{doc.codProd}</Table.Cell>
                <Table.Cell>{doc.descProd}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">$ {doc.amount}</Table.Cell>
                <Table.Cell className="hidden lg:table-cell">{doc.description}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => deleteDoc(doc)} pill color="failure" className='font-bold w-6 md:w-8 h-6 md:h-8'>
                    X
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )
    case 'CHEQUE':
      return (
        <Table>
          <Table.Head>
            <Table.HeadCell>Pay Date</Table.HeadCell>
            <Table.HeadCell>Number</Table.HeadCell>
            <Table.HeadCell className="hidden md:table-cell">Bank</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
            <Table.HeadCell className="hidden sm:table-cell">Echeq</Table.HeadCell>
            <Table.HeadCell className="hidden lg:table-cell">Observations</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {documents.map((doc, index) => (
              <Table.Row key={index} className="bg-white text-xs sm:text-sm">
                <Table.Cell className="whitespace-nowrap">{doc.payDate}</Table.Cell>
                <Table.Cell>{doc.number}</Table.Cell>
                <Table.Cell className="hidden md:table-cell">{doc.bank}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">$ {doc.amount}</Table.Cell>
                <Table.Cell className="hidden sm:table-cell">{doc.echeq && check}</Table.Cell>
                <Table.Cell className="hidden lg:table-cell">{doc.description}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => deleteDoc(doc)} pill color="failure" className='font-bold w-6 md:w-8 h-6 md:h-8'>
                    X
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )
    case 'TRANSFER':
      return (
        <Table>
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Bank</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
            <Table.HeadCell className="hidden sm:table-cell">Observations</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {documents.map((doc, index) => (
              <Table.Row key={index} className="bg-white text-xs sm:text-sm">
                <Table.Cell className="whitespace-nowrap">{doc.date}</Table.Cell>
                <Table.Cell>{doc.bank}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">$ {doc.amount}</Table.Cell>
                <Table.Cell className="hidden sm:table-cell">{doc.description}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => deleteDoc(doc)} pill color="failure" className='font-bold w-6 md:w-8 h-6 md:h-8'>
                    X
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )

    default:
      break;
  }

}

export default TableDocs
