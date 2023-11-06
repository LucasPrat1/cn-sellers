'use client'

import { useEffect } from 'react';
import Loading from '../loading';
import { useStore } from '@/context/store';
import { useSession } from 'next-auth/react';
import { FetchClients } from '@/context/thunks';
import { RowClient } from '@/components/Rows';

export default function MyClients() {
  const { data: session, status } = useSession();
  const { state, dispatch } = useStore();
  const { clients } = state

  useEffect(() => {
    if (clients.length === 0) {
      FetchClients(session?.user?.token, dispatch);
    }
  }, [clients, dispatch, session?.user?.token]);

  if (status === 'loading' || state.isLoading === true) {
    return <Loading />
  }

  return (
    <section>
      <ul>
        {clients.map((client) => (
          <RowClient key={client._id} client={client} />
        ))}
      </ul>
    </section>
  )
}
