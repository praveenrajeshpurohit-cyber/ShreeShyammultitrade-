/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  Phone, 
  MessageCircleCode, 
  Mail, 
  MapPin, 
  Layers, 
  TrendingUp, 
  Activity, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  Menu, 
  Play, 
  Pause,
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  Plus, 
  FileCheck,
  UserCheck,
  Award,
  Factory,
  ThumbsUp,
  Sliders,
  Send,
  Sparkle
} from 'lucide-react';

import { 
  BusinessConfig, 
  ProductSpec, 
  GalleryItem, 
  VideoItem, 
  DEFAULT_BUSINESS_CONFIG, 
  DEFAULT_PRODUCTS, 
  DEFAULT_GALLERY, 
  DEFAULT_VIDEOS,
  getWhatsAppLink,
  generateOrderMessage,
  generateInquiryMessage
} from './types';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminConfigModal from './components/AdminConfigModal';
import ProductCard from './components/ProductCard';
import ImageModal from './components/ImageModal';

export default function App() {
  // Page Navigation State
  const [activeTab, setActiveTab] = useState<string>('home');

  // Dynamic States with LocalStorage Cache
  const [config, setConfig] = useState<BusinessConfig>(DEFAULT_BUSINESS_CONFIG);
  const [products, setProducts] = useState<ProductSpec[]>(DEFAULT_PRODUCTS);
  const [gallery, setGallery] = useState<GalleryItem[]>(DEFAULT_GALLERY);
  const [videos, setVideos] = useState<VideoItem[]>(DEFAULT_VIDEOS);

  // Admin and popup states
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  
  // Floating WhatsApp panel state
  const [isWAPopoverOpen, setIsWAPopoverOpen] = useState(false);

  // Order/Inquiry Interactive States
  const [orderProductName, setOrderProductName] = useState('');
  const [orderClientName, setOrderClientName] = useState('');
  const [orderClientPhone, setOrderClientPhone] = useState('');
  const [orderQty, setOrderQty] = useState('');
  const [orderFabricType, setOrderFabricType] = useState('Lycra');
  const [orderNotes, setOrderNotes] = useState('');

  // Contact form state
  const [contactSubject, setContactSubject] = useState('Fabric Sample Sourcing');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactLogs, setContactLogs] = useState<any[]>([]);
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Gallery view filters
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'fabrics' | 'yarn' | 'machinery' | 'production'>('all');

  // Load and cache settings from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('shyam_products');
    const savedGallery = localStorage.getItem('shyam_gallery');
    
    // Auto-detect older colorful mock photos and clear so the fresh white fabric & circular knitting defaults load instantly
    const containsOldPhotos = (savedProducts && savedProducts.includes("photo-1610030469983-98e550d6193c")) || 
                             (savedGallery && savedGallery.includes("photo-1584308666744"));
    
    if (containsOldPhotos) {
      localStorage.removeItem('shyam_products');
      localStorage.removeItem('shyam_gallery');
      localStorage.removeItem('shyam_videos');
      // States are already initialized to the new DEFAULT constants, so they load correctly!
    } else {
      const savedConfig = localStorage.getItem('shyam_business_config');
      const savedVideos = localStorage.getItem('shyam_videos');

      if (savedConfig) setConfig(JSON.parse(savedConfig));
      if (savedProducts) setProducts(JSON.parse(savedProducts));
      if (savedGallery) setGallery(JSON.parse(savedGallery));
      if (savedVideos) setVideos(JSON.parse(savedVideos));
    }
  }, []);

  // Sync helpers
  const handleSaveConfig = (updated: BusinessConfig) => {
    setConfig(updated);
    localStorage.setItem('shyam_business_config', JSON.stringify(updated));
  };

  const handleAddGalleryItem = (item: GalleryItem) => {
    const next = [item, ...gallery];
    setGallery(next);
    localStorage.setItem('shyam_gallery', JSON.stringify(next));
  };

  const handleAddVideoItem = (item: VideoItem) => {
    const next = [item, ...videos];
    setVideos(next);
    localStorage.setItem('shyam_videos', JSON.stringify(next));
  };

  const handleAddProduct = (item: ProductSpec) => {
    const next = [item, ...products];
    setProducts(next);
    localStorage.setItem('shyam_products', JSON.stringify(next));
  };

  const handleRemoveGalleryItem = (id: string) => {
    const next = gallery.filter(item => item.id !== id);
    setGallery(next);
    localStorage.setItem('shyam_gallery', JSON.stringify(next));
  };

  const handleRemoveVideoItem = (id: string) => {
    const next = videos.filter(item => item.id !== id);
    setVideos(next);
    localStorage.setItem('shyam_videos', JSON.stringify(next));
  };

  const handleRemoveProduct = (id: string) => {
    const next = products.filter(item => item.id !== id);
    setProducts(next);
    localStorage.setItem('shyam_products', JSON.stringify(next));
  };

  // Route to order tab and prepare input fields
  const handleTriggerSelectProduct = (prodName: string) => {
    setOrderProductName(prodName);
    const matched = products.find(p => p.name === prodName);
    if (matched) {
      // prefill dynamic category fields
      setOrderFabricType(prodName.includes("Lycra") ? "Lycra" : "Knitted Blend");
    }
    setActiveTab('order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate WhatsApp redirect link from Place Order Form
  const handleSubmitOrderForm = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedText = generateOrderMessage(
      orderProductName || "General Yarn/Fabrics",
      orderClientName,
      orderClientPhone,
      orderQty,
      orderFabricType,
      orderNotes
    );
    const waLink = getWhatsAppLink(config.whatsAppNumber, formattedText);
    
    // Register submission locally for user preview simulation
    const log = {
      id: Date.now(),
      type: "order",
      productName: orderProductName,
      clientName: orderClientName,
      qty: orderQty,
      timestamp: new Date().toLocaleTimeString()
    };
    setContactLogs(prev => [log, ...prev]);

    window.open(waLink, '_blank', 'noreferrer,noopener');
    
    // Toast state reset
    setOrderClientName('');
    setOrderClientPhone('');
    setOrderQty('');
    setOrderNotes('');
  };

  // Contact page form submission
  const handleSubmitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedText = generateInquiryMessage(
      `${contactSubject} - from ${contactName}`,
      `Client Name: ${contactName}\nPhone: ${contactPhone}\n\nClient inquiry detail:\n${contactMsg}`
    );
    const waLink = getWhatsAppLink(config.whatsAppNumber, formattedText);
    
    const log = {
      id: Date.now(),
      type: "general-inquiry",
      subject: contactSubject,
      clientName: contactName,
      timestamp: new Date().toLocaleTimeString()
    };
    setContactLogs(prev => [log, ...prev]);
    
    window.open(waLink, '_blank', 'noreferrer,noopener');

    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setContactName('');
      setContactPhone('');
      setContactMsg('');
    }, 4000);
  };

  // Quick inquiry floating widget redirectional templates
  const triggerQuickBubbleChat = (topic: string) => {
    let text = "";
    if (topic === 'fabric') {
      text = `Hello Shree Shyam Multi Trade, I am interested in your Knitted Fabrics (9.50/7.50/6.00 MTR BRT Lycra). Please share your catalog rate card and delivery terms for Silvassa.`;
    } else if (topic === 'yarn') {
      text = `Hello Shree Shyam Multi Trade, I am seeking yarn brokerage and trading support. I have custom count yarn requirements. Please contact me back.`;
    } else {
      text = `Hello Shree Shyam Multi Trade, I want to enquire about circular knitting factory capability, fabrics and current yarn prices. Kindly respond in Hindi or English.`;
    }
    const link = getWhatsAppLink(config.whatsAppNumber, text);
    window.open(link, '_blank', 'noopener,noreferrer');
    setIsWAPopoverOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 flex flex-col justify-between selection:bg-indigo-600 selection:text-white font-sans antialiased">
      
      {/* Header element */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        config={config} 
        onOpenAdmin={() => setIsAdminOpen(true)} 
      />

      {/* Pages Container */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full"
          >
            
            {/* ==================== 1. HOME PAGE ==================== */}
            {activeTab === 'home' && (
              <div className="space-y-16 pb-20">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 py-24 sm:py-32 text-white">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  {/* Decorative modern elements */}
                  <div className="absolute -top-1/2 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="absolute -bottom-1/2 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      <div className="lg:col-span-7 space-y-6 text-left">
                        
                        <div className="inline-flex items-center gap-1.5 bg-indigo-900/60 border border-indigo-700/50 px-3.5 py-1.5 rounded-full text-indigo-300 text-[11px] font-bold uppercase tracking-widest">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                          <span>Silvassa Textile Manufacturing Leader</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] font-sans">
                          Sourcing Excellence in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400">Knitted Fabrics</span> & Yarn Brokerage
                        </h1>
                        
                        <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-2xl">
                          Shree Shyam Multi Trade under <strong>Ramawatar Pareek</strong> manufactures and trades top-tier knitted fabrics (BRT Lycra 9.50/7.50/6.00 MTR) on circular knitting machinery, and coordinates bulk yarn trading with elite Indian spinning mills.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <button
                            onClick={() => handleTriggerSelectProduct("9.50 MTR BRT Lycra")}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase px-7 py-4 rounded-xl transition shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <MessageCircleCode className="w-5 h-5 text-emerald-200" />
                            <span>Place Order on WhatsApp</span>
                          </button>
                          
                          <button
                            onClick={() => {
                              setActiveTab('products');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="bg-indigo-800/80 hover:bg-indigo-800 text-white border border-indigo-600/60 font-bold text-xs uppercase px-7 py-4 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <span>View Fabric Catalog</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Visual statistics */}
                        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-indigo-900/60 text-left">
                          <div>
                            <div className="text-2xl sm:text-3xl font-extrabold text-white">9.50 MTR</div>
                            <div className="text-[10px] text-indigo-300 font-semibold tracking-wider uppercase mt-1">BRT Lycra Yield</div>
                          </div>
                          <div>
                            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">Circular</div>
                            <div className="text-[10px] text-indigo-300 font-semibold tracking-wider uppercase mt-1">Knitting Setup</div>
                          </div>
                          <div>
                            <div className="text-2xl sm:text-3xl font-extrabold text-white">GSTIN</div>
                            <div className="text-[10px] text-indigo-300 font-semibold tracking-wider uppercase mt-1">Registered Co.</div>
                          </div>
                        </div>

                      </div>

                      {/* Right banner image simulation */}
                      <div className="lg:col-span-5 relative">
                        <div className="relative mx-auto max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-gray-100/10">
                          <img 
                            src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=800&q=80"
                            alt="Knitted cloth rolls close up"
                            className="w-full h-96 object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-black/25"></div>
                          
                          <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-gray-800">
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block font-mono">LIVE PRODUCTION AT SILVASSA</span>
                            <p className="text-xs text-gray-200 mt-1 font-medium">Circular knitting technology creates custom spandex loops for Indian textile garment clusters.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Micro Introduction Page Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 shadow-sm relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                      <div className="lg:col-span-7 space-y-6">
                        <div className="text-indigo-600 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                          <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                          <span>Introduction & Business Footprint</span>
                        </div>
                        
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                          Modern Manufacturing & Yarn Trade Partnership under One Roof
                        </h2>
                        
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Based in the prominent industrial hub of <strong>Amli, Silvassa</strong>, Shree Shyam Multi Trade serves clients across Daman, Surat, Bhiwandi, and Mumbai. We combine advanced mechanical circular knitting technology with dynamic, client-friendly yarn brokering. 
                        </p>

                        <p className="text-sm text-gray-600 leading-relaxed">
                          Whether you require highly specialized bright spandex fabric like the standard <strong>9.50 MTR / 7.50 MTR BRT Lycra</strong> or look for elite mill counts for knitting and weaving, our proprietor, <strong>Ramawatar Pareek</strong>, coordinates pristine yarn weight delivery with transparent price advantages.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <div className="flex gap-3">
                            <div className="p-2 bg-emerald-50 text-emerald-600 h-9 w-9 rounded-lg flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Premium Spandex Fabrics</h4>
                              <p className="text-xs text-gray-500 mt-0.5">Tested yield consistency stretch fabrics.</p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="p-2 bg-indigo-50 text-indigo-600 h-9 w-9 rounded-lg flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Reliable Yarn Trading</h4>
                              <p className="text-xs text-gray-500 mt-0.5">Deep sourcing connections with spinning mills.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Panel: Machinery Info */}
                      <div className="lg:col-span-5 bg-gradient-to-tr from-indigo-50 to-slate-100 p-8 rounded-2xl border border-gray-100/80 flex flex-col justify-between">
                        <div className="space-y-4">
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">MACHINERY OVERVIEW</span>
                          <h3 className="text-lg font-bold text-indigo-950">Circular Knitting Machine Power</h3>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            Our machinery features specialized needles and Multi-feeder adjustments, minimizing fabric defects and guaranteeing exactly identical yield weight per roll.
                          </p>
                          <ul className="text-xs text-gray-600 space-y-2 font-medium">
                            <li className="flex items-center gap-1.5">🟢 Specialized 24GG & 28GG cylinders</li>
                            <li className="flex items-center gap-1.5">🟢 Even-tension feeding mechanics</li>
                            <li className="flex items-center gap-1.5">🟢 24/7 continuous yarn looping</li>
                          </ul>
                        </div>
                        <button
                          onClick={() => setActiveTab('process')}
                          className="mt-6 text-xs text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-1 group py-1"
                        >
                          <span>Explore Sourcing Process</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Dynamic Product Teaser Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                  <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2">
                    <div>
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Featured Inventory</span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">Our Core Knitted Fabric Range</h2>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('products');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
                    >
                      <span>Browse Products Tab</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.slice(0, 3).map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        whatsAppConfigNum={config.whatsAppNumber} 
                        onSelectProductForOrder={handleTriggerSelectProduct} 
                      />
                    ))}
                  </div>
                </section>

                {/* Trust Elements banner */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-indigo-900 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center sm:text-left divide-y md:divide-y-0 md:divide-x divide-indigo-800">
                      <div className="space-y-1">
                        <h4 className="text-xl font-bold">GST Verified</h4>
                        <p className="text-xs text-indigo-300">Shree Shyam Multi Trade is registered for tax safety</p>
                      </div>
                      <div className="space-y-1 md:pl-6">
                        <h4 className="text-xl font-bold">9.50/7.50/6.00 MTR</h4>
                        <p className="text-xs text-indigo-300">Strictly regulated fabric grammage yield options</p>
                      </div>
                      <div className="space-y-1 md:pl-6">
                        <h4 className="text-xl font-bold">Yarn Brokerage</h4>
                        <p className="text-xs text-indigo-300">Direct textile mills price negotiation benefits</p>
                      </div>
                      <div className="space-y-1 md:pl-6">
                        <h4 className="text-xl font-bold">Ramawatar Pareek</h4>
                        <p className="text-xs text-indigo-300">Dedicated textile expert serving domestic hubs</p>
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            )}

            {/* ==================== 2. ABOUT US ==================== */}
            {activeTab === 'about' && (
              <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-16">
                
                {/* Intro Heading */}
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">Owner PROFILE & VALUES</span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-sans tracking-tight leading-tight">
                    Professional Sourcing Leadership in Silvassa Textile Hub
                  </h1>
                  <p className="text-sm text-gray-500">
                    Learn about Shree Shyam Multi Trade, our proprietor Ramawatar Pareek, and our vision for zero-defect hosiery and sportswear supply chains.
                  </p>
                </div>

                {/* Owner details card */}
                <div className="bg-white border rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-12 xl:col-span-5 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
                      alt="Proprietor Ramawatar Pareek"
                      className="rounded-2xl w-full h-80 object-cover shadow border border-gray-150"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-indigo-600 text-white p-4 rounded-xl text-center shadow-lg font-mono">
                      <div className="text-lg font-bold">100%</div>
                      <div className="text-[9px] uppercase tracking-wider">Quality Checked</div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-5">
                    <div className="space-y-2">
                      <span className="text-xs text-emerald-600 font-bold uppercase tracking-widest font-mono">THE PROPRIETOR</span>
                      <h2 className="text-2xl font-bold text-gray-900">Ramawatar Pareek</h2>
                      <p className="text-xs text-indigo-600 font-bold uppercase tracking-wide">Manufacturer of Knitted Fabrics & Yarn Broker</p>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed font-sans">
                      Under the commercial guidance of <strong>Ramawatar Pareek</strong>, Shree Shyam Multi Trade is established on the pillars of <strong>Precision Machining, Transparency, and Timely Delivery</strong>. In an industry where textile count rates swing daily, our brokerage offers steady support to local manufacturers.
                    </p>

                    <p className="text-xs text-gray-600 leading-relaxed font-sans">
                      Our facility specializes in circular knit structures. By using highly calibrated needle slots, we produce exactly uniform Lycra loops. We also secure top graded counts including semi-combed cotton, bright polyester threads, and open-end counts for outer industrial trading.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <span className="bg-slate-100 text-slate-800 text-xs px-3.5 py-1.5 rounded-lg border font-medium">📍 Located in Amli, Silvassa</span>
                      <span className="bg-indigo-50 text-indigo-700 text-xs px-3.5 py-1.5 rounded-lg border border-indigo-100 font-medium font-mono">GSTIN: {config.gstNumber}</span>
                      <span className="bg-emerald-50 text-emerald-800 text-xs px-3.5 py-1.5 rounded-lg border border-emerald-100 font-medium">⏱️ On-time Mill Dispatch</span>
                    </div>
                  </div>
                </div>

                {/* Company Experience & Business Values Grid */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-indigo-600" /> Core Corporate Core Values
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white border rounded-2xl p-6.5 space-y-3">
                      <div className="bg-indigo-50 text-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold">01</div>
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Absolute Yield Consistency</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        We monitor fabric rolls during the manufacturing process. Whether you require exactly 9.50 meter stretch or a heavy 5.00 meter knit, the yield matches your purchase targets.
                      </p>
                    </div>

                    <div className="bg-white border rounded-2xl p-6.5 space-y-3">
                      <div className="bg-emerald-50 text-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold">02</div>
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Yarn Brokerage Integrity</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        We act as ethical yarn brokers, connecting spinning mills with local textile workshops. We give you transparent daily market price cues and protect your business margin.
                      </p>
                    </div>

                    <div className="bg-white border rounded-2xl p-6.5 space-y-3">
                      <div className="bg-amber-50 text-amber-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold">03</div>
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Customer First Delivery</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Our circular knitting machine mill works 24/7. We avoid shipping delays so that your hosiery and clothing manufacturing lines continue without operational stops.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ==================== 3. PRODUCTS PAGE ==================== */}
            {activeTab === 'products' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-10">
                
                {/* Visual Header */}
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">PRODUCT SWATCHES</span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Our Knitted Fabric specifications</h1>
                  <p className="text-sm text-gray-500">
                    We manufacture all types of knitted fabrics on advanced circular knitting machines. Each fabric roll is packed precisely to preserve yield characteristics.
                  </p>
                </div>

                {/* Live Directory Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      whatsAppConfigNum={config.whatsAppNumber} 
                      onSelectProductForOrder={handleTriggerSelectProduct} 
                    />
                  ))}
                </div>

                {/* Sourcing and pricing assurance box */}
                <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-emerald-950">
                  <div className="p-3 bg-white text-emerald-600 rounded-xl shadow shrink-0">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm uppercase tracking-wider">Circular Knitting Machine Customization</h4>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      Need a custom yield or a specific yarn count (like 30s combed soft poly or Spandex covers) not listed here? Our proprietor, <strong>Ramawatar Pareek</strong>, can configure circular machines to knit precisely to your specifications.
                    </p>
                    <button 
                      type="button"
                      onClick={() => {
                        setActiveTab('order');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs text-emerald-700 font-extrabold underline block mt-2 hover:text-emerald-950 cursor-pointer"
                    >
                      Configure custom order specification now →
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* ==================== 4. PRODUCT GALLERY ==================== */}
            {activeTab === 'gallery' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-12">
                
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">VISUAL INVENTORY</span>
                  <h1 className="text-3xl font-extrabold text-gray-900">Fabrics & machinery Photo Gallery</h1>
                  <p className="text-sm text-gray-500">
                    Browse authentic photographs of our Silvassa circular machines, knitted fabric roll bundles, and premium yarn warehouse stock.
                  </p>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    { id: 'all', label: 'All Photos' },
                    { id: 'fabrics', label: 'Knitted Fabrics' },
                    { id: 'yarn', label: 'Yarn spools / सूत' },
                    { id: 'machinery', label: 'Circular Machinery' },
                    { id: 'production', label: 'Production Work' }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setGalleryFilter(filter.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition uppercase tracking-wider cursor-pointer ${
                        galleryFilter === filter.id 
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                          : 'bg-white border border-gray-250 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                {/* Admin upload notification */}
                <div className="bg-slate-100 border border-slate-200 p-4 rounded-2xl max-w-md mx-auto text-center space-y-2">
                  <p className="text-xs font-semibold text-slate-700">👤 Business Admin Feature:</p>
                  <p className="text-[11px] text-gray-500">You can upload custom fabric photos or machines photos instantly during testing using our dynamic Owner Dashboard!</p>
                  <button 
                    onClick={() => setIsAdminOpen(true)}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-extrabold flex items-center justify-center gap-1 mx-auto underline mt-1"
                  >
                    <span>Click to upload new Fabric photo</span>
                  </button>
                </div>

                {/* Gallery grid layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6.5">
                  {gallery
                    .filter((item) => galleryFilter === 'all' || item.category === galleryFilter)
                    .map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => setSelectedGalleryItem(item)}
                        className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm cursor-zoom-in hover:shadow-lg transition-all group"
                      >
                        <div className="relative aspect-square overflow-hidden bg-gray-50">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-transparent group-hover:bg-indigo-900/10 transition-colors pointer-events-none"></div>
                          
                          <div className="absolute top-3 left-3 bg-indigo-950/90 text-white text-[10px] px-2 py-0.5 rounded-md uppercase font-mono font-bold tracking-wider backdrop-blur-sm">
                            {item.category}
                          </div>
                        </div>
                        <div className="p-4 border-t border-gray-50">
                          <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                          {item.hindiTitle && <p className="text-[11px] text-indigo-600 font-medium mt-0.5">🇮🇳 {item.hindiTitle}</p>}
                          <p className="text-xs text-gray-400 mt-1.5 truncate font-sans">{item.description}</p>
                        </div>
                      </div>
                    ))}
                </div>

              </div>
            )}

            {/* ==================== 5. VIDEO GALLERY ==================== */}
            {activeTab === 'videos' && (
              <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-12">
                
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">LIVE WORKSHOPS</span>
                  <h1 className="text-3xl font-extrabold text-gray-900">Weaving & Machine Video Gallery</h1>
                  <p className="text-sm text-gray-500">
                    Watch our circular knitting machinery in action. Understand the loop formation, roll winders, and yarn count setups visually.
                  </p>
                </div>

                {/* Admin video placeholder widget */}
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-center max-w-md mx-auto space-y-1.5">
                  <p className="text-xs font-bold text-indigo-900">🎥 Admin-Friendly Video Addition:</p>
                  <p className="text-[11px] text-indigo-700">Have new videos of your machinery or freshly woven fabric lots? Add them dynamically via the Admin Panel.</p>
                  <button 
                    onClick={() => setIsAdminOpen(true)}
                    className="text-xs text-indigo-700 font-bold hover:text-indigo-900 underline block mx-auto cursor-pointer"
                  >
                    Register custom workshop video →
                  </button>
                </div>

                {/* Video playing display modal / block */}
                {playingVideoId && (
                  <div className="bg-gray-950 rounded-2xl overflow-hidden p-3 border border-gray-800 shadow-2xl relative max-w-3xl mx-auto">
                    <div className="flex justify-between items-center text-white pb-3 px-2">
                      <span className="text-xs font-mono font-semibold">Active Screen: Live Circular Knit Loom Feed Demo</span>
                      <button 
                        onClick={() => setPlayingVideoId(null)}
                        className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded"
                      >
                        ✕ Stop Video
                      </button>
                    </div>
                    <video 
                      src={videos.find(v => v.id === playingVideoId)?.videoUrl} 
                      controls 
                      autoPlay 
                      className="w-full h-[400px] bg-black object-contain text-white"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {/* Videos Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {videos.map((vid) => (
                    <div 
                      key={vid.id} 
                      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col justify-between"
                    >
                      <div className="relative aspect-video bg-gray-950 shrink-0 group">
                        <img 
                          src={vid.thumbnailUrl} 
                          alt={vid.title} 
                          className="w-full h-full object-cover opacity-80"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Play Overlay Button */}
                        <button
                          onClick={() => setPlayingVideoId(vid.id)}
                          className="absolute inset-0 m-auto w-12 h-12 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg transition duration-300 scale-100 hover:scale-110 cursor-pointer"
                        >
                          <Play className="w-5 h-5 fill-white" />
                        </button>

                        <div className="absolute bottom-2.5 right-2.5 bg-black/75 px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-200">
                          {vid.duration} duration
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5 text-left">
                          <h4 className="text-sm font-bold text-gray-900">{vid.title}</h4>
                          {vid.hindiTitle && <p className="text-xs text-indigo-700 font-semibold">🇮🇳 {vid.hindiTitle}</p>}
                          <p className="text-xs text-gray-500 leading-relaxed">{vid.description}</p>
                        </div>
                        <button
                          onClick={() => setPlayingVideoId(vid.id)}
                          className="w-full bg-slate-50 hover:bg-slate-100 border border-gray-200 text-gray-700 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition"
                        >
                          <span>Play Machine Video Feed</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* ==================== 6. PLACE ORDER PAGE ==================== */}
            {activeTab === 'order' && (
              <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-10">
                
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">SECURE CHECKOUT BRIDGE</span>
                  <h1 className="text-3xl font-extrabold text-gray-900">Direct-to-WhatsApp textile Order Desk</h1>
                  <p className="text-sm text-gray-500 max-w-xl mx-auto">
                    Configure your fabric roll specifications, counts, and required yield below. Clicking submit auto-formats your order details and opens your live WhatsApp account with the pre-filled text!
                  </p>
                </div>

                <div className="bg-white border rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
                  
                  {/* Left instruction panel */}
                  <div className="lg:col-span-5 bg-gradient-to-br from-indigo-950 to-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between">
                    <div className="space-y-6">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono">ORDER INSTRUCTIONS</span>
                      <h3 className="text-lg font-bold">Fast Sourcing Process</h3>
                      
                      <ol className="text-xs text-gray-300 space-y-4 list-decimal list-inside leading-relaxed">
                        <li>
                          <strong className="text-white">Choose Fabric Dimensions:</strong> Select from 9.50 MTR, 7.50 MTR BRT Lycra, or any custom types.
                        </li>
                        <li>
                          <strong className="text-white">Input KG weights:</strong> Enter total weight in kilograms (minimum orders are flexible).
                        </li>
                        <li>
                          <strong className="text-white">WhatsApp Dispatch:</strong> Submit opens WhatsApp immediately. Your data is pre-composed to prevent typographical errors.
                        </li>
                        <li>
                          <strong className="text-white">Rates negotiation:</strong> Owner Ramawatar Pareek responds instantly with rates card.
                        </li>
                      </ol>
                    </div>

                    <div className="border-t border-gray-800 pt-6 space-y-2 text-xs">
                      <p className="text-gray-400 flex items-center gap-1">
                        🟢 Active Whatsapp: <span className="font-bold text-white font-mono">{config.phoneNumber}</span>
                      </p>
                      <p className="text-emerald-400 text-[10px] font-bold font-mono">GST registrado: {config.gstNumber}</p>
                    </div>
                  </div>

                  {/* Form fields */}
                  <form onSubmit={handleSubmitOrderForm} className="lg:col-span-7 p-8 sm:p-10 space-y-5 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Your Full Name / नाम</label>
                        <input 
                          type="text" 
                          required
                          value={orderClientName}
                          onChange={e => setOrderClientName(e.target.value)}
                          className="w-full text-xs border border-gray-200 rounded-lg p-2.5 bg-gray-50/50"
                          placeholder="Ram Prasad Sharma"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Your Mobile Number / मोबाइल नं</label>
                        <input 
                          type="tel" 
                          required
                          value={orderClientPhone}
                          onChange={e => setOrderClientPhone(e.target.value)}
                          className="w-full text-xs border border-gray-200 rounded-lg p-2.5 bg-gray-50/50"
                          placeholder="e.g. +91 98765 43210"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Select Fabric SKU / कपड़ा प्रकार</label>
                        <select
                          value={orderProductName}
                          onChange={e => setOrderProductName(e.target.value)}
                          className="w-full text-xs border border-gray-200 rounded-lg p-2.5 bg-white shadow-sm"
                          required
                        >
                          <option value="">-- Choose Fabric Lot --</option>
                          {products.map(p => (
                            <option key={p.id} value={p.name}>{p.name}</option>
                          ))}
                          <option value="Custom Yarn Requirement">Sinks/Rib/Cotton Yarn counts</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Weight Required (KG) / वजन</label>
                        <input 
                          type="text" 
                          required
                          value={orderQty}
                          onChange={e => setOrderQty(e.target.value)}
                          className="w-full text-xs border border-gray-200 rounded-lg p-2.5 bg-gray-50/50 font-mono"
                          placeholder="E.g., 500 KG / 2 Tons"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Fabric Blend / Spandex Type</label>
                      <select
                        value={orderFabricType}
                        onChange={e => setOrderFabricType(e.target.value)}
                        className="w-full text-xs border border-gray-200 rounded-lg p-2.5 bg-white"
                      >
                        <option value="Bright Spandex Lycra">Bright Lycra (Lycra Spandex)</option>
                        <option value="Sinker Body Single Jersey">Cotton Sinker Body</option>
                        <option value="Interlock Knit Double Jersey">Interlock Double Knit</option>
                        <option value="Polyester BRT Thread">Polyester Bright Knit</option>
                        <option value="Rib Knit Fabric">Rib Knit (Collar/Cuff)</option>
                        <option value="Custom specification text">Custom Blend specified below</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Custom Notes / विशेष विवरण</label>
                      <textarea 
                        rows={3}
                        value={orderNotes}
                        onChange={e => setOrderNotes(e.target.value)}
                        className="w-full text-xs border border-gray-200 rounded-lg p-2.5 bg-gray-50/50"
                        placeholder="E.g., Mention color shade preferences, finishing bio wash request, tube diameter, or delivery landmark."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 cursor-pointer transition border-b-2 border-emerald-800"
                    >
                      <MessageCircleCode className="w-5 h-5 text-emerald-250 animate-bounce" />
                      <span>Generate & Open WhatsApp Order (व्हाट्सएप ऑर्डर भेजें)</span>
                    </button>
                    
                    <p className="text-[10px] text-gray-400 text-center uppercase tracking-wider">
                      ⚡ Direct connection • No middleman charges • Safe tax invoice options
                    </p>
                  </form>
                </div>

                {/* Simulated receipt logs for interactive preview */}
                {contactLogs.length > 0 && (
                  <div className="bg-white border rounded-2xl p-6 text-left space-y-3.5">
                    <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-indigo-600">Simulated Po Logs (Stored locally)</h4>
                    <div className="divide-y text-xs">
                      {contactLogs.map((log) => (
                        <div key={log.id} className="py-2.5 flex justify-between items-center bg-indigo-50/20 px-2 rounded-lg mb-1">
                          <div>
                            <span className="font-semibold text-gray-900">{log.clientName}</span> enquired about <span className="font-mono text-indigo-700 font-bold">{log.productName}</span>
                          </div>
                          <span className="text-[10px] text-gray-400 font-mono">Today, {log.timestamp} (WA Opened)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ==================== 7. YARN TRADING & BROKERAGE PAGE ==================== */}
            {activeTab === 'yarn' && (
              <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-16">
                
                {/* Header element */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">YARN TRADING HOUSE</span>
                  <h1 className="text-3xl font-extrabold text-gray-900">Yarn Trading & brokerage services</h1>
                  <p className="text-sm text-gray-500">
                    With deep connections spanning modern spinning mills in Gujarat, Dadra & Nagar Haveli, and Maharashtra, we align the best market rates for bulk fabric manufacturers.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <h3 className="text-2xl font-bold text-indigo-950">Reliable Cotton, Polyester & Lycra Thread Sourcing</h3>
                    
                    <p className="text-xs text-gray-650 leading-relaxed font-sans">
                      Our trade broker solutions are handled directly by proprietor <strong>Ramawatar Pareek</strong>. We handle bulk container procurement, domestic yarn delivery, customs coordinates check, and coordinate spot rates checks for spinning mills. Our portfolio covers carded, combed, and blended rings.
                    </p>

                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-gray-800 uppercase tracking-widest border-l-4 border-indigo-600 pl-2">Sourcing Categories Handled:</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-gray-600">
                        <div className="bg-white border p-3 rounded-lg flex items-center gap-2">
                          <span className="text-indigo-600 font-bold font-mono">1.</span>
                          <span>Combed Cotton Count: 30s, 34s, 40s</span>
                        </div>
                        <div className="bg-white border p-3 rounded-lg flex items-center gap-2">
                          <span className="text-indigo-600 font-bold font-mono">2.</span>
                          <span>Carded Cotton Count: 20s, 24s, 30s</span>
                        </div>
                        <div className="bg-white border p-3 rounded-lg flex items-center gap-2">
                          <span className="text-indigo-600 font-bold font-mono">3.</span>
                          <span>Bright Polyester (BRT Yarn): 75D, 150D</span>
                        </div>
                        <div className="bg-white border p-3 rounded-lg flex items-center gap-2">
                          <span className="text-indigo-600 font-bold font-mono">4.</span>
                          <span>Spandex & Cover Threads: 20D, 30D, 40D</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => triggerQuickBubbleChat('yarn')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase px-6 py-3.5 rounded-xl transition inline-flex items-center gap-2 cursor-pointer shadow shadow-indigo-100"
                      >
                        <MessageCircleCode className="w-4 h-4 text-indigo-200" />
                        <span>Enquire Card on Yarn Rates via Whatsapp</span>
                      </button>
                    </div>

                  </div>

                  <div className="lg:col-span-5 relative">
                    <div className="bg-white p-6 rounded-2xl border border-gray-150 space-y-5 text-left shadow-sm">
                      <div className="bg-indigo-950 text-white p-4.5 rounded-xl space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-300 font-mono">DAILY RATE SHEET</span>
                        <h4 className="text-base font-bold">Transparent Yarn Brokerage</h4>
                        <p className="text-[11px] text-gray-300">Mill direct pricing saves 2% to 4% on bulk counts over middlemen traders.</p>
                      </div>

                      <div className="space-y-2.5 text-xs text-gray-700">
                        <div className="flex justify-between border-b pb-1">
                          <strong className="text-gray-900 font-medium">Gujarat spinning lots</strong>
                          <span className="text-emerald-600 font-bold font-mono">Custom Rates Available</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <strong className="text-gray-900 font-medium">Bhiwandi dispatch counts</strong>
                          <span className="text-emerald-600 font-bold font-mono">Spot Rates Today</span>
                        </div>
                        <div className="flex justify-between pb-1">
                          <strong className="text-gray-900 font-medium">Silvassa local warehouse stock</strong>
                          <span className="text-emerald-600 font-bold font-mono">Checked Availability</span>
                        </div>
                      </div>

                      <p className="text-[10px] text-gray-400 leading-normal">
                        Note: Yarn rates change on the Mumbai Textile Exchange daily. Contact Ramawatar Pareek directly over WhatsApp to get the live active mill pricing sheets.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ==================== 8. MANUFACTURING PROCESS PAGE ==================== */}
            {activeTab === 'process' && (
              <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-16">
                
                {/* Heading element */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">QUALITY ACCREDITATION</span>
                  <h1 className="text-3xl font-extrabold text-gray-900">How we knit quality loops</h1>
                  <p className="text-sm text-gray-500">
                    A look inside Shree Shyam Multi Trade's manufacturing process flow, assuring zero lint issues and exact yield meter bounds in Amli factory.
                  </p>
                </div>

                {/* Step Timeline */}
                <div className="space-y-10 text-left relative before:absolute before:inset-0 before:left-6 before:md:left-1/2 before:w-0.5 before:bg-indigo-100 before:h-full">
                  
                  {/* Step 1 */}
                  <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6.5">
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold z-10 text-xs shadow-md">
                      1
                    </div>
                    
                    <div className="md:w-1/2 md:text-right md:pr-10 pl-12 md:pl-0 space-y-1.5">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest font-mono">Sourcing Checked</span>
                      <h3 className="text-base font-bold text-gray-900">Yarn Count inspection</h3>
                      <p className="text-xs text-gray-500 leading-normal">
                        Raw yarn enters our Silvassa warehouse facility. Moisture parameters and thread elasticity are tested on sample cones prior to loading.
                      </p>
                    </div>
                    
                    <div className="hidden md:block md:w-1/2 pl-10">
                      <img 
                        src="https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&w=400&q=80" 
                        alt="Yarn inspection stock" 
                        className="w-48 h-28 object-cover rounded-xl border"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center gap-6.5">
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold z-10 text-xs shadow-md">
                      2
                    </div>
                    
                    <div className="md:w-1/2 text-left md:pl-10 pl-12 space-y-1.5">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest font-mono">Machine Feeder Setup</span>
                      <h3 className="text-base font-bold text-gray-900">Needle Slot Calibration</h3>
                      <p className="text-xs text-gray-500 leading-normal">
                        Circular knitting machines are cleaned. Our engineers adjust feeder tension rods to fit 9.50 meter or 7.50 meter bright spandex requirements perfectly without loop holes.
                      </p>
                    </div>
                    
                    <div className="hidden md:block md:w-1/2 text-right pr-10">
                      <img 
                        src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=400&q=80" 
                        alt="Circular loom setup" 
                        className="w-48 h-28 object-cover rounded-xl border inline"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6.5">
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold z-10 text-xs shadow-md">
                      3
                    </div>
                    
                    <div className="md:w-1/2 md:text-right md:pr-10 pl-12 md:pl-0 space-y-1.5">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest font-mono">Continuous Looping</span>
                      <h3 className="text-base font-bold text-gray-900">Circular Knitting Loom Operation</h3>
                      <p className="text-xs text-gray-500 leading-normal">
                        Our circular machines operate continuously 24/7. High precision rotation yields flawless fabric mesh output, maintaining consistent stretch behavior.
                      </p>
                    </div>
                    
                    <div className="hidden md:block md:w-1/2 pl-10">
                      <img 
                        src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=80" 
                        alt="Circular process zoom" 
                        className="w-48 h-28 object-cover rounded-xl border"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center gap-6.5">
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold z-10 text-xs shadow-md">
                      4
                    </div>
                    
                    <div className="md:w-1/2 text-left md:pl-10 pl-12 space-y-1.5">
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest font-mono">Defect Elimination</span>
                      <h3 className="text-base font-bold text-gray-900">Light Glass Table verification</h3>
                      <p className="text-xs text-gray-500 leading-normal">
                        Knitted cloth is rolled out over industrial white light glass boxes. In-house quality checkers review every yard for yarn inconsistencies, thin spots, or grease stains.
                      </p>
                    </div>
                    
                    <div className="hidden md:block md:w-1/2 text-right pr-10">
                      <img 
                        src="https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=400&q=80" 
                        alt="Inspected cloth logs" 
                        className="w-48 h-28 object-cover rounded-xl border inline"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ==================== 9. ADDRESS & LOCATION PAGE ==================== */}
            {activeTab === 'location' && (
              <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-12">
                
                {/* Heading element */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">VISIT OUR FACTORY</span>
                  <h1 className="text-3xl font-extrabold text-gray-900">Find us in Silvassa Textile cluster</h1>
                  <p className="text-sm text-gray-500 font-sans">
                    Shree Shyam Multi Trade welcomes mill audits, dynamic cotton-buyers, garment manufacturers, and spinners to visit our circular knitting units.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Left address details panel */}
                  <div className="lg:col-span-5 bg-white border p-8 rounded-3xl shadow-sm text-left space-y-6">
                    <div>
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest font-mono">ADDRESS REGISTRATION DETAILS</span>
                      <h3 className="text-xl font-bold text-gray-900 mt-1 uppercase">{config.businessName}</h3>
                      <p className="text-xs text-gray-500 mt-1">First Floor GALA NO: 122, 123A & 123B</p>
                    </div>

                    <div className="space-y-4.5 text-xs text-gray-600 leading-relaxed font-sans">
                      <div className="flex gap-2.5 items-start">
                        <MapPin className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-gray-900 block font-bold mb-0.5 uppercase">Loom Yard Premises:</strong>
                          Tirupati Industrial Estate,<br />
                          66KVA Grid Station Road,<br />
                          Near 66KVA Grid Station,<br />
                          Amli, Silvassa - 396230,<br />
                          Dadra and Nagar Haveli and Daman and Diu Union Territory
                        </div>
                      </div>

                      <div className="flex gap-2.5 items-start border-t border-gray-100 pt-4">
                        <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-gray-900 block font-bold mb-0.5 uppercase">Call Proprietor:</strong>
                          <a href={`tel:${config.whatsAppNumber}`} className="font-mono font-bold text-sm text-indigo-600">{config.phoneNumber}</a>
                        </div>
                      </div>

                      <div className="flex gap-2.5 items-start border-t border-gray-100 pt-4">
                        <FileCheck className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-gray-900 block font-bold mb-0.5 uppercase">Verified GST Verification:</strong>
                          GSTIN: <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{config.gstNumber}</span>
                        </div>
                      </div>
                    </div>

                    {/* Maps navigation button */}
                    <div className="pt-2 border-t">
                      <a 
                        href="https://maps.google.com/?q=20.285484,72.998245"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase py-3 rounded-xl transition inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-indigo-100 shadow"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Navigate on Google Maps</span>
                      </a>
                    </div>
                  </div>

                  {/* Right map visual panel */}
                  <div className="lg:col-span-7 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm relative h-[450px]">
                    <div className="absolute top-8 left-8 right-8 z-10 bg-slate-900/90 backdrop-blur text-white p-4 rounded-2xl border border-gray-800 text-left">
                      <p className="text-xs font-bold text-indigo-400 font-mono uppercase tracking-widest">LIVE LOCATION COORDINATES</p>
                      <h4 className="text-sm font-extrabold mt-1">20.285484, 72.998245</h4>
                      <p className="text-[11px] text-gray-300 mt-1">Coordinates point exactly to Gala 122, Tirupati Ind. Estate near 66KVA Sub-Station, Amli. Ready for quick container freight loading.</p>
                    </div>

                    {/* Map Iframe representation */}
                    <iframe 
                      title="Shree Shyam Multi Trade GPS location plan"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3741.48834907106!2d72.996056315!3d20.285484000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDE3JzA3LjciTiA3MsKwNTknNTMuOCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                      className="w-full h-full rounded-2xl border-0 grayscale opacity-80"
                      allowFullScreen
                      loading="lazy"
                    />

                    {/* Secondary Map Overlay for Fallback */}
                    <div className="absolute bottom-8 left-8 right-8 z-10 bg-emerald-900 text-white p-3 rounded-xl flex items-center justify-between text-xs">
                      <span>Unable to view interactive frame?</span>
                      <a 
                        href="https://maps.google.com/?q=20.285484,72.998245"
                        target="_blank"
                        rel="noreferrer" 
                        className="underline font-bold hover:text-emerald-250 flex items-center gap-1"
                      >
                        <span>Open Map Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ==================== 10. CONTACT US PAGE ==================== */}
            {activeTab === 'contact' && (
              <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-16">
                
                {/* Heading element */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">get in touch</span>
                  <h1 className="text-3xl font-extrabold text-gray-900">Reach Shree Shyam Multi Trade</h1>
                  <p className="text-sm text-gray-500">
                    If you have questions regarding spandex yarn count pricing, circular loom dispatch timelines, billing options, or custom fabric knitting, contact Ramawatar Pareek.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Left contacts list */}
                  <div className="lg:col-span-4 bg-indigo-950 text-white p-8 sm:p-10 rounded-3xl text-left space-y-8 flex flex-col justify-between">
                    <div className="space-y-6">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono">CONTACT LIST</span>
                      <h3 className="text-lg font-bold">Fast Sourcing Hotlines</h3>

                      <div className="space-y-4 text-xs">
                        <div className="space-y-1">
                          <p className="text-gray-400">Call/WhatsApp (English & Hindi):</p>
                          <a href={`tel:${config.whatsAppNumber}`} className="text-emerald-400 text-base font-bold font-mono tracking-wide hover:underline block">
                            {config.phoneNumber}
                          </a>
                        </div>

                        <div className="space-y-1">
                          <p className="text-gray-400">Email Address:</p>
                          <a href={`mailto:${config.email}`} className="text-gray-200 text-sm font-mono hover:underline block break-all select-all">
                            {config.email}
                          </a>
                        </div>

                        <div className="space-y-1">
                          <p className="text-gray-400">Manufacturing Hours:</p>
                          <p className="text-gray-200 font-medium">Monday to Saturday: 9:00 AM — 8:00 PM</p>
                          <p className="text-gray-400">(Knitting machinery operates 24/7 in rotatory shifts)</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-indigo-900 text-xs text-indigo-300 space-y-2">
                      <p>Proprietor: <strong>Ramawatar Pareek</strong></p>
                      <p className="font-mono text-[11px] text-emerald-400">GSTIN: {config.gstNumber}</p>
                    </div>
                  </div>

                  {/* Contact Us Interactive Form */}
                  <div className="lg:col-span-8 bg-white border p-8 sm:p-10 rounded-3xl shadow-sm text-left">
                    <div className="bg-indigo-50/50 p-4 rounded-xl text-indigo-900 mb-6 text-xs flex justify-between items-center gap-2">
                      <span>💡 <strong>WhatsApp Sourcing Tool:</strong> Submitting formats and forwards information to WhatsApp automatically.</span>
                      <span className="bg-indigo-600 text-white text-[9px] px-2 py-0.5 rounded uppercase font-bold font-mono shrink-0">Real connection</span>
                    </div>

                    {/* Success notification */}
                    {feedbackSent && (
                      <div className="mb-6 p-4 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl text-xs font-semibold">
                        ✅ Success! Precomposed WhatsApp redirection completed. Owner receives the query instantly. Form data reset.
                      </div>
                    )}

                    <form onSubmit={handleSubmitContactForm} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1">Your Name / नाम *</label>
                          <input 
                            type="text" 
                            required
                            value={contactName}
                            onChange={e => setContactName(e.target.value)}
                            className="w-full text-xs border rounded-lg p-2.5 bg-gray-50/50"
                            placeholder="Anil Kumar"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1">Mobile No. *</label>
                          <input 
                            type="tel" 
                            required
                            value={contactPhone}
                            onChange={e => setContactPhone(e.target.value)}
                            className="w-full text-xs border rounded-lg p-2.5 bg-gray-50/50 font-mono"
                            placeholder="e.g. 9825000000"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-755 uppercase tracking-widest mb-1">Reason for Sourcing Contact</label>
                        <select
                          value={contactSubject}
                          onChange={e => setContactSubject(e.target.value)}
                          className="w-full text-xs border rounded-lg p-2.5 bg-white shadow-sm"
                        >
                          <option value="Fabric Rate Inquiry">Lycra Fabrics Rates & Yield Price Card</option>
                          <option value="Yarn Sourcing Coordinate">Yarn Counts Brokerage Support</option>
                          <option value="Audit Circular Mill">Circular Knitting Machine Audit Booking</option>
                          <option value="Custom Yarn sample request">Request custom Loom blend swatches</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1">Requirement details / विशेष विवरण *</label>
                        <textarea 
                          rows={4}
                          required
                          value={contactMsg}
                          onChange={e => setContactMsg(e.target.value)}
                          className="w-full text-xs border rounded-lg p-2.5 bg-gray-50/50"
                          placeholder="Provide target yarn specifications, roll weight required, preferred delivery timeline..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md shadow-indigo-150 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-4 h-4 text-indigo-300" />
                        <span>Send WhatsApp Inquiry (व्हाट्सएप पर जानकारी भेजें)</span>
                      </button>
                    </form>
                  </div>
                </div>

                {/* Indiamart & Tradeindia placeholder visual badges */}
                <div className="bg-slate-50 border border-gray-250 p-6 rounded-3xl max-w-xl mx-auto space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 font-mono">B2B Directory Integrations</h4>
                  <div className="flex flex-wrap items-center justify-around gap-4">
                    <a 
                      href={config.indiamartUrl}
                      target="_blank" 
                      rel="noreferrer"
                      className="whitespace-nowrap flex items-center bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-800 hover:text-indigo-600 hover:bg-gray-100 transition shadow-sm"
                    >
                      <span>🔥 View on IndiaMart Directory</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-1.5 text-gray-400" />
                    </a>
                    
                    <a 
                      href={config.tradeindiaUrl}
                      target="_blank" 
                      rel="noreferrer"
                      className="whitespace-nowrap flex items-center bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-xs font-bold text-indigo-900 hover:text-indigo-600 hover:bg-gray-100 transition shadow-sm"
                    >
                      <span>📦 View on TradeIndia Catalog</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-1.5 text-gray-400" />
                    </a>
                  </div>
                </div>

              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer element */}
      <Footer config={config} setActiveTab={handleTriggerSelectProduct} />

      {/* Global Admin config Panel Modal overlay */}
      <AdminConfigModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        products={products}
        gallery={gallery}
        videos={videos}
        onSaveConfig={handleSaveConfig}
        onAddGalleryItem={handleAddGalleryItem}
        onAddVideoItem={handleAddVideoItem}
        onAddProduct={handleAddProduct}
        onRemoveGalleryItem={handleRemoveGalleryItem}
        onRemoveVideoItem={handleRemoveVideoItem}
        onRemoveProduct={handleRemoveProduct}
      />

      {/* Dynamic Image Magnifier Modal overlay */}
      {selectedGalleryItem && (
        <ImageModal
          item={selectedGalleryItem}
          onClose={() => setSelectedGalleryItem(null)}
          whatsAppConfigNum={config.whatsAppNumber}
        />
      )}

      {/* ==================== GLOBAL WHATSAPP FLOATING BUBBLE ==================== */}
      <div className="fixed bottom-6 right-6 z-40 select-none flex flex-col items-end gap-3 font-sans">
        
        {/* Friendly greeting bubble menu */}
        <AnimatePresence>
          {isWAPopoverOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white border text-gray-990 rounded-2xl p-5 shadow-2xl max-w-xs w-72 text-left border-gray-100 space-y-4"
            >
              <div className="flex items-center gap-2.5 border-b pb-2.5">
                <div className="relative">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <MessageCircleCode className="w-5 h-5 shrink-0" />
                  </div>
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 leading-none">Shree Shyam Live Support</h4>
                  <span className="text-[10px] text-emerald-500 font-semibold font-mono mt-0.5 inline-block">Online • Ramawatar Pareek</span>
                </div>
              </div>

              <p className="text-[11px] text-gray-500 leading-normal">
                Namaste! Select a topic below to chat with the proprietor instantly.
              </p>

              <div className="space-y-1.5">
                <button
                  onClick={() => triggerQuickBubbleChat('fabric')}
                  className="w-full text-left bg-gray-50 hover:bg-indigo-50 border hover:border-indigo-150 p-2 rounded-xl text-xs font-medium text-gray-700 hover:text-indigo-900 transition flex justify-between items-center cursor-pointer"
                >
                  <span>🧵 Lycra Fabric Pricing</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </button>
                <button
                  onClick={() => triggerQuickBubbleChat('yarn')}
                  className="w-full text-left bg-gray-50 hover:bg-indigo-50 border hover:border-indigo-150 p-2 rounded-xl text-xs font-medium text-gray-700 hover:text-indigo-900 transition flex justify-between items-center cursor-pointer"
                >
                  <span>🏭 Sourcing Count Brokerage</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </button>
                <button
                  onClick={() => triggerQuickBubbleChat('general')}
                  className="w-full text-left bg-gray-50 hover:bg-indigo-50 border hover:border-indigo-150 p-2 rounded-xl text-xs font-medium text-gray-700 hover:text-indigo-900 transition flex justify-between items-center cursor-pointer"
                >
                  <span>👋 General Greetings</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>

              <div className="text-[10px] text-gray-400 leading-tight">
                Verified Address: Tirupati Ind. Estate, Silvassa
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating circular green button */}
        <button
          type="button"
          onClick={() => setIsWAPopoverOpen(!isWAPopoverOpen)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-emerald-700/30 hover:scale-105 transition duration-200 outline-none relative cursor-pointer group"
          title="Chat with Ramawatar Pareek"
        >
          <MessageCircleCode className="w-7 h-7 fill-emerald-100/10 stroke-[2] group-hover:rotate-12 transition-transform" />
          
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 text-[9px] font-extrabold text-white items-center justify-center leading-none">1</span>
          </span>
        </button>

      </div>

    </div>
  );
}
