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
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const paymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'paid': return 'text-green-600'
        case 'pending': return 'text-yellow-600'
        case 'failed': return 'text-red-600'
        default: return ''
    }
}

const orderStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
        case 'delivered': return 'default' as const
        case 'cancelled': return 'destructive' as const
        case 'received':
        case 'confirmed':
        case 'prepared':
        case 'out_for_delivery': return 'secondary' as const
        default: return 'outline' as const
    }
}

const Orders = async () => {
    
    const response = await fetch (`${process.env.BACKEND_URL}/api/order/orders/mine`, {
        headers: {
            "Authorization": `Bearer ${(await cookies()).get("accessToken")?.value}`
        }
    });

    if(!response.ok){
        throw new Error("Error fetching my orders")
    }

    const orders: Order[] = ((await response.json()) || []).sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); 
    
    return (
        <div className="max-w-6xl mx-auto px-4 md:px-8 mt-8 mb-12">
            <Card>
                <CardHeader className="px-6 md:px-8">
                    <CardTitle className="text-2xl">Orders</CardTitle>
                    <CardDescription className="text-base">My complete order history.</CardDescription>
                </CardHeader>
                <CardContent className="px-6 md:px-8">
                    {orders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-muted-foreground/20 rounded-lg">
                            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-6" />
                            <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                            <p className="text-muted-foreground max-w-sm mb-6">
                                Start exploring our menu and place your first order!
                            </p>
                            <Button asChild>
                                <Link href="/">Browse Menu</Link>
                            </Button>
                        </div>
                    ): (
                        <>
                            {/* Desktop table */}
                            <div className="hidden md:block">
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
                                        <TableCell className={`py-4 text-center font-medium ${paymentStatusColor(order.paymentStatus)}`}>{capitalize(order.paymentStatus)}</TableCell>
                                        <TableCell className="py-4 text-center">{capitalize(order.paymentMode)}</TableCell>
                                        <TableCell className="py-4 text-center">{new Date(order.createdAt).toLocaleString()}</TableCell>
                                        <TableCell className="py-4">
                                            <Badge variant={orderStatusVariant(order.orderStatus)}>{capitalize(order.orderStatus)}</Badge>
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
                            </div>

                            {/* Mobile cards */}
                            <div className="md:hidden space-y-3">
                                {orders.map((order: Order) => (
                                    <Link href={`/order/${order._id}`} key={order._id} className="block">
                                        <Card className="p-4 hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-muted-foreground truncate">#{order._id}</p>
                                                    <p className="text-sm mt-1">{new Date(order.createdAt).toLocaleDateString()} <span className="text-muted-foreground">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></p>
                                                </div>
                                                <Badge variant={orderStatusVariant(order.orderStatus)} className="shrink-0 ml-2">{capitalize(order.orderStatus)}</Badge>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="space-y-1">
                                                    <span className={`font-medium ${paymentStatusColor(order.paymentStatus)}`}>{capitalize(order.paymentStatus)}</span>
                                                    <span className="text-muted-foreground ml-2">· {capitalize(order.paymentMode)}</span>
                                                </div>
                                                <span className="font-bold text-base">₹{order.total.toFixed(2)}</span>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Orders;
