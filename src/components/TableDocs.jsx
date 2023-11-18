import { Table, Button } from 'flowbite-react';

const TableDocs = ({ type, documents, setDocuments }) => {

  const deleteDoc = (doc) => {
    const result = documents.filter((d) => d.number !== doc.number);
    setDocuments(result);
  }

  switch (type) {
    case 'FACT':
      return (
        <Table>
          <Table.Head>
            <Table.HeadCell>Fecha</Table.HeadCell>
            <Table.HeadCell>Numero</Table.HeadCell>
            <Table.HeadCell>Total</Table.HeadCell>
            <Table.HeadCell>Observaciones</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {documents.map((doc, index) => (
              <Table.Row key={index} className="bg-white">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  {doc.date}
                </Table.Cell>
                <Table.Cell>{doc.number}</Table.Cell>
                <Table.Cell>$ {doc.amount}</Table.Cell>
                <Table.Cell>{doc.description}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => deleteDoc(doc)} pill color="failure" size="sm" className='font-bold p-0'>
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
            <Table.HeadCell>Fecha</Table.HeadCell>
            <Table.HeadCell>Numero</Table.HeadCell>
            <Table.HeadCell>Cod Prod</Table.HeadCell>
            <Table.HeadCell>descripcion</Table.HeadCell>
            <Table.HeadCell>Total</Table.HeadCell>
            <Table.HeadCell>Observaciones</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {documents.map((doc, index) => (
              <Table.Row key={index} className="bg-white">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  {doc.date}
                </Table.Cell>
                <Table.Cell>{doc.number}</Table.Cell>
                <Table.Cell>{doc.codProd}</Table.Cell>
                <Table.Cell>{doc.descProd}</Table.Cell>
                <Table.Cell>$ {doc.amount}</Table.Cell>
                <Table.Cell>{doc.description}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => deleteDoc(doc)} pill color="failure" size="sm" className='font-bold p-0'>
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
            <Table.HeadCell>Fecha Pago</Table.HeadCell>
            <Table.HeadCell>Numero</Table.HeadCell>
            <Table.HeadCell>Banco</Table.HeadCell>
            <Table.HeadCell>Total</Table.HeadCell>
            <Table.HeadCell>Es Echeq</Table.HeadCell>
            <Table.HeadCell>Observaciones</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {documents.map((doc, index) => (
              <Table.Row key={index} className="bg-white">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  {doc.payDate}
                </Table.Cell>
                <Table.Cell>{doc.number}</Table.Cell>
                <Table.Cell>{doc.bank}</Table.Cell>
                <Table.Cell>$ {doc.amount}</Table.Cell>
                <Table.Cell>{doc.echeq ? 'TRUE' : 'FALSE'}</Table.Cell>
                <Table.Cell>{doc.description}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => deleteDoc(doc)} pill color="failure" size="sm" className='font-bold p-0'>
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
            <Table.HeadCell>Fecha</Table.HeadCell>
            <Table.HeadCell>Banco</Table.HeadCell>
            <Table.HeadCell>Total</Table.HeadCell>
            <Table.HeadCell>Observaciones</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {documents.map((doc, index) => (
              <Table.Row key={index} className="bg-white">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  {doc.date}
                </Table.Cell>
                <Table.Cell>{doc.bank}</Table.Cell>
                <Table.Cell>$ {doc.amount}</Table.Cell>
                <Table.Cell>{doc.description}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => deleteDoc(doc)} pill color="failure" size="sm" className='font-bold p-0'>
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
