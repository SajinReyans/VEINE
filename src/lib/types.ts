export type PricingUnit = "box" | "sqft" | "piece" | "slab";

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  finish?: string;
  priceOverride?: number;
  stockOverride?: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  categories: string[];
  tags: string[]; // color/material/pattern/style tags used for filtering
  shortDescription: string;
  highlights: string[];
  description: string;
  images: string[];
  sellingPrice: number;
  mrp: number;
  pricingUnit: PricingUnit;
  coveragePerUnit?: number; // sq ft covered per box, when pricingUnit === 'box'
  stock: number;
  availability: "In Stock" | "Out of Stock" | "Made to Order";
  color: string;
  size: string;
  material: string;
  pattern: string;
  style: string;
  weightKg: number;
  dimensions: string;
  variants: ProductVariant[];
  sellerId: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  createdAt: string; // ISO date, used for "newest"
  certifications: string[];
  warranty: string;
  countryOfOrigin: string;
}

export interface Seller {
  id: string;
  storeName: string;
  ownerName: string;
  city: string;
  rating: number;
  productsCount: number;
  verified: boolean;
  logo: string;
}

export interface CartLine {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface Category {
  id: string;
  label: string;
  group: "Tiles & Slabs" | "Accessories";
}
