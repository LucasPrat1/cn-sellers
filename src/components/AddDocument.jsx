'use client'

import { Button, Label, Modal, TextInput, Textarea } from 'flowbite-react';
import { useForm } from 'react-hook-form';

const AddDocument = ({ showAddDoc, setShowAddDoc, setDocuments, documents }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onClick = (data) => {
    event.preventDefault();
    const { number, date, amount, description } = data;
    setDocuments([...documents, {
      number,
      date,
      amount: Number(amount),
      description
    }])
    reset();
    setShowAddDoc(false);
  }

  if (!showAddDoc) {
    return null
  }

  return (
    <Modal show={showAddDoc} size='md' onClose={() => setShowAddDoc(false)} popup>
      <Modal.Header className='bg-gray-600'>
        <span className='text-xl text-gray-100'>Agregar documento a cobrar</span>
      </Modal.Header>
      <Modal.Body>
        <form className='mt-2 space-y-2' onSubmit={handleSubmit(onClick)}>
          <div>
            <Label htmlFor='date' value='Date' />
            <TextInput
              id='date'
              type='date'
              {...register('date', { required: true })}
              max={new Date().toISOString().split('T')[0]} // Establece la fecha máxima como hoy
            />
            {errors.date && <span className='text-sm text-red-600'>the Date must be less than today</span>}
          </div>

          <div>
            <Label htmlFor='number' value='Number Document' />
            <TextInput
              id='number'
              type='number'
              {...register('number', { required: true, min: 0, max: 99999 })}
            />
            {errors.number?.type === 'required' ? <span className='text-sm text-red-600'>the number is required</span>
              : errors.number && <span className='text-sm text-red-600'>the number is invalid</span>}
          </div>

          <div>
            <Label htmlFor='amount' value='Total' />
            <TextInput
              id='amount'
              type='number'
              {...register('amount', { required: true, min: 0 })}
            />
            {errors.amount && <span className='text-sm text-red-600'>the amount is required</span>}
          </div>

          <div>
            <Label htmlFor='description' value='Observaciones' />
            <Textarea
              id='description'
              rows={3}
              {...register('description', { maxLength: 300 })}
            />
            {errors.description && <span className='text-sm text-red-600'>description max 300 characters</span>}
          </div>

          <Button onClick={handleSubmit(onClick)} fullSized pill color='success'>Confirm</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddDocument