import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Product, createProduct } from '@/data/products'

const createProductSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
})

type CreateProductSchema = z.infer<typeof createProductSchema>

export const CreateProductDialog = () => {
  const queryClient = useQueryClient()

  const { handleSubmit, register } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  })

  const { mutateAsync: createProductFn, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: (responseFromAPI) => {
      queryClient.setQueryData<Product[]>(['products'], (data) => {
        if (!data) return

        return [...data, responseFromAPI]
      })
    },
  })

  const handleCreateProduct = async ({ name, price }: CreateProductSchema) => {
    try {
      await createProductFn({ name, price })

      toast.success('Product created.')
    } catch (err) {
      toast.error('Failed to create product.')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>New product</DialogTitle>
        <DialogDescription>Create a new product in system</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleCreateProduct)} className="space-y-5">
        <div className="grid grid-cols-4 items-center gap-3 text-right">
          <Label htmlFor="name">Product</Label>
          <Input {...register('name')} className="col-span-3" />
        </div>

        <div className="grid grid-cols-4 items-center gap-3 text-right">
          <Label htmlFor="price">Price</Label>
          <Input {...register('price')} className="col-span-3" />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isPending}>
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
