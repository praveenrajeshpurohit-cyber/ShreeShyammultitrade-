/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShoppingCart, 
  MessageCircleCode, 
  Layers, 
  Cpu, 
  Activity, 
  ChevronRight, 
  ArrowRight,
  TrendingDown,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import { ProductSpec, getWhatsAppLink, generateOrderMessage } from '../types';

interface ProductCardProps {
  key?: string;
  product: ProductSpec;
  whatsAppConfigNum: string;
  onSelectProductForOrder: (prodName: string) => void;
}

export default function ProductCard({ 
  product, 
  whatsAppConfigNum,
  onSelectProductForOrder 
}: ProductCardProps) {
  const [showSpecs, setShowSpecs] = useState(false);

  // Quick Instant Order on WhatsApp without filling the whole 10-page form
  const handleQuickWhatsAppInquiry = () => {
    const quickMsg = `Hello Shree Shyam Multi Trade,

I am interested in placing an order or getting a price quote for:
======================================
*Product Name:* ${product.name}
*Specification Category:* ${product.category === 'yarn' ? 'Yarn Sourcing' : 'Premium Knitted Fabrics'}
======================================

Please share:
1. Minimum Order Quantity (MOQ)
2. Current Rate per KG in Silvassa
3. Colors available in stock

Thank you.`;
    
    const waLink = getWhatsAppLink(whatsAppConfigNum, quickMsg);
    window.open(waLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
      {/* Product Image Section */}
      <div className="relative h-64 overflow-hidden bg-gray-50 shrink-0">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        
        {/* Fabric Tag badge */}
        <div className="absolute top-4 left-4 bg-indigo-900/95 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase flex items-center gap-1 backdrop-blur-sm shadow">
          <Layers className="w-3 h-3 text-indigo-400" />
          <span>{product.name.split(' ')[0] || 'Lycra'} SPEC</span>
        </div>

        {/* Popular Badge */}
        {product.isPopular && (
          <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[9px] font-extrabold tracking-widest px-2.5 py-1 rounded-full uppercase shadow">
            🔥 Best Seller
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-white text-xs font-semibold flex items-center gap-1.5">
            <span>Circular machine knitted</span> • <span>Silvassa, India</span>
          </p>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors font-sans leading-snug">
              {product.name}
            </h3>
          </div>

          {/* Hindi Title Translation for Local Sorters */}
          {product.hindiDescription && (
            <p className="text-xs text-indigo-600 font-semibold bg-indigo-50/50 p-2 rounded border border-indigo-100/40 leading-normal">
              🇮🇳 {product.hindiDescription}
            </p>
          )}

          <p className="text-xs text-gray-500 leading-relaxed font-sans">
            {product.description}
          </p>

          {/* Specifications Accordion */}
          <div className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50/50 mt-4">
            <button
              type="button"
              onClick={() => setShowSpecs(!showSpecs)}
              className="w-full text-left px-4 py-2.5 flex items-center justify-between text-xs font-bold text-gray-700 hover:bg-gray-100 transition"
            >
              <span className="flex items-center gap-1.5 uppercase tracking-wider font-mono">
                <Cpu className="w-3.5 h-3.5 text-indigo-500 animate-pulse" /> Fabric Specifications
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showSpecs ? 'rotate-180 text-indigo-600' : 'text-gray-400'}`} />
            </button>
            
            {showSpecs && (
              <div className="px-4 pb-3 pt-1 border-t border-gray-100 text-[11px] space-y-2 bg-white">
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1 border-b border-gray-100/60 last:border-b-0">
                    <span className="text-gray-500 font-medium">{spec.key}</span>
                    <span className="text-gray-800 font-bold font-mono text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Triggers */}
        <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-gray-100/60 shrink-0">
          <button
            type="button"
            onClick={handleQuickWhatsAppInquiry}
            className="border-2 border-emerald-500 hover:bg-emerald-50 text-emerald-700 p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition duration-150 cursor-pointer text-center"
          >
            <MessageCircleCode className="w-4 h-4 text-emerald-600" />
            <span>Enquire Now</span>
          </button>
          
          <button
            type="button"
            onClick={() => onSelectProductForOrder(product.name)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition duration-150 cursor-pointer shadow-md shadow-emerald-100 text-center"
          >
            <ShoppingCart className="w-4 h-4 text-emerald-200" />
            <span>Place Order</span>
          </button>
        </div>
      </div>
    </div>
  );
}
