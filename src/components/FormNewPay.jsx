'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useStore } from '@/context/store';
import { FetchClients, AddPayments } from '@/context/thunks';
import { Accordion, Alert, Button, Label, Modal, Select, TextInput } from 'flowbite-react';
import { useForm } from 'react-hook-form'
import TableDocs from './TableDocs';
import AddDocument from './AddDocument';
import Loading from '@/app/seller/loading';
import AddDevols from './AddDevols';
import AddCheque from './AddCheque';
import AddTransfer from './AddTransfer';


export default function FormNewPay() {
  const { data: session, status } = useSession();
  const { state, dispatch } = useStore();
  const { clients } = state
  const router = useRouter()

  useEffect(() => {
    if (clients.length === 0) {
      FetchClients(session?.user?.token, dispatch);
    }
  }, [clients, dispatch, session?.user?.token]);

  const [showAddDoc, setShowAddDoc] = useState(false)
  const [showAddDevols, setShowAddDevols] = useState(false)
  const [showAddCheque, setShowAddCheque] = useState(false)
  const [showAddTransfer, setShowAddTransfer] = useState(false)
  const [documents, setDocuments] = useState([]);
  const [devols, setDevols] = useState([]);
  const [cheques, setCheques] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [totalDevols, setTotalDevols] = useState(0);
  const [totalCheque, setTotalCheque] = useState(0);
  const [totalTransfer, setTotalTransfer] = useState(0)
  const [totalCash, setTotalCash] = useState(0)
  const [totalPayAccount, setTotalPayAccount] = useState(0)
  const [total, setTotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [pending, setPending] = useState(0)


  useEffect(() => {
    const initialValue = 0;
    const total = cheques.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      initialValue,
    );
    setTotalCheque(total);
  }, [cheques])

  useEffect(() => {
    const initialValue = 0;
    const total = transfers.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      initialValue,
    );
    setTotalTransfer(total);
  }, [transfers])

  useEffect(() => {
    const initialValue = 0;
    const total = documents.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      initialValue,
    );
    setTotalDocuments(total);
  }, [documents])

  useEffect(() => {
    const initialValue = 0;
    const total = devols.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      initialValue,
    );
    setTotalDevols(total);
  }, [devols])

  useEffect(() => {
    setTotal((totalDocuments - totalDevols) - ((totalDocuments - totalDevols) * (parseFloat(discount) / 100)));
    setPending(total - totalCheque - totalTransfer - totalCash - totalPayAccount)
  }, [discount, total, totalCash, totalCheque, totalDevols, totalDocuments, totalPayAccount, totalTransfer])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    event.preventDefault();
    if (total === 0) {
      alert('please add documents to register pay')
    } else {
      if (pending !== 0) {
        alert('Warning! the pending amount must be equal to 0.')
      } else {
        if (window.confirm('¿Are you sure you want to register this payment? if you confirm you will not be able to modify or delete it.')) {
          data = {...data,
            documents,
            devols,
            discount,
            total,
            totalCash,
            totalPayAccount,
            transfers,
            cheques
          }
          try {
            const response = await AddPayments(session?.user?.token, data, dispatch);
            console.log('response', response)
            if (response.error) {
              throw response.message
            }
            Alert(response.message)
            router.push('/myPayments')
          } catch (error) {
            alert(error)
          }
        }
      }
    }
  }

  if (status === 'loading' || state.isLoading === true) {
    return <Loading />
  }

  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-6'>

        <div className='sm:col-span-4 sm:col-start-1'>
          <Label htmlFor='client' value='Client' />
          <Select
            id='client'
            {...register('client', { required: true })}
          >
            {clients.map((cli) => (
              <option key={cli._id} value={cli._id}>{cli.code} - {cli.name}</option>
            ))}
          </Select>
          {errors.client && <span className='mt-2 text-sm text-red-600'>The Client is required</span>}
        </div>

        <div className='sm:col-span-2'>
          <Label htmlFor='date' value='Date' />
          <TextInput
            type='date'
            id='date'
            defaultValue={new Date().toISOString().split('T')[0]}
            {...register('date', { required: true })} // uso validacion de html para que directamente no me permita ingresa
            min={new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]} // min primero de este mes
            max={new Date().toISOString().split('T')[0]} // max hoy
          />
          {errors.date && <span className='mt-2 text-sm text-red-600'>the date must be between the first of the current month and today</span>}
        </div>
      </div>

      <Accordion>
        <Accordion.Panel>
          <Accordion.Title className='bg-gray-800 text-white hover:bg-gray-700'>
            Documentos a cobrar
          </Accordion.Title>
          <Accordion.Content>
            <AddDocument
              showAddDoc={showAddDoc}
              setShowAddDoc={setShowAddDoc}
              setDocuments={setDocuments}
              documents={documents}
            />
            {documents.length > 0 ?
              <TableDocs type={'FACT'} documents={documents} setDocuments={setDocuments} /> :
              <div className='p-2 mb-2 text-sm text-red-600 text-center bg-red-100'>Ingrese documentos a cobrar</div>
            }

            <Label htmlFor='total' value='TOTAL DOCUMENTS' color={'info'} />
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              <TextInput
                id='total'
                type='number'
                addon='$'
                value={totalDocuments}
                color={'info'}
                readOnly
              />
              <Button onClick={() => setShowAddDoc(true)} >Agregar Documento</Button>
            </div>

          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title className='bg-gray-800 text-white hover:bg-gray-700'>
            Notas de credito, devoluciones o descuentos
          </Accordion.Title>
          <Accordion.Content>

            <AddDevols
              showAddDevols={showAddDevols}
              setShowAddDevols={setShowAddDevols}
              setDevols={setDevols}
              devols={devols}
            />
            {devols.length > 0 ?
              <TableDocs type={'DEVOL'} documents={devols} setDocuments={setDevols} /> :
              <div className='p-2 mb-2 text-sm text-red-600 text-center bg-red-100'>Ingrese Notas de credito o Devoluciones a aplicar en este pago</div>
            }

            <Label htmlFor='total' value='TOTAL CREDIT' color={'info'} />
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              <TextInput
                id='total'
                type='number'
                addon='$'
                value={totalDevols}
                color={'info'}
                readOnly
              />
              <Button onClick={() => setShowAddDevols(true)} >Agregar Devolución</Button>
            </div>

          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title className='bg-gray-800 text-white hover:bg-gray-700'>
            Formas de pago
          </Accordion.Title>
          <Accordion.Content>
            <div className='space-y-3'>
              <div className='grid grid-cols-6 gap-4 items-center p-2 rounded-full bg-gradient-to-r from-slate-900 to-sky-500 shadow-inner shadow-slate-50/50'>
                <Label htmlFor='cash' value='CASH' color='info' className='text-center font-bold ' />
                <TextInput
                  id='cash'
                  type='number'
                  addon='$'
                  color='info'
                  value={Number(totalCash)}
                  onChange={(event) => setTotalCash(Number(event.target.value))}
                  className='col-span-3'
                  min={0}
                />
              </div>
              {errors.cash && <span className='mt-2 text-sm text-red-600'>the cash must be between 0 and Saldo Pendiente</span>}

              <div className='grid grid-cols-6 gap-4 items-center p-2 rounded-full bg-gradient-to-r from-slate-900 to-sky-500 shadow-inner shadow-slate-50/50'>
                <Label htmlFor='payAccount' value='PAY ACCOUNT' color={'info'} className='text-center font-bold ' />
                <TextInput
                  id='payAccount'
                  type='number'
                  addon='$'
                  color='info'
                  value={Number(totalPayAccount)}
                  onChange={(event) => setTotalPayAccount(Number(event.target.value))}
                  className='col-span-3'
                  min={0}
                />
              </div>
              {errors.payAccount && <span className='mt-2 text-sm text-red-600'>the payAccount must be between 0 and Saldo Pendiente</span>}

              <AddTransfer
                showAddTransfer={showAddTransfer}
                setShowAddTransfer={setShowAddTransfer}
                setTransfers={setTransfers}
                transfers={transfers}
              />

              <div className='grid grid-cols-6 gap-4 items-center p-2 rounded-full bg-gradient-to-r from-slate-900 to-sky-500 shadow-inner shadow-slate-50/50'>
                <Label htmlFor='transfers' value='TRANSFERS' color={'info'} className='text-center font-bold ' />
                <TextInput
                  id='transfers'
                  type='number'
                  addon='$'
                  color='info'
                  value={Number(totalTransfer)}
                  className='col-span-3'
                  readOnly
                />
                <Button className='col-span-2' pill color='light' onClick={() => setShowAddTransfer(true)} >Add Transfer</Button>
              </div>

              {transfers.length > 0 ?
                <TableDocs type={'TRANSFER'} documents={transfers} setDocuments={setTransfers} /> :
                <div className='p-2 text-sm text-red-600 text-center bg-red-100'>No registra transferencias</div>
              }

              <AddCheque
                showAddCheque={showAddCheque}
                setShowAddCheque={setShowAddCheque}
                setCheques={setCheques}
                cheques={cheques}
              />

              <div className='grid grid-cols-6 gap-4 items-center p-2 rounded-full bg-gradient-to-r from-slate-900 to-sky-500 shadow-inner shadow-slate-50/50'>
                <Label htmlFor='cheques' value='CHEQUES' color={'info'} className='text-center font-bold ' />
                <TextInput
                  id='cheques'
                  type='number'
                  addon='$'
                  color='info'
                  value={Number(totalCheque)}
                  className='col-span-3'
                  readOnly
                />

                <Button className='col-span-2' pill color='light' onClick={() => setShowAddCheque(true)} >Add Cheque</Button>
              </div>

              {cheques.length > 0 ?
                <TableDocs type={'CHEQUE'} documents={cheques} setDocuments={setCheques} /> :
                <div className='p-2 text-sm text-red-600 text-center bg-red-100'>No registra cheques</div>
              }

            </div>

          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-6'>

        <div className='sm:col-span-2'>
          <Label htmlFor='discount' value='DISCOUNT' color={errors.discount ? 'failure' : 'success'} className='text-3lg font-black' />
          <TextInput
            id='discount'
            type='number'
            addon="%"
            color={errors.discount ? 'failure' : 'success'}
            className='text-3lg font-black text-red-600'
            value={Number(discount)}
            onChange={(event) => setDiscount(Number(event.target.value))}
            min={0}
            max={20}
          />
          {errors.discount?.type === 'required' ? <span className='text-sm text-red-600'>the Discount is required</span>
            : errors.discount && <span className='text-sm text-red-600'>the Discount must be between 0 and 20</span>}
        </div>

        <div className='sm:col-span-2'>
          <Label htmlFor='total' value='TOTAL TO PAY' color={total === 0 ? 'success' : 'failure'} className='text-3lg font-black' />
          <TextInput
            id='total'
            type='number'
            addon='$'
            color={total === 0 ? 'success' : 'failure'}
            className='text-3lg font-black text-red-600'
            value={Number(total)}
            readOnly
          />
        </div>

        <div className='sm:col-span-2'>
          <Label htmlFor='pending' value='AMOUNT PENDING' color={pending === 0 ? 'success' : 'failure'} className='text-3lg font-black' />
          <TextInput
            id='pending'
            type='number'
            addon='$'
            color={pending === 0 ? 'success' : 'failure'}
            className='text-3lg font-black text-red-600 '
            value={Number(pending)}
            readOnly
          />
        </div>

      </div>
      <div className='grid grid-cols-4 gap-6'>
        <Button type='reset' pill color='light' href='myPayments'>Cancel</Button>
        <Button type='submit' pill color='success' className='col-span-3'>Confirm</Button>
      </div>
    </form>
  )
}