/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Settings, 
  ShieldCheck, 
  Smartphone, 
  Home, 
  Info, 
  Package, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  ShoppingCart, 
  Activity, 
  MapPin, 
  Mail, 
  TrendingUp,
  FlameKindling
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BusinessConfig } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  config: BusinessConfig;
  onOpenAdmin: () => void;
}

export default function Navbar({ activeTab, setActiveTab, config, onOpenAdmin }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', hindi: 'मुख्य', icon: Home },
    { id: 'about', label: 'About Us', hindi: 'परिचय', icon: Info },
    { id: 'products', label: 'Products', hindi: 'उत्पाद', icon: Package },
    { id: 'gallery', label: 'Gallery', hindi: 'तस्वीरें', icon: ImageIcon },
    { id: 'videos', label: 'Videos', hindi: 'वीडियो', icon: VideoIcon },
    { id: 'order', label: 'Place Order', hindi: 'ऑर्डर करें', icon: ShoppingCart },
    { id: 'yarn', label: 'Yarn Trade', hindi: 'सूत व्यापार', icon: TrendingUp },
    { id: 'process', label: 'Process', hindi: 'बनाने की विधी', icon: Activity },
    { id: 'location', label: 'Address & Map', hindi: 'नक्शा', icon: MapPin },
    { id: 'contact', label: 'Contact', hindi: 'संपर्क', icon: Mail }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      {/* Top micro-bar for general corporate details & GST */}
      <div className="bg-indigo-950 text-white text-[11px] py-1.5 px-4 sm:px-6 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1 text-indigo-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> GSTIN Verified: 
          </span>
          <span className="font-mono font-semibold tracking-wider text-emerald-300 select-all">{config.gstNumber}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-indigo-200">Owner: <strong className="text-white font-medium">{config.ownerName}</strong></span>
          <a 
            href={`tel:${config.whatsAppNumber}`}
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition"
          >
            <Smartphone className="w-3 h-3" /> {config.phoneNumber}
          </a>
          <button 
            type="button"
            onClick={onOpenAdmin}
            className="flex items-center gap-1 text-indigo-300 hover:text-white transition cursor-pointer text-[10px] bg-indigo-900/50 px-2 py-0.5 rounded border border-indigo-700"
          >
            <Settings className="w-3 h-3 animate-spin hover:animate-none" /> 
            <span>Admin Setup</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo / Brand block */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer select-none py-1 group shrink-0"
          >
            <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-indigo-900 text-white rounded-xl shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
              <FlameKindling className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold tracking-tight text-gray-900 font-sans group-hover:text-indigo-600 transition-colors uppercase">
                  Shree Shyam
                </span>
                <span className="text-xs font-bold text-indigo-600 tracking-wider font-mono">
                  MULTI TRADE
                </span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium tracking-wide -mt-0.5 uppercase">
                Yarn Brokerage & knitted fabrics • AmLi
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2.5 rounded-xl text-left border border-transparent transition-all duration-200 flex flex-col justify-center items-center cursor-pointer ${
                    isActive 
                      ? 'bg-indigo-50/70 text-indigo-700' 
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                    <span className="text-[13px] font-bold tracking-tight">{item.label}</span>
                  </div>
                  <span className="text-[9px] font-medium opacity-75 font-sans -mt-0.5">{item.hindi}</span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavBackground"
                      className="absolute inset-0 border border-indigo-200/50 rounded-xl pointer-events-none"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Buttons Right */}
          <div className="hidden xl:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('order')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-3 rounded-xl transition shadow-lg shadow-emerald-100 flex items-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Easy Order</span>
            </button>
          </div>

          {/* Mobile hamburger trigger */}
          <div className="xl:hidden flex items-center gap-3">
            <button
              onClick={() => handleNavClick('order')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl transition flex items-center justify-center cursor-pointer"
              title="Order on WhatsApp"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 focus:outline-none transition cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden bg-gray-50 border-t border-gray-100 overflow-hidden"
          >
            <div className="p-4 space-y-2 select-none">
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition text-left cursor-pointer ${
                        isActive 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100' 
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${isActive ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-tight">{item.label}</div>
                        <div className={`text-[9px] ${isActive ? 'text-indigo-200' : 'text-gray-400'}`}>{item.hindi}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Extra Admin triggers on mobile */}
              <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full bg-white border border-gray-200 py-3 rounded-xl text-xs font-bold text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-100 shadow-sm transition"
                >
                  <Settings className="w-4 h-4 text-indigo-600 animate-spin" />
                  <span>Configure WhatsApp & Owner Info</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
