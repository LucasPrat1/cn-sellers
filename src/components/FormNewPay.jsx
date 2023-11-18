'use client'

import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { useSession } from 'next-auth/react';
import { useStore } from '@/context/store';
import { FetchClients } from '@/context/thunks';
import { Accordion, Button, Label, Select, TextInput } from 'flowbite-react';
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
  const [transfers, setTransfers] = useState([]);
  const [cheques, setCheques] = useState([]);
  const [totalCheque, setTotalCheque] = useState(0);
  const [totalTransfer, setTotalTransfer] = useState(0)

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log('data', data)
  }

  if (status === 'loading' || state.isLoading === true) {
    return <Loading />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-6">

          <div className="sm:col-span-4 sm:col-start-1">
            <Label htmlFor="client" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Client
            </Label>
            <Select
              id="client"
              name="client"
              {...register("client", { required: true })}
            >
              {clients.map((cli) => (
                <option key={cli._id} value={cli._id}>{cli.code} - {cli.name}</option>
              ))}
            </Select>
            {errors.client && <span className="mt-2 text-sm text-red-600">This field is required</span>}
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Date
            </Label>
            <TextInput
              type="date"
              name="date"
              id="date"
              {...register("date", {
                required: true,
                // max: new Date().toISOString().split("T")[0],
                // min: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0]
              })}
              min={new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0]} // Establece la fecha mínima como el primero de este mes
              max={new Date().toISOString().split("T")[0]} // Establece la fecha máxima como hoy
            />
            {errors.date && <span className="mt-2 text-sm text-red-600">the date must be between the first of the current month and today</span>}
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
                <div className="p-2 mb-2 text-sm text-red-600 text-center bg-red-100">Ingrese documentos a cobrar</div>
              }
              <Button onClick={() => setShowAddDoc(true)} >Agregar Documento</Button>
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
                <div className="p-2 mb-2 text-sm text-red-600 text-center bg-red-100">Ingrese Notas de credito o Devoluciones a aplicar en este pago</div>
              }
              <Button onClick={() => setShowAddDevols(true)} >Agregar Devolución</Button>

            </Accordion.Content>
          </Accordion.Panel>

          <Accordion.Panel>
            <Accordion.Title className='bg-gray-800 text-white hover:bg-gray-700'>
              Formas de pago
            </Accordion.Title>
            <Accordion.Content>
              <div className='space-y-3'>

                <div className="grid grid-cols-6 gap-4 items-center p-2 rounded-full bg-gradient-to-r from-sky-900 to-slate-500">
                  <Label htmlFor="cash" className="text-center font-medium leading-6 text-gray-100">
                    CASH
                  </Label>
                  <input
                    type="number"
                    name="cash"
                    id="cash"
                    {...register("cash", { required: true, min: 0 })}
                    className="col-span-3 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  {errors.cash && <span className="mt-2 text-sm text-red-600">the cash must be between 0 and Saldo Pendiente</span>}
                </div>

                <div className="grid grid-cols-6 gap-4 items-center p-2 rounded-full bg-gradient-to-r from-sky-900 to-slate-500">
                  <Label htmlFor="payAccount" className="text-center font-medium leading-6 text-gray-100">
                    PAY ACCOUNT
                  </Label>
                  <input
                    type="number"
                    name="payAccount"
                    id="payAccount"
                    {...register("payAccount", { required: true, min: 0 })}
                    className="col-span-3 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  {errors.payAccount && <span className="mt-2 text-sm text-red-600">the payAccount must be between 0 and Saldo Pendiente</span>}
                </div>

                <AddTransfer
                  showAddTransfer={showAddTransfer}
                  setShowAddTransfer={setShowAddTransfer}
                  setTransfers={setTransfers}
                  transfers={transfers}
                />

                <div className="grid grid-cols-6 gap-4 items-center p-2 rounded-full bg-gradient-to-r from-sky-900 to-slate-500">
                  <Label htmlFor="transfer" className="text-center font-medium leading-6 text-gray-100">
                    TRANSFER
                  </Label>
                  <input
                    disabled
                    type="number"
                    name="transfers"
                    id="transfers"
                    value={Number(totalTransfer)}
                    {...register("transfers", { required: true, min: 0 })}
                    className="col-span-3 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <Button className='col-span-2' pill color="light" onClick={() => setShowAddTransfer(true)} >Add Transfer</Button>
                </div>

                {transfers.length > 0 ?
                  <TableDocs type={'TRANSFER'} documents={transfers} setDocuments={setTransfers} /> :
                  <div className="p-2 text-sm text-red-600 text-center bg-red-100">No registra transferencias</div>
                }

                <AddCheque
                  showAddCheque={showAddCheque}
                  setShowAddCheque={setShowAddCheque}
                  setCheques={setCheques}
                  cheques={cheques}
                />

                <div className="grid grid-cols-6 gap-4 items-center p-2 rounded-full bg-gradient-to-r from-sky-900 to-slate-500">
                  <Label htmlFor="cheques" className="text-center font-medium leading-6 text-gray-100">
                    CHEQUES
                  </Label>
                  <input
                    disabled
                    type="number"
                    name="cheques"
                    id="cheques"
                    value={Number(totalCheque)}
                    className="col-span-3 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <Button className='col-span-2' pill color="light" onClick={() => setShowAddCheque(true)} >Add Cheque</Button>
                </div>

                {cheques.length > 0 ?
                  <TableDocs type={'CHEQUE'} documents={cheques} setDocuments={setCheques} /> :
                  <div className="p-2 text-sm text-red-600 text-center bg-red-100">No registra cheques</div>
                }

              </div>

            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>

        <div className="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-6">

          <div className="sm:col-span-2 sm:col-start-1">
            <Label htmlFor="discount" className="block text-sm font-medium leading-6 text-gray-900">
              Discount
            </Label>
            <div className="mt-2">
              <input
                type="number"
                name="discount"
                id="discount"
                {...register("discount", { required: true, max: 20, min: 0 })}
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            {errors.discount && <span className="mt-2 text-sm text-red-600">the discount must be between 0 and 20</span>}
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="total" className="block text-sm font-medium leading-6 text-gray-900">
              TOTAL A PAGAR
            </Label>
            <div className="mt-2">
              <input
                disabled
                type="number"
                name="total"
                id="total"
                className="block w-full rounded-md border-2 text-indigo-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="saldo" className="block text-sm font-medium leading-6 text-gray-900">
              SALDO PENDIENTE
            </Label>
            <div className="mt-2">
              <input
                disabled
                type="number"
                name="saldo"
                id="saldo"
                className="block w-full rounded-md border-2 text-indigo-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

        </div>

      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
      </div>
    </form>
  )
}