
import React, { useState, useEffect } from 'react';
import { Product, StoreStats } from '../types';
import { CATEGORIES } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { Plus, Trash2, Edit3, Save, Sparkles, TrendingUp, Package, DollarSign, Users, RefreshCcw } from 'lucide-react';
import { generateProductCopy, getMarketingInsights } from '../services/geminiService';

interface AdminPanelProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, onUpdateProducts }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [aiInsight, setAiInsight] = useState<string>('Analyzing your store data...');

  const stats: StoreStats = {
    revenue: products.reduce((acc, p) => acc + (p.price * (50 - p.stock)), 0),
    sales: 124,
    orders: 86,
    data: products.map(p => ({ name: p.name.substring(0, 10), sales: Math.floor(Math.random() * 50) + 10 }))
  };

  useEffect(() => {
    const fetchInsights = async () => {
      const insight = await getMarketingInsights(products);
      setAiInsight(insight);
    };
    fetchInsights();
  }, [products]);

  const handleDelete = (id: string) => {
    onUpdateProducts(products.filter(p => p.id !== id));
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = (id: string, updates: Partial<Product>) => {
    onUpdateProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
    setEditingId(null);
  };

  const handleGenerateDescription = async (id: string, name: string, category: string) => {
    setIsGenerating(id);
    const newDesc = await generateProductCopy(name, category);
    handleSave(id, { description: newDesc });
    setIsGenerating(null);
  };

  const addNewProduct = () => {
    const newProd: Product = {
      id: Date.now().toString(),
      name: 'New Product',
      price: 0,
      description: 'Click edit to add details...',
      category: 'Food',
      image: 'https://picsum.photos/400/300',
      stock: 10
    };
    onUpdateProducts([...products, newProd]);
    setEditingId(newProd.id);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Merchant Dashboard</h1>
          <p className="text-slate-500">Manage your Berrima inventory and insights.</p>
        </div>
        <button 
          onClick={addNewProduct}
          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
        >
          <Plus className="w-5 h-5" /> Add New Item
        </button>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `$${stats.revenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Sales Growth', value: '+12.5%', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Orders', value: stats.orders, icon: Package, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Store Visitors', value: '1.2k', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">{item.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{item.value}</p>
            </div>
            <div className={`${item.bg} p-2 rounded-lg`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-slate-900">Recent Sales Analytics</h2>
            <select className="text-sm bg-slate-50 border-none rounded-lg px-2 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="sales" radius={[4, 4, 0, 0]}>
                  {stats.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#1e293b' : '#64748b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Sidebar */}
        <div className="bg-indigo-900 text-white p-6 rounded-2xl border border-indigo-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-indigo-300" />
              <h2 className="font-bold text-lg uppercase tracking-wider">Gemini Insights</h2>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-h-[180px]">
              <p className="text-sm leading-relaxed text-indigo-50 italic">
                {aiInsight}
              </p>
            </div>
            <button 
              onClick={async () => {
                setAiInsight('Analyzing...');
                const insight = await getMarketingInsights(products);
                setAiInsight(insight);
              }}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-white text-indigo-900 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              <RefreshCcw className="w-4 h-4" /> Refresh Insights
            </button>
          </div>
        </div>
      </div>

      {/* Product Management Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Inventory Management</h2>
          <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded">
            Total Items: {products.length}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map(product => {
                const isEditing = editingId === product.id;
                return (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img src={product.image} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                        {isEditing ? (
                          <input 
                            value={product.name} 
                            onChange={(e) => handleSave(product.id, { name: e.target.value })}
                            className="text-sm border rounded px-2 py-1 w-32 focus:ring-1 ring-slate-900 outline-none"
                          />
                        ) : (
                          <span className="text-sm font-medium text-slate-900">{product.name}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <select 
                          value={product.category}
                          onChange={(e) => handleSave(product.id, { category: e.target.value })}
                          className="text-sm border rounded px-2 py-1 outline-none"
                        >
                          {CATEGORIES.filter(c => c !== 'All').map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {product.category}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">
                      {isEditing ? (
                        <input 
                          type="number"
                          value={product.price} 
                          onChange={(e) => handleSave(product.id, { price: Number(e.target.value) })}
                          className="text-sm border rounded px-2 py-1 w-20 outline-none"
                        />
                      ) : (
                        `$${product.price}`
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <input 
                          type="number"
                          value={product.stock} 
                          onChange={(e) => handleSave(product.id, { stock: Number(e.target.value) })}
                          className="text-sm border rounded px-2 py-1 w-16 outline-none"
                        />
                      ) : (
                        <span className={`text-sm ${product.stock < 10 ? 'text-red-500 font-bold' : 'text-slate-600'}`}>
                          {product.stock} pcs
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="flex flex-col gap-2">
                        {isEditing ? (
                          <textarea 
                            value={product.description}
                            onChange={(e) => handleSave(product.id, { description: e.target.value })}
                            className="text-xs border rounded p-2 h-20 w-full outline-none"
                          />
                        ) : (
                          <p className="text-xs text-slate-500 line-clamp-2 italic">
                            {product.description}
                          </p>
                        )}
                        {isEditing && (
                          <button 
                            onClick={() => handleGenerateDescription(product.id, product.name, product.category)}
                            disabled={isGenerating === product.id}
                            className="text-[10px] uppercase font-bold text-indigo-600 flex items-center gap-1 hover:text-indigo-800 disabled:opacity-50"
                          >
                            <Sparkles className="w-3 h-3" />
                            {isGenerating === product.id ? 'Thinking...' : 'AI Enhance Desc'}
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isEditing ? (
                          <button 
                            onClick={() => setEditingId(null)}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleEdit(product.id)}
                            className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 rounded-lg"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
