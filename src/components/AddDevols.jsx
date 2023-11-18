
'use client';

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';

export default function AddDevols({ showAddDevols, setShowAddDevols, setDevols, devols }) {
  const [date, setDate] = useState('');
  const [num, setNum] = useState(0);
  const [total, setTotal] = useState(0);
  const [descripcion, setDescripcion] = useState('');
  const [codProd, setCodProd] = useState('');
  const [descProd, setDescProd] = useState('');


  if (!showAddDevols) {
    return null
  }

  const onCloseModal = () => {
    setShowAddDevols(false);
    setDate('');
    setDescripcion('');
    setNum(0);
    setTotal(0);
    setCodProd('');
    setDescProd('');
  }

  const onClick = () => {
    setDevols([...devols, {
      number: num,
      date: date,
      amount: total,
      description: descripcion,
      codProd: codProd,
      descProd: descProd
    }])
    onCloseModal();
  }

  return (
    <Modal show={showAddDevols} size="md" onClose={onCloseModal} popup>
      <Modal.Header className='bg-gray-600'>
        <h3 className="text-xl text-gray-100">Agregar Devoluciones</h3>
      </Modal.Header>
      <Modal.Body>
        <div className="mt-2 space-y-4">
          <div>
            <Label htmlFor="date" value="Date" />
            <TextInput
              id="date"
              type='date'
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="num" value="Number Document" />
            <TextInput
              id="num"
              type='number'
              value={num}
              onChange={(event) => setNum(event.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="codProd" value="Product Code" />
            <TextInput
              id="codProd"
              value={codProd}
              onChange={(event) => setCodProd(event.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="descProd" value="Product Description" />
            <TextInput
              id="descProd"
              value={descProd}
              onChange={(event) => setDescProd(event.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="total" value="Total" />
            <TextInput
              id="total"
              type='number'
              value={total}
              onChange={(event) => setTotal(event.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="descripcion" value="Observaciones" />
            <TextInput
              id="descripcion"
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
            />
          </div>

          <div className="w-full">
            <Button onClick={() => onClick()}>Confirmar</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
