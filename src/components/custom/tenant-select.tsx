
"use client"

import { useEffect } from 'react'
import { Tenant } from '@/lib/types';
import { SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, Select } from '../ui/select'
import { useRouter, useSearchParams } from 'next/navigation';

const TenantSelector = ({restaurants}: {restaurants: {data: Tenant[]}}) => {
    const router = useRouter();
    const searchParams = useSearchParams()
    // The URL is the single source of truth for the selected tenant, so no
    // local state is needed and the effect below never calls setState.
    const value = searchParams.get("restaurantId") ?? ""

    useEffect(() => {
        const urlId = searchParams.get("restaurantId")
        const storedId = localStorage.getItem('restaurantId')
        if (storedId && !urlId) {
            // Effects should update external systems; the URL here acts as
            // one. The Select re-renders from the updated searchParams.
            const params = new URLSearchParams(searchParams.toString())
            params.set('restaurantId', storedId)
            router.replace(`?${params.toString()}`)
        }
    }, [searchParams, router])

    const handleValueChange = (value:string) => {
        localStorage.setItem('restaurantId', value)
        document.cookie = `restaurantId=${value}; path=/; max-age=${60 * 60 * 24 * 30}`
        router.push(`/?restaurantId=${value}`)
    }

  return (
         <Select value={value} onValueChange={handleValueChange}>
            <SelectTrigger className="w-[140px] sm:w-[180px] focus-visible:ring-0 focus:ring-0 focus-visible:border-input text-xs sm:text-sm h-9 sm:h-10">
              <SelectValue placeholder="Select Restaurant" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                  restaurants.data.map((restaurant) => {
                    return <SelectItem key={restaurant.id} value={String(restaurant.id)}>{restaurant.name}</SelectItem>
                  })
                }
              </SelectGroup>
            </SelectContent>
          </Select>
  )
}

export default TenantSelector