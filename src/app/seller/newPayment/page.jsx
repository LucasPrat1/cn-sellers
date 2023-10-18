'use client'

import FormNewPay from '@/components/FormNewPay';
import { useSession } from 'next-auth/react';

export default function NewPayment() {
  const { data: session } = useSession()

  return (
    <section>
      <FormNewPay token={session.user.token} />
    </section>
  )
}