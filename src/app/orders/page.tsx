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
import Link from 'next/link';
import React from 'react';

const Orders = async () => {
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
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Payment Status</TableHead>
                                <TableHead>Payment Method</TableHead>
                                <TableHead>Date Time</TableHead>
                                <TableHead>Order Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right pl-16 md:pl-24">Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">INV001</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell>22.05.24 13:22</TableCell>
                                <TableCell>
                                    <Badge variant="outline">Completed</Badge>
                                </TableCell>
                                <TableCell className="text-right font-medium">$250.00</TableCell>
                                <TableCell className="text-right pl-16 md:pl-24">
                                    <Link href="/order/1223" className="underline text-primary hover:text-primary/80 font-medium whitespace-nowrap">
                                        More details
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">INV001</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell>22.05.24 13:22</TableCell>
                                <TableCell>
                                    <Badge variant="outline">Completed</Badge>
                                </TableCell>
                                <TableCell className="text-right font-medium">$250.00</TableCell>
                                <TableCell className="text-right pl-16 md:pl-24">
                                    <Link href="/order/1223" className="underline text-primary hover:text-primary/80 font-medium whitespace-nowrap">
                                        More details
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">INV001</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell>22.05.24 13:22</TableCell>
                                <TableCell>
                                    <Badge variant="outline">Completed</Badge>
                                </TableCell>
                                <TableCell className="text-right font-medium">$250.00</TableCell>
                                <TableCell className="text-right pl-16 md:pl-24">
                                    <Link href="/order/1223" className="underline text-primary hover:text-primary/80 font-medium whitespace-nowrap">
                                        More details
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">INV001</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell>22.05.24 13:22</TableCell>
                                <TableCell>
                                    <Badge variant="outline">Completed</Badge>
                                </TableCell>
                                <TableCell className="text-right font-medium">$250.00</TableCell>
                                <TableCell className="text-right pl-16 md:pl-24">
                                    <Link href="/order/1223" className="underline text-primary hover:text-primary/80 font-medium whitespace-nowrap">
                                        More details
                                    </Link>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default Orders;