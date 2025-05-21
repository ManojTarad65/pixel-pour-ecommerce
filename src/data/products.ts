
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Azure Classic",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop",
    category: "Classic",
    isNew: true,
    description: "Our bestselling water bottle with a sleek design and double-wall insulation. Perfect for keeping your beverages at the ideal temperature throughout the day."
  },
  {
    id: 2,
    name: "Eco Thermal",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1581152309595-c304b4d05c14?w=600&auto=format&fit=crop",
    category: "Thermal",
    description: "Eco-friendly thermal bottle made from recycled materials. Designed with sustainability in mind while offering premium insulation for your hot and cold drinks."
  },
  {
    id: 3,
    name: "Summit Insulated",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1610631687337-04552bfb8d85?w=600&auto=format&fit=crop",
    category: "Insulated",
    description: "Perfect for hiking and outdoor adventures with 24hr temperature retention. The rugged design withstands the toughest conditions while keeping your drinks perfectly chilled or hot."
  },
  {
    id: 4,
    name: "Minimalist Sleek",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1610631787330-c3eac43fbf60?w=600&auto=format&fit=crop",
    category: "Modern",
    isNew: true,
    description: "Clean, minimalist design with premium materials for everyday use. This bottle combines aesthetic appeal with functionality, making it the perfect companion for your daily hydration needs."
  },
  {
    id: 5,
    name: "Adventure Pro",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1578598336954-4e34b3ba67ef?w=600&auto=format&fit=crop",
    category: "Sports",
    description: "Built for adventure with a durable exterior and leak-proof cap. Engineered to withstand extreme conditions while keeping your beverages secure, whether you're climbing mountains or exploring new trails."
  },
  {
    id: 6,
    name: "Urban Glass",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1615062631393-99b145f47bea?w=600&auto=format&fit=crop",
    category: "Glass",
    description: "Stylish glass bottle with silicone sleeve for urban lifestyles. The perfect blend of elegance and functionality, designed for the modern city dweller who values both style and sustainability."
  },
  {
    id: 7,
    name: "Stainless Steel Elite",
    price: 36.99,
    image: "https://images.unsplash.com/photo-1556895116-bc12e3005b2f?w=600&auto=format&fit=crop",
    category: "Stainless Steel",
    description: "Premium stainless steel bottle that keeps drinks cold for 48 hours. The vacuum-sealed double-wall construction ensures optimal temperature retention while the durable exterior resists dents and scratches."
  },
  {
    id: 8,
    name: "Kids Explorer",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1575366297858-8a5d3c76cc10?w=600&auto=format&fit=crop",
    category: "Kids",
    description: "Fun, kid-friendly design with easy-to-use straw and carry handle. Designed specifically for children, this bottle combines playful aesthetics with practical features to encourage healthy hydration habits."
  }
];
