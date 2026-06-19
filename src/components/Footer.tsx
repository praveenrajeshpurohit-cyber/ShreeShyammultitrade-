/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ArrowUpRight, 
  Clipboard, 
  Check, 
  TrendingUp, 
  Activity, 
  User,
  Heart
} from 'lucide-react';
import { BusinessConfig } from '../types';

interface FooterProps {
  config: BusinessConfig;
  setActiveTab: (tab: string) => void;
}

export default function Footer({ config, setActiveTab }: FooterProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyGST = () => {
    navigator.clipboard.writeText(config.gstNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const menuLinks = [
    { label: 'Home Page', hindi: 'मुख्य पृष्ठ', id: 'home' },
    { label: 'About Us', hindi: 'हमारे बारे में', id: 'about' },
    { label: 'Products Page', hindi: 'उत्पाद सूची', id: 'products' },
    { label: 'Product Gallery', hindi: 'गैलरी', id: 'gallery' },
    { label: 'Video Catalog', hindi: 'वीडियो संग्रह', id: 'videos' },
    { label: 'Quick Order Form', hindi: 'ऑर्डर करें', id: 'order' },
    { label: 'Yarn Trade & Broker', hindi: 'धागा व्यापार', id: 'yarn' },
    { label: 'Manufacturing Process', hindi: 'बनाने की प्रक्रिया', id: 'process' },
    { label: 'Address & Navigation', hindi: 'पता व लोकेशन', id: 'location' },
    { label: 'Contact Us', hindi: 'संपर्क करें', id: 'contact' }
  ];

  const handleFooterLinkClick = (id: string) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-900 font-sans">
      
      {/* Top Banner: Local Sourcing Guarantee */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-900/40 border border-indigo-700/60 rounded-xl text-indigo-400">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base uppercase tracking-wide">Modern circular knitting mill in silvassa</h4>
              <p className="text-xs text-gray-400 mt-0.5">High-speed production tags with 24×7 capacity, zero-defect quality check parameters.</p>
            </div>
          </div>
          <button
            onClick={() => handleFooterLinkClick('order')}
            className="group shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs uppercase px-5 py-3 rounded-xl transition duration-200 flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-950/40"
          >
            <span>Request customized sample</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Section 1: Corporate Profile & GST */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-lg font-black tracking-tight text-white uppercase">{config.businessName}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Govt registered manufacturer of bright spandex cloth, circular knitting fabrics, polyester yarn broker, and trading Solutions. Owned by Ramawatar Pareek.
              </p>
            </div>
            
            <div className="bg-gray-900/80 border border-gray-800/80 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 flex items-center gap-1.5 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> GST Information
                </span>
                <button
                  onClick={handleCopyGST}
                  className="text-[10px] text-gray-400 hover:text-white flex items-center gap-1 transition"
                  title="Copy GSTIN"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Clipboard className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="text-sm font-mono font-bold tracking-wider text-emerald-400 select-all leading-none bg-black/60 p-2.5 rounded-lg border border-gray-800 text-center">
                {config.gstNumber}
              </div>
              <div className="text-[10px] text-gray-500 leading-normal font-sans">
                Trade Name: <strong className="text-gray-300">Shree Shyam Multi Trade</strong> • Registered in Dadra & Nagar Haveli.
              </div>
            </div>
          </div>

          {/* Section 2: 10-Pages Directory Index */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-gray-800 pb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400 font-bold" /> Sitemap Directory
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 text-xs">
              {menuLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleFooterLinkClick(link.id)}
                  className="flex flex-col text-left text-gray-400 hover:text-white transition duration-150 py-0.5 group cursor-pointer"
                >
                  <span className="font-medium group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                  <span className="text-[9px] text-gray-500">{link.hindi}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Key Products */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-gray-800 pb-2">
              Our Key Products
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleFooterLinkClick('products')} className="text-gray-400 hover:text-white block text-left">
                  <span className="font-semibold text-gray-200">9.50 MTR BRT Lycra</span> — Bright spandex weave
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterLinkClick('products')} className="text-gray-400 hover:text-white block text-left">
                  <span className="font-semibold text-gray-200">7.50 MTR BRT Lycra</span> — Athleisure & leggings fabric
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterLinkClick('products')} className="text-gray-400 hover:text-white block text-left">
                  <span className="font-semibold text-gray-200">5.00 MTR Heavy Lycra</span> — Winter insulated garments
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterLinkClick('products')} className="text-gray-400 hover:text-white block text-left">
                  <span className="font-semibold text-gray-200">6.00 MTR Premium Lycra</span> — Most popular ladies hosiery
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterLinkClick('products')} className="text-gray-400 hover:text-white block text-left">
                  <span className="font-semibold text-gray-200">All kinds of Knitted Fabrics</span> — Rib, Sinker, Interlock
                </button>
              </li>
            </ul>
          </div>

          {/* Section 4: Contact & Industrial Hub */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-gray-800 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-400" /> Industrial Factory Location
            </h4>
            
            <div className="text-xs space-y-3 leading-relaxed">
              <div className="flex gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  <strong className="text-gray-200">Gala No 122-123B, Tirupati Industrial Estate</strong>,<br />
                  66KVA Grid Station Road, Amli, Silvassa, Dadra and Nagar Haveli - 396230
                </span>
              </div>
              <div className="flex gap-2.5 border-t border-gray-900 pt-3">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <a href={`tel:${config.whatsAppNumber}`} className="text-gray-200 hover:text-white font-mono font-bold">
                  {config.phoneNumber}
                </a>
              </div>
              <div className="flex gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <a href={`mailto:${config.email}`} className="text-gray-400 hover:text-white font-mono select-all">
                  {config.email}
                </a>
              </div>
              <div className="flex gap-2.5">
                <User className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Owner: <span className="font-semibold text-gray-200">{config.ownerName}</span>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright declaration */}
        <div className="mt-14 pt-8 border-t border-gray-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} <strong>{config.businessName}</strong>. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Powered by WhatsApp Order Bridge</span>
            <span>•</span>
            <span className="flex items-center gap-1">Made with <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> for Textile Sourcing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
