'use client'

import Loading from '../loading';
import { RowPayment } from '@/components/Rows';
import { useStore } from '@/context/store';
import { FetchPayments } from '@/context/thunks';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MyPayments() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { state, dispatch } = useStore();
  const { payments } = state

  useEffect(() => {
    if (payments?.length === 0) {
      FetchPayments(session?.user?.token, dispatch).then((resp)=> {
        if (resp.length === 0) {
          // alert('Aun no posee pagos registrados para sus clientes');
          router.push('/seller/newPayment');
        }
      }).catch(e=> console.error(e))
    }
  }, [dispatch, payments?.length, router, session?.user?.token]);

  if (status === 'loading' || state.isLoading === true) {
    return <Loading />
  }

  return (
    <section>
      <ul role="list" className="divide-y divide-gray-100">
        {payments?.map((pay) => (
          <RowPayment key={pay._id} pay={pay} />
        ))}
      </ul>
    </section>
  )
}
