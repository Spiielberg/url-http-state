export interface Product {
  id: number
  name: string
  price: number
}

// Function to generate a random ID
export function generateRandomId() {
  return `${Math.floor(Math.random() * (999 - 100 + 1)) + 100}`
}

interface GetProductsFilters {
  id: string | null
  name: string | null
}

export const getProducts = async ({ id, name }: GetProductsFilters) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  let products = [
    { id: '349', name: 'Yellow Hat', price: 23.35 },
    { id: '679', name: 'Red Socks', price: 47.77 },
    { id: '597', name: 'Black Bag', price: 60.17 },
    { id: '323', name: 'White Hat', price: 40.43 },
    { id: '505', name: 'Silver Shoes', price: 78.07 },
    { id: '300', name: 'Blue Jacket', price: 74.71 },
    { id: '309', name: 'Green Hat', price: 75.11 },
    { id: '949', name: 'Orange Jacket', price: 22.66 },
    { id: '540', name: 'Blue Scarf', price: 28.66 },
    { id: '712', name: 'Yellow Hat', price: 62.34 },
    { id: '356', name: 'Purple Jacket', price: 53.08 },
    { id: '481', name: 'Pink Jacket', price: 45.04 },
    { id: '362', name: 'Black Scarf', price: 33.74 },
    { id: '816', name: 'Silver Shoes', price: 28.67 },
    { id: '692', name: 'Silver Hat', price: 55.2 },
    { id: '836', name: 'White Jacket', price: 67.25 },
    { id: '755', name: 'Yellow Scarf', price: 62.47 },
    { id: '184', name: 'Purple Shirt', price: 26.61 },
    { id: '690', name: 'Green Bag', price: 30.99 },
    { id: '557', name: 'Blue Pants', price: 69.18 },
  ]

  if (id) {
    products = products.filter((product) => product.id.includes(id))
  }

  if (name) {
    products = products.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase()),
    )
  }

  return products
}

interface CreateProductRequest {
  name: string
  price: number
}

export const createProduct = async (newProduct: CreateProductRequest) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { id: generateRandomId(), ...newProduct }
}
