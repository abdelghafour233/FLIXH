
import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { CATEGORIES } from '../constants';
import { ShoppingCart, Heart, Search, Filter } from 'lucide-react';

interface StorefrontProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewCart: () => void;
  cartCount: number;
}

const Storefront: React.FC<StorefrontProps> = ({ products, onAddToCart, onViewCart, cartCount }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p => 
    (selectedCategory === 'All' || p.category === selectedCategory) &&
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-slate-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1541600391308-9bd2b2157b1c?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover" 
            alt="Hero background"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg tracking-tight">BERRIMA</h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto font-light italic">
            "Curating the finest treasures from heritage and nature."
          </p>
        </div>
      </section>

      {/* Navigation & Search */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none transition-all"
              />
            </div>
            <button 
              onClick={onViewCart}
              className="relative p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-slate-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden bg-slate-200">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-slate-900">
                  <Heart className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-slate-900/80 backdrop-blur text-white text-xs px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 truncate">{product.name}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-4 h-10">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-slate-900">${product.price}</span>
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors active:scale-95"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <Filter className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-900">No products found</h3>
            <p className="text-slate-500">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-24 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h4 className="text-lg font-bold mb-4">BERRIMA</h4>
            <p className="text-slate-500 text-sm">Elevating traditional aesthetics with modern craftsmanship. We provide only the finest organic and artisanal goods.</p>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Support</h4>
            <ul className="text-slate-500 text-sm space-y-2">
              <li><a href="#" className="hover:text-slate-900">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-slate-900">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-slate-900">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter email" className="bg-slate-100 border-none rounded px-3 py-2 flex-1 text-sm outline-none" />
              <button className="bg-slate-900 text-white px-4 py-2 rounded text-sm">Join</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Storefront;
