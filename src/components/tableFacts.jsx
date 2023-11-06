import { Table, Button } from 'flowbite-react';

const TableFacts = ({ documents, setDocuments }) => {

  const deleteDoc = (doc) => {
    const result = documents.filter((d) => d.number !== doc.number);
    setDocuments(result);
  }

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
            <Table.Cell>{doc.amount}</Table.Cell>
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
}

export default TableFacts
