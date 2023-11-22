'use client';

import { Button, Label, Modal, TextInput, Textarea } from 'flowbite-react';
import { useForm } from 'react-hook-form';

const AddDevols = ({ showAddDevols, setShowAddDevols, setDevols, devols }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onClick = (data) => {
    event.preventDefault();
    const { number, date, amount, description, codProd, descProd } = data;
    setDevols([...devols, {
      number,
      date,
      amount: Number(amount),
      description,
      codProd,
      descProd
    }])
    reset();
    setShowAddDevols(false);
  }


  if (!showAddDevols) {
    return null
  }

  return (
    <Modal show={showAddDevols} size='md' onClose={() => setShowAddDevols(false)} popup>
      <Modal.Header className='bg-gray-600'>
        <span className='text-xl text-gray-100'>Agregar Devoluciones</span>
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
            {errors.date && <span className='text-sm text-red-600'>the date date must be less than today</span>}
          </div>

          <div>
            <Label htmlFor='number' value='Number Document' />
            <TextInput
              id='number'
              type='number'
              {...register('number', { min: 0, max: 99999 })}
            />
            {errors.number && <span className='text-sm text-red-600'>the number is invalid</span>}
          </div>

          <div>
            <Label htmlFor='codProd' value='Product Code' />
            <TextInput
              id='codProd'
              type='number'
              {...register('codProd', { min: 1000000, max: 9999999 })}
            />
            {errors.codProd && <span className='text-sm text-red-600'>the Product Code is invalid</span>}
          </div>

          <div>
            <Label htmlFor='descProd' value='Product Description' />
            <TextInput
              id='descProd'
              {...register('descProd', { required: true, maxLength: 300 })}
            />
            {errors.descProd?.type === 'required' ? <span className='text-sm text-red-600'>the Product Description is required</span>
              : errors.descProd && <span className='text-sm text-red-600'>description max 300 characters</span>}
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

export default AddDevols