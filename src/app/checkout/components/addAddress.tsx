import { LoaderCircle, Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import * as z from "zod/v4"

import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addAddress } from "@/lib/http/api"
import { useState } from "react"


const formSchema = z.object({
    address: z.string().min(2, {
        message: "Address must be at least 2 characters"
    })
})

const AddAddress = ({customerId}: {customerId: string}) => {
    const[isModelOpen, setIsModelOpen] = useState(false);
    
    const addressForm = useForm<z.infer<typeof formSchema>>({ 
        resolver: standardSchemaResolver(formSchema)
    })

    const queryClient = useQueryClient();

    const {mutate, isPending, isError, error} = useMutation({
        mutationKey: ["address", customerId],
        mutationFn: async(address: string) => {
            return await addAddress(customerId, address)
        },
        onSuccess: () => {
            addressForm.reset();
            setIsModelOpen(false)
            return queryClient.invalidateQueries({
                queryKey: ["customer"]
            })
        }
    })

    const handleAddressAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.stopPropagation()
        return addressForm.handleSubmit((data: z.infer<typeof formSchema>) => {
            mutate(data.address)
        })(e)
    }

  return (
     <Dialog
     open={isModelOpen}
     onOpenChange={setIsModelOpen}
     >
                                        <DialogTrigger asChild>
                                            <Button size={'sm'} variant={'link'}>
                                                <Plus size={'16'} />
                                                <span className="ml-2">Add New Address</span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            {
                                                isError && (
                                                    <p className="text-sm font-medium text-destructive">
                                                    {error?.message || "Failed to add address. Please try again."}
                                                    </p>
                                                )
                                            }
                                            <Form {...addressForm}>
                                                <form onSubmit={handleAddressAdd}>
                                                    <DialogHeader>
                                                <DialogTitle>Add Address</DialogTitle>
                                                <DialogDescription>
                                                    We can save your address for next time order.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div>
                                                    <Label htmlFor="address">Address</Label>
                                                    <FormField name="address" control={addressForm.control} render={({field}) => {
                                                        return <FormItem>
                                                            <FormControl>
                                                                <Textarea className="mt-2" {...field}/>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    }}/>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                               <Button type="submit" disabled={isPending}>
                                {isPending ? (
                                    <span className="flex items-center gap-2">
                                        <LoaderCircle className="animate-spin" />
                                        <span>Please wait...</span>
                                    </span>
                                ) : (
                                    'Save changes'
                                )}
                            </Button> 
                                            </DialogFooter>
                                                </form>
                                            </Form>
                                        </DialogContent>
                                    </Dialog>
  )
}

export default AddAddress