'use client';

import { Button, Label, Modal, TextInput, Checkbox } from 'flowbite-react';
import { useState } from 'react';


const AddCheque = ({ showAddCheque, setShowAddCheque, setCheques, cheques }) => {
  const [number, setNumber] = useState(0);
  const [payDate, setPayDate] = useState('');
  const [amount, setAmount] = useState(0);
  const [echeq, setEcheq] = useState(false);
  const [bank, setBank] = useState('')
  const [description, setDescription] = useState('');


  if (!showAddCheque) {
    return null
  }

  const onCloseModal = () => {
    setShowAddCheque(false);
    setNumber(0);
    setPayDate('');
    setAmount(0);
    setEcheq(false);
    setBank('');
    setDescription('');
  }

  const submitCheque = (event) => {
    event.preventDefault();
    setCheques([...cheques, {
      number,
      payDate,
      amount,
      echeq,
      bank,
      description
    }])
    onCloseModal();
  }

  return (
    <Modal show={showAddCheque} size="md" onClose={onCloseModal} popup>
      <Modal.Header className='bg-gray-600'>
        <h3 className="text-xl text-gray-100">Registrar Cheque</h3>
      </Modal.Header>
      <Modal.Body>
        <form className="mt-2 space-y-2" onSubmit={submitCheque}>
          <div>
            <Label htmlFor="payDate" value="Pay Date" />
            <TextInput
              id="payDate"
              type='date'
              value={payDate}
              onChange={(event) => setPayDate(event.target.value)}
              min={(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]}
              max={(new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]}
              required
            />
          </div>

          <div>
            <Label htmlFor="number" value="Cheque Number" />
            <TextInput
              id="number"
              type='number'
              value={Number(number)}
              onChange={(event) => setNumber(Number(event.target.value))}
              required
              min={1}
              max={99999999}
            />
          </div>

          <div>
            <Label htmlFor="bank" value="Bank" />
            <TextInput
              id="bank"
              value={bank}
              onChange={(event) => setBank(event.target.value)}
              required
              maxLength={50}
            />
          </div>

          <div>
            <Label htmlFor="amount" value="Amount" />
            <TextInput
              id="amount"
              type='number'
              value={Number(amount)}
              onChange={(event) => setAmount(Number(event.target.value))}
              required
              min={1}
            />
          </div>

          <div>
            <Label htmlFor="description" value="Observaciones" />
            <TextInput
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              maxLength={300}
            />
          </div>

          <div>
            <Checkbox
              id='echeq'
              onChange={(event) => setEcheq(event.target.checked)}
            />
            <Label className='ml-4' htmlFor="echeq" value="Es Echeq?" />
          </div>

          <Button type='submit'>confirm</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddCheque
