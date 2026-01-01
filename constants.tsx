
import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Sidr Honey',
    price: 120,
    description: 'Premium organic honey sourced from the ancient Sidr trees of Yemen.',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1589135404455-873090875957?auto=format&fit=crop&q=80&w=800',
    stock: 25
  },
  {
    id: '2',
    name: 'Aromatic Oud Oil',
    price: 85,
    description: 'Concentrated pure agarwood oil with deep, earthy, and sweet notes.',
    category: 'Fragrance',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=800',
    stock: 12
  },
  {
    id: '3',
    name: 'Saffron Threads Grade A+',
    price: 45,
    description: 'The finest hand-picked saffron threads from the Khorasan region.',
    category: 'Spices',
    image: 'https://images.unsplash.com/photo-1599307734110-9469501a3577?auto=format&fit=crop&q=80&w=800',
    stock: 50
  },
  {
    id: '4',
    name: 'Handcrafted Incense Burner',
    price: 150,
    description: 'Elegant ceramic burner with intricate traditional engravings.',
    category: 'Decor',
    image: 'https://images.unsplash.com/photo-1602143352558-bf6437650577?auto=format&fit=crop&q=80&w=800',
    stock: 8
  }
];

export const CATEGORIES = ['All', 'Food', 'Fragrance', 'Spices', 'Decor'];
