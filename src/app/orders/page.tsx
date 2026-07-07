import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Order } from '@/lib/types';
import { cookies } from 'next/headers';
import Link from 'next/link';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const Orders = async () => {
    
    const response = await fetch (`${process.env.BACKEND_URL}/api/order/orders/mine`, {
        headers: {
            "Authorization": `Bearer ${(await cookies()).get("accessToken")?.value}`
        }
    });

    if(!response.ok){
        throw new Error("Error fetching my orders")
    }

    const orders = await response.json();    
    
    return (
        <div className="max-w-6xl mx-auto px-4 md:px-8 mt-8 mb-12">
            <Card>
                <CardHeader className="px-6 md:px-8">
                    <CardTitle className="text-2xl">Orders</CardTitle>
                    <CardDescription className="text-base">My complete order history.</CardDescription>
                </CardHeader>
                <CardContent className="px-6 md:px-8">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px] text-center">ID</TableHead>
                                <TableHead className="text-center">Payment Status</TableHead>
                                <TableHead className="text-center">Payment Method</TableHead>
                                <TableHead className="text-center">Date Time</TableHead>
                                <TableHead>Order Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-center pl-16 md:pl-24">Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                orders.map((order: Order) => {
                                    return (
                                        <TableRow key={order._id}>
                                <TableCell className="font-medium py-4 text-center">{order._id}</TableCell>
                                <TableCell className="py-4 text-center">{capitalize(order.paymentStatus)}</TableCell>
                                <TableCell className="py-4 text-center">{capitalize(order.paymentMode)}</TableCell>
                                <TableCell className="py-4 text-center">{new Date(order.createdAt).toLocaleString()}</TableCell>
                                <TableCell className="py-4">
                                    <Badge variant="outline">{capitalize(order.orderStatus)}</Badge>
                                </TableCell>
                                <TableCell className="text-right font-medium py-4">₹{order.total.toFixed(2)}</TableCell>
                                <TableCell className="text-center py-4 pl-16 md:pl-24">
                                    <Link href={`/order/${order._id}`} className="underline text-primary hover:text-primary/80 font-medium whitespace-nowrap">
                                        More details
                                    </Link>
                                </TableCell>
                            </TableRow>
                                    )       
                                }) 
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default Orders;