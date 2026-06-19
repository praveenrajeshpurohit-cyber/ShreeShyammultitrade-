/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, MessageCircleCode, Calendar, Info, Layers } from 'lucide-react';
import { GalleryItem, getWhatsAppLink } from '../types';

interface ImageModalProps {
  item: GalleryItem;
  onClose: () => void;
  whatsAppConfigNum: string;
}

export default function ImageModal({ item, onClose, whatsAppConfigNum }: ImageModalProps) {
  const handleQueryThisImage = () => {
    const textStr = `Hello Shree Shyam Multi Trade,

I am looking at this item from your online Product Gallery:
======================================
*Gallery Item:* ${item.title} (${item.hindiTitle || "Premium Block"})
*Category Category:* ${item.category.toUpperCase()}
======================================

I am looking for similar fabric lots/yarn counts. Kindly share pricing card or mill availability.

Image reference: ${item.imageUrl}`;

    const waLink = getWhatsAppLink(whatsAppConfigNum, textStr);
    window.open(waLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 bg-gray-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-800/10 flex flex-col max-h-[90vh]">
        
        {/* Header bar */}
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-indigo-50 text-indigo-600 rounded text-xs font-mono font-bold uppercase">
              {item.category}
            </span>
            <span className="text-xs text-gray-400 font-mono hidden sm:inline flex items-center gap-1">
              <Calendar className="w-3 h-3 inline" /> Loaded: {item.dateAdded}
            </span>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-200/60 text-gray-500 hover:text-gray-900 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal body */}
        <div className="overflow-y-auto flex-1">
          <div className="relative aspect-video w-full bg-black flex items-center justify-center">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="max-h-[50vh] object-contain w-full"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 tracking-tight leading-snug">
                {item.title}
              </h3>
              {item.hindiTitle && (
                <p className="text-sm text-indigo-600 font-semibold mt-1">
                  🇮🇳 {item.hindiTitle}
                </p>
              )}
            </div>

            <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-2">
              <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <span>{item.description}</span>
            </p>

            <div className="pt-2 border-t border-gray-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-200 rounded-xl text-xs text-gray-500 hover:bg-gray-50"
              >
                Close View
              </button>
              <button
                type="button"
                onClick={handleQueryThisImage}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
              >
                <MessageCircleCode className="w-4 h-4" />
                <span>Enquire about this Fabric</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
