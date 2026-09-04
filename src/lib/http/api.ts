import axios from "axios";
import { CouponCodeData, OrderData } from "../types";

export const api = axios.create({
    // Same-origin base: the storefront ingress routes /api/* to the backing
    // services, so no NEXT_PUBLIC_* env is needed in the browser bundle.
    baseURL: "",
    withCredentials: true,
    headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})  

const ORDER_SERVICE_PREFIX = "/api/order"

export const getCustomer = () => api.get(`${ORDER_SERVICE_PREFIX}/customer`)
export const addAddress = (customerId: string, address: string) => api.patch(`${ORDER_SERVICE_PREFIX}/customer/addresses/${customerId}`, {
    address
})

export const verifyCoupon = (data: CouponCodeData) => api.post(`${ORDER_SERVICE_PREFIX}/coupons/verify`, data)

export const createOrder = (data: OrderData, idempotencyKey: string) => api.post(`${ORDER_SERVICE_PREFIX}/orders`, data, {
    headers: {
        "Idempotency-Key":idempotencyKey
    }
})

export const getSingleOrder = (orderId: string) => api.get(`${ORDER_SERVICE_PREFIX}/orders/${orderId}?fields=orderStatus`)