
import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag } from 'lucide-react';

interface CartSidebarProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
  onClose: () => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ items, onRemove, onUpdateQty, onClose, onCheckout }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <header className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-slate-900" />
            <h2 className="text-xl font-bold text-slate-900">Your Basket</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-slate-200" />
              </div>
              <p className="text-slate-500">Your basket is currently empty.</p>
              <button 
                onClick={onClose}
                className="mt-6 text-slate-900 font-bold underline"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 group">
                <img src={item.image} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-slate-900">{item.name}</h4>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="p-1 text-slate-300 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-slate-500 text-sm mb-3">${item.price}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 bg-slate-50 hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="px-3 text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        className="px-3 py-1 bg-slate-50 hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <footer className="p-6 border-t border-slate-100 bg-slate-50">
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-600 text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 text-sm">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold text-lg">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98]"
            >
              Checkout Now
            </button>
            <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest">
              Secure payments powered by Berrima Store
            </p>
          </footer>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
