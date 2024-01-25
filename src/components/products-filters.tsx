import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ProductsFiltersSchema = z.object({
  id: z.string(),
  name: z.string(),
})

type ProductsFiltersSchema = z.infer<typeof ProductsFiltersSchema>

export const ProductsFilters = () => {
  const { handleSubmit, register } = useForm<ProductsFiltersSchema>({
    resolver: zodResolver(ProductsFiltersSchema),
  })

  const handleFilterProducts = (data: ProductsFiltersSchema) => {
    console.log({ data })
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilterProducts)}
      className="flex items-center gap-2"
    >
      <Input {...register('id')} placeholder="Product ID" />
      <Input {...register('name')} placeholder="Product Name" />

      <Button type="submit" variant="secondary">
        <SearchIcon className="mr-2 size-4" />
        Filter results
      </Button>
    </form>
  )
}
