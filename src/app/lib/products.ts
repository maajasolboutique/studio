
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  image: string;
  images?: string[];
  specs?: Record<string, string>;
  isHot?: boolean;
  isNew?: boolean;
  stockStatus: 'In Stock' | 'Limited Stock' | 'Out of Stock';
  fabric: string;
}

// All demo products have been removed. 
// The app now relies on the products you add via the Admin Panel in Firestore.
export const products: Product[] = [];
