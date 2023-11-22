'use client';

import { Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import { useForm } from 'react-hook-form';


const AddTransfer = ({ showAddTransfer, setShowAddTransfer, setTransfers, transfers }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const submitTransfer = (data) => {
    event.preventDefault();
    const { date, amount, bank, description } = data;
    setTransfers([...transfers, {
      number: transfers.length + 1,
      date,
      amount: Number(amount),
      bank,
      description
    }])
    reset();
    setShowAddTransfer(false);
  }

  if (!showAddTransfer) {
    return null
  }


  return (
    <Modal show={showAddTransfer} size='md' onClose={() => setShowAddTransfer(false)} popup>
      <Modal.Header className='bg-gray-600'>
        <span className='text-xl text-gray-100'>Registrar Transferencia</span>
      </Modal.Header>
      <Modal.Body>
        <form className='mt-2 space-y-2' onSubmit={handleSubmit(submitTransfer)}>
          <div>
            <Label htmlFor='date' value='Date' />
            <TextInput
              id='date'
              type='date'
              {...register('date', { required: true })}
              min={new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]} // minimo primer dia del corriente mes
              max={new Date().toISOString().split('T')[0]} // maximo hoy
            />
            {errors.date && <span className='text-sm text-red-600'>the Date is required</span>}
          </div>

          <div>
            <Label htmlFor='bank' value='Destination Bank' />
            <Select
              id='bank'
              {...register('bank', { required: true })}
              >
              <option value={'SANTA FE'} >SANTA FE</option>
              <option value={'FRANCES'} >FRANCES</option>
              <option value={'HSBC'} >HSBC</option>
              <option value={'MERCADO PAGO'} >MERCADO PAGO</option>
            </Select>
            {errors.bank && <span className='text-sm text-red-600'>the Bank is required</span>}
          </div>

          <div>
            <Label htmlFor='amount' value='Amount' />
            <TextInput
              id='amount'
              type='number'
              {...register('amount', { required: true, min: 1 })}
            />
            {errors.amount && <span className='text-sm text-red-600'>the Amount is required</span>}
          </div>

          <div>
            <Label htmlFor='description' value='Observaciones' />
            <TextInput
              id='description'
              {...register('description', { maxLength: 300 })}
            />
            {errors.description && <span className='text-sm text-red-600'>description max 300 characters</span>}
          </div>

          <Button onClick={handleSubmit(submitTransfer)} fullSized pill color='success'>Confirm</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddTransfer
