'use client';

import { Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import { useState } from 'react';


const AddTransfer = ({ showAddTransfer, setShowAddTransfer, setTransfers, transfers }) => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState(0);
  const [bank, setBank] = useState('')
  const [description, setDescription] = useState('');


  if (!showAddTransfer) {
    return null
  }

  const onCloseModal = () => {
    setShowAddTransfer(false);
    setDate('');
    setAmount(0);
    setBank('');
    setDescription('');
  }

  const submitCheque = (event) => {
    event.preventDefault();
    setTransfers([...transfers, {
      number: transfers.length + 1,
      date,
      amount,
      bank,
      description
    }])
    onCloseModal();
  }

  return (
    <Modal show={showAddTransfer} size="md" onClose={onCloseModal} popup>
      <Modal.Header className='bg-gray-600'>
        <h3 className="text-xl text-gray-100">Registrar Cheque</h3>
      </Modal.Header>
      <Modal.Body>
        <form className="mt-2 space-y-2" onSubmit={submitCheque}>
          <div>
            <Label htmlFor="date" value="Date" />
            <TextInput
              id="date"
              type='date'
              value={date}
              onChange={(event) => setDate(event.target.value)}
              min={(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]}
              max={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <div>
            <Label htmlFor="bank" value="Bank" />
            <Select
              id='bank'
              onChange={(event) => setBank(event.target.value)}
              required>
              <option value={'SANTA FE'} >SANTA FE</option>
              <option value={'FRANCES'} >FRANCES</option>
              <option value={'HSBC'} >HSBC</option>
              <option value={'MERCADO PAGO'} >MERCADO PAGO</option>
            </Select>
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

          <Button type='submit'>confirm</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddTransfer
