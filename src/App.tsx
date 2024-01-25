import { useQuery } from '@tanstack/react-query'
import { PlusCircleIcon } from 'lucide-react'

import { CreateProductDialog } from '@/components/create-product-dialog'
import { ProductsFilters } from '@/components/products-filters'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { generateRandomProducts } from '@/data/products'

export const App = () => {
  const {
    data: products,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => generateRandomProducts(10),
    refetchOnWindowFocus: false,
  })

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-6">
      <h1 className="text-3xl font-bold">Products</h1>

      <div className="flex items-center justify-between">
        <ProductsFilters />

        <Dialog>
          <DialogTrigger asChild>
            <Button type="button">
              <PlusCircleIcon className="mr-2 size-4" />
              New Product
            </Button>
          </DialogTrigger>

          <CreateProductDialog />
        </Dialog>
      </div>

      <div className="rounded-lg border p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products ? (
              products?.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    {product.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </TableCell>
                </TableRow>
              ))
            ) : isLoading ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Loading products
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Failed to load products
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
