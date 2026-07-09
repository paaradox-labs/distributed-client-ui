import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import OrderStatus from './components/orderStatus';
import { Separator } from '@/components/ui/separator';
import { Banknote, Coins, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cookies } from 'next/headers';
import { Order } from '@/lib/types';

const SingleOrder = async({params}: {params: Promise<{orderId: string}>}) => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/order/orders/${(await params).orderId}?fields=address,paymentStatus,paymentMode`,{
        headers:{
            "Authorization": `Bearer ${(await cookies()).get("accessToken")?.value}`
        }
    })

    if(!response.ok){
        throw new Error("Failed to fetch single order")
    }

    const order: Order = await response.json()

    console.log(order);
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Order</CardTitle>
                    <CardDescription>Track the order status. </CardDescription>
                </CardHeader>
                <CardContent>
                    <OrderStatus orderId={order._id} />
                </CardContent>
            </Card>

            <div className="flex flex-col lg:flex-row gap-6">
                <Card className="w-full lg:w-1/3">
                    <CardHeader className="p-4">
                        <CardTitle className="flex items-start text-lg justify-between gap-12">
                            Delivery Address
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-6">
                        <h2 className="font-bold">
                            {order.customerId.firstName + " " + order.customerId.lastName}
                        </h2>
                        <p className="mt-2">{order.address}</p>
                    </CardContent>
                </Card>

                <Card className="w-full lg:w-2/3">
                    <CardHeader className="p-4">
                        <CardTitle className="flex items-start text-lg justify-between gap-12">
                            Your order information
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                            <LayoutDashboard size={20} />
                            <h2 className="text-base font-medium">Order reference: </h2>
                            {order._id}
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <Banknote />
                            <h2 className="text-base font-medium">Payment status: </h2>
                            <span className="capitalize">{order.paymentStatus}</span>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <Coins size={20} />
                            <h2 className="text-base font-medium">Payment method: </h2>
                            <span className="capitalize">{order.paymentMode}</span>
                        </div>

                        <Button size="lg" className="mt-6 w-full sm:w-auto bg-red-600 text-white hover:bg-red-700 cursor-pointer">
                            Cancel Order
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SingleOrder;
