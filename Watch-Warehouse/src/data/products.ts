
import type { Product } from "../types/product";

// ✅ Product data array — each object must match the Product type from types/product.ts
// 🔑 Image paths use /src/assets/ because Vite serves the src folder statically.
//    The extensions are .png (matching the actual files in /src/assets/).
export const products: Product[] = [
  {
    id: 1,
    name: "Rolex Submariner",
    price: 1200,
    rating: 4.5,
    gender: ["Men"],
    category: "Luxury",
    image: "/src/assets/rolex.png",          // ✅ rolex.png exists in /src/assets/
    description: "Premium diving watch with iconic design."
  },
  {
    id: 2,
    name: "Luxury Ladies Watch",
    price: 5500,
    rating: 4.7,
    gender: ["Women"],
    category: "Luxury",
    image: "/src/assets/luxury.png",          // ✅ luxury.png exists (was misspelled as "luxary")
    description: "Premium ladies watch with 300m water resistance."
  },
  {
    id: 3,
    name: "Men's Classic Watch",
    price: 1800,
    rating: 4.5,
    gender: ["Men"],
    category: "Luxury",
    image: "/src/assets/luxury2.png",         // ✅ luxury2.png exists
    description: "Classic men's luxury timepiece."
  },
  {
    id: 4,
    name: "Women's Luxury Watch",
    price: 2200,
    rating: 4.5,
    gender: ["Women"],
    category: "Luxury",
    image: "/src/assets/WomenWatch.png",      // ✅ WomenWatch.png exists
    description: "Elegant women's luxury watch."
  },
  {
    id: 5,
    name: "Breitling Navitimer",
    price: 3400,
    rating: 4.8,
    gender: ["Men", "Women"],
    category: "Luxury",
    image: "/src/assets/image1.png",          // ✅ using image1.png for variety
    description: "Iconic aviation watch for any wrist."
  },
   {
    id: 6,
    name: "SportWatch Pro",
    price: 2400,
    rating: 4.8,
    gender: ["Men", "Women"],
    category: "sports",
    image: "/src/assets/sport.png",          // ✅ using image1.png for variety
    description: "sports watch for any wrist."
  },
];