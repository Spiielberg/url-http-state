import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ProductsFiltersSchema = z.object({
  id: z.string(),
  name: z.string(),
})

type ProductsFiltersSchema = z.infer<typeof ProductsFiltersSchema>

export const ProductsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const id = searchParams.get('id')
  const name = searchParams.get('name')

  const { handleSubmit, register } = useForm<ProductsFiltersSchema>({
    resolver: zodResolver(ProductsFiltersSchema),
    values: { id: id ?? '', name: name ?? '' },
  })

  const handleFilterProducts = ({ id, name }: ProductsFiltersSchema) => {
    setSearchParams((state) => {
      if (id) {
        state.set('id', id)
      } else {
        state.delete('id')
      }

      if (name) {
        state.set('name', name)
      } else {
        state.delete('name')
      }

      return state
    })
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
