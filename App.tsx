
import React, { useState, useCallback } from 'react';
import { Product, CartItem, AppView } from './types';
import { INITIAL_PRODUCTS } from './constants';
import Storefront from './components/Storefront';
import AdminPanel from './components/AdminPanel';
import CartSidebar from './components/CartSidebar';
import { LayoutDashboard, ShoppingBag, Store, User } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('store');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateCartQty = useCallback((id: string, qty: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Dynamic Nav Bar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-xl border border-slate-200 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-8">
        <button 
          onClick={() => setView('store')}
          className={`flex flex-col items-center gap-1 transition-all ${view === 'store' ? 'text-slate-900 scale-110' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Store className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase">Store</span>
        </button>
        <button 
          onClick={() => setView('admin')}
          className={`flex flex-col items-center gap-1 transition-all ${view === 'admin' ? 'text-slate-900 scale-110' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase">Admin</span>
        </button>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 relative transition-all"
        >
          <ShoppingBag className="w-5 h-5" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
          )}
          <span className="text-[10px] font-bold uppercase">Cart</span>
        </button>
        <div className="w-px h-6 bg-slate-200 mx-2" />
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <User className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase">Profile</span>
        </button>
      </nav>

      {/* Main View Area */}
      <main className="pb-32">
        {view === 'store' ? (
          <Storefront 
            products={products} 
            onAddToCart={addToCart} 
            onViewCart={() => setIsCartOpen(true)}
            cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
          />
        ) : (
          <AdminPanel 
            products={products} 
            onUpdateProducts={setProducts} 
          />
        )}
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <CartSidebar 
          items={cart}
          onRemove={removeFromCart}
          onUpdateQty={updateCartQty}
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => {
            alert("This is a demo! Checkout functionality would process your payment now.");
            setCart([]);
            setIsCartOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
