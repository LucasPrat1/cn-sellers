'use client';

import { Button, Label, Modal, TextInput, Checkbox } from 'flowbite-react';
import { useForm } from 'react-hook-form';


const AddCheque = ({ showAddCheque, setShowAddCheque, setCheques, cheques }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const submitCheque = (data) => {
    event.preventDefault();
    const { number, payDate, amount, bank, description, echeq } = data;
    setCheques([...cheques, {
      number,
      payDate,
      amount: Number(amount),
      echeq,
      bank,
      description
    }])
    reset();
    setShowAddCheque(false);
  }

  if (!showAddCheque) {
    return null
  }

  return (
    <Modal show={showAddCheque} size='md' onClose={() => setShowAddCheque(false)} popup>
      <Modal.Header className='bg-gray-600'>
        <span className='text-xl text-gray-100'>Registrar Cheque</span>
      </Modal.Header>
      <Modal.Body>
        <form className='mt-2 space-y-2' onSubmit={handleSubmit(submitCheque)}>
          <div>
            <Label htmlFor='payDate' value='Pay Date' />
            <TextInput
              id='payDate'
              type='date'
              {...register('payDate', { required: true })}
              min={(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]}
              max={(new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]}
            />
            {errors.payDate && <span className='text-sm text-red-600'>the Pay Date must be 90 day maximum</span>}
          </div>

          <div>
            <Label htmlFor='number' value='Cheque Number' />
            <TextInput
              id='number'
              type='number'
              {...register('number', { required: true, min: 1, max: 99999999 })}
            />
            {errors.number?.type === 'required' ? <span className='text-sm text-red-600'>the number is required</span>
              : errors.number && <span className='text-sm text-red-600'>the number is invalid</span>}
          </div>

          <div>
            <Label htmlFor='bank' value='Bank' />
            <TextInput
              id='bank'
              {...register('bank', { required: true, maxLength: 30 })}
            />
            {errors.bank?.type === 'required' && <span className='text-sm text-red-600'>the Bank is required</span>}
            {errors.bank?.type === 'maxLength' && <span className='text-sm text-red-600'>the Bank is invalid</span>}
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

          <div>
            <Checkbox
              id='echeq'
              {...register('echeq')}
            />
            <Label className='ml-4' htmlFor='echeq' value='Es Echeq?' />
          </div>

          <Button onClick={handleSubmit(submitCheque)} fullSized pill color='success'>Confirm</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddCheque
