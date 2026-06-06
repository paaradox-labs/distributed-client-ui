
"use client"

import { Tenant } from '@/lib/types';
import { SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, Select } from '../ui/select'
import { useRouter } from 'next/navigation';

const TenantSelector = ({restaurants}: {restaurants: {data: Tenant[]}}) => {

    const router = useRouter();

    const handleValueChange = (value:string) => {
        console.log(value);
        router.push(`/?restaurantId=${value}`)
    }

  return (
         <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-[140px] sm:w-[180px] focus-visible:ring-0 focus:ring-0 focus-visible:border-input text-xs sm:text-sm h-9 sm:h-10">
              <SelectValue placeholder="Select Restaurant" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                  restaurants.data.map((restaurant) => {
                    return <SelectItem key={restaurant.id} value={restaurant.id}>{restaurant.name}</SelectItem>
                  })
                }
              </SelectGroup>
            </SelectContent>
          </Select>
  )
}

export default TenantSelector