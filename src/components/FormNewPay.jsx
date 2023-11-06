'use client'

import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { useSession } from 'next-auth/react';
import { useStore } from '@/context/store';
import { FetchClients } from '@/context/thunks';
import { Accordion, Button } from 'flowbite-react';
import TableFacts from './tableFacts';
import AddDocument from './AddDocument';
import Loading from '@/app/seller/loading';


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
  const [documents, setDocuments] = useState([{
    number: 10,
    date: 10 / 10 / 2020,
    amount: 15000,
    description: "hola",
  }]);

  // const hoy = new Date();
  // const primero = new Date();
  // primero.setDate(1);

  const {
    register,
    handleSubmit,
    watch,
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
      <div className="space-y-6">
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-6">

          <div className="sm:col-span-4 sm:col-start-1">
            <label htmlFor="client" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Client
            </label>
            <select
              id="client"
              name="client"
              {...register("client", { required: true })}
              className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {clients.map((cli) => (
                <option key={cli._id} value={cli._id}>{cli.code} - {cli.name}</option>
              ))}
            </select>
            {errors.client && <span className="mt-2 text-sm text-red-600">This field is required</span>}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              {...register("date", { required: true, max: new Date() })}
              className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.date && <span className="mt-2 text-sm text-red-600">the date must be between the first of the current month and today</span>}
          </div>

        </div>

        <div className="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-6">

          <div className="sm:col-span-2 sm:col-start-1">
            <label htmlFor="discount" className="block text-sm font-medium leading-6 text-gray-900">
              Discount
            </label>
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
            <label htmlFor="total" className="block text-sm font-medium leading-6 text-gray-900">
              TOTAL A PAGAR
            </label>
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
            <label htmlFor="saldo" className="block text-sm font-medium leading-6 text-gray-900">
              SALDO PENDIENTE
            </label>
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

        <Accordion>
          <Accordion.Panel>
            <Accordion.Title>
              <div>
                Documentos a cobrar
                <Button onClick={() => setShowAddDoc(true)} >Agregar Documentos</Button>
              </div>
            </Accordion.Title>
            <Accordion.Content>

              <AddDocument
                showAddDoc={showAddDoc}
                setShowAddDoc={setShowAddDoc}
                setDocuments={setDocuments}
                documents={documents}
              />
              {documents && <TableFacts documents={documents} setDocuments={setDocuments} />}

            </Accordion.Content>
          </Accordion.Panel>

          <Accordion.Panel>
            <Accordion.Title>
              Notas de credito, devoluciones o descuentos
            </Accordion.Title>
            <Accordion.Content>

            </Accordion.Content>
          </Accordion.Panel>

          <Accordion.Panel>
            <Accordion.Title>
              Formas de pago
            </Accordion.Title>
            <Accordion.Content>

            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>

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