import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import CheckoutForm from './checkout-form';

export default async function Checkout() {

    const session = await getSession()

    if(!session){
        redirect("/login")
    }

    return <CheckoutForm session={session} />

}