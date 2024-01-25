export interface Product {
  id: number
  name: string
  price: number
}

// Function to generate a random ID
export function generateRandomId() {
  return Math.floor(Math.random() * (999 - 100 + 1)) + 100
}

// Function to generate a unique name
function generateUniqueName() {
  const adjectives = [
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Purple',
    'Orange',
    'Pink',
    'Black',
    'White',
    'Silver',
  ]

  const nouns = [
    'Shirt',
    'Shoes',
    'Hat',
    'Bag',
    'Glasses',
    'Watch',
    'Jacket',
    'Pants',
    'Socks',
    'Scarf',
  ]

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]

  const noun = nouns[Math.floor(Math.random() * nouns.length)]

  return `${adjective} ${noun}`
}

// Function to generate a random price between 20 and 80
function generateRandomPrice() {
  return parseFloat(
    `${Math.floor(20 + Math.random() * 60)}.${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`,
  )
}

export const generateRandomProducts = async (amount = 0) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const products = []

  for (let i = 0; i < amount; i++) {
    const product = {
      id: generateRandomId(),
      name: generateUniqueName(),
      price: generateRandomPrice(),
    }

    products.push(product)
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
