/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Save, 
  RefreshCcw, 
  Smartphone, 
  Mail, 
  MapPin, 
  Hash, 
  Plus, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  FileText,
  User,
  CheckCircle,
  AlertCircle,
  Trash2
} from 'lucide-react';
import { BusinessConfig, GalleryItem, VideoItem, ProductSpec } from '../types';

interface AdminConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BusinessConfig;
  products: ProductSpec[];
  gallery: GalleryItem[];
  videos: VideoItem[];
  onSaveConfig: (updated: BusinessConfig) => void;
  onAddGalleryItem: (item: GalleryItem) => void;
  onAddVideoItem: (item: VideoItem) => void;
  onAddProduct: (item: ProductSpec) => void;
  onRemoveGalleryItem: (id: string) => void;
  onRemoveVideoItem: (id: string) => void;
  onRemoveProduct: (id: string) => void;
}

export default function AdminConfigModal({
  isOpen,
  onClose,
  config,
  products,
  gallery,
  videos,
  onSaveConfig,
  onAddGalleryItem,
  onAddVideoItem,
  onAddProduct,
  onRemoveGalleryItem,
  onRemoveVideoItem,
  onRemoveProduct
}: AdminConfigModalProps) {
  // Authentication states (private and not output publicly)
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isLogged, setIsLogged] = useState(() => {
    return sessionStorage.getItem('shyam_admin_locked') === 'unlocked-pareek';
  });
  const [loginError, setLoginError] = useState('');

  // Business Config fields
  const [businessName, setBusinessName] = useState(config.businessName);
  const [tagline, setTagline] = useState(config.tagline);
  const [ownerName, setOwnerName] = useState(config.ownerName);
  const [whatsAppNumber, setWhatsAppNumber] = useState(config.whatsAppNumber);
  const [phoneNumber, setPhoneNumber] = useState(config.phoneNumber);
  const [email, setEmail] = useState(config.email);
  const [gstNumber, setGstNumber] = useState(config.gstNumber);
  const [addressLine1, setAddressLine1] = useState(config.addressLine1);
  const [addressPremises, setAddressPremises] = useState(config.addressPremises);
  const [addressRoad, setAddressRoad] = useState(config.addressRoad);
  const [addressLandmark, setAddressLandmark] = useState(config.addressLandmark);
  const [addressLocality, setAddressLocality] = useState(config.addressLocality);
  const [addressCity, setAddressCity] = useState(config.addressCity);
  const [addressState, setAddressState] = useState(config.addressState);
  const [pinCode, setPinCode] = useState(config.pinCode);

  // Active form section
  const [activeTab, setActiveTab] = useState<'business' | 'add-photo' | 'add-video' | 'add-product'>('business');
  
  // Feedback message
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Add Custom Gallery form state
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryHindiTitle, setGalleryHindiTitle] = useState('');
  const [galleryCategory, setGalleryCategory] = useState<'fabrics' | 'yarn' | 'machinery' | 'production'>('fabrics');
  const [galleryUrl, setGalleryUrl] = useState('');
  const [galleryDesc, setGalleryDesc] = useState('');

  // Add Custom Video form state
  const [videoTitle, setVideoTitle] = useState('');
  const [videoHindiTitle, setVideoHindiTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('https://www.w3schools.com/html/mov_bbb.mp4');
  const [videoThumbnailUrl, setVideoThumbnailUrl] = useState('');
  const [videoDuration, setVideoDuration] = useState('1:30');
  const [videoDesc, setVideoDesc] = useState('');

  // Add Custom Product form state
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodHindiDesc, setProdHindiDesc] = useState('');
  const [prodYield, setProdYield] = useState('6.00 MTR/KG');
  const [prodComp, setProdComp] = useState('Cotton/Polyester Blend + Lycra');
  const [prodGsm, setProdGsm] = useState('200 GSM');
  const [prodUrl, setProdUrl] = useState('');

  if (!isOpen) return null;

  if (!isLogged) {
    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (usernameInput === 'Shreeshaymmultitrade' && passwordInput === 'Praveen@5187') {
        setIsLogged(true);
        sessionStorage.setItem('shyam_admin_locked', 'unlocked-pareek');
        setLoginError('');
      } else {
        setLoginError('Incorrect credentials. Please verify your administrator username and password.');
      }
    };

    return (
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 flex flex-col font-sans">
          <div className="p-8 pb-5 text-center bg-slate-50 border-b border-gray-150 relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-1 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-900 hover:bg-gray-200/60 rounded-lg transition"
            >
              <X className="w-4 h-4 inline" /> Close
            </button>
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-indigo-100 shadow-sm">
              <User className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Admin Control Login</h3>
            <p className="text-xs text-slate-500 mt-1">Shree Shyam Multi Trade Secure Terminal</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="p-8 space-y-4">
            {loginError && (
              <div className="p-3 bg-rose-50 text-rose-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-rose-100">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Username</label>
              <input 
                type="text"
                autoComplete="username"
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                placeholder="Enter admin username"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Password</label>
              <input 
                type="password"
                autoComplete="current-password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-sm font-semibold transition shadow-md hover:shadow-lg mt-2 cursor-pointer text-center"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig({
      ...config,
      businessName,
      tagline,
      ownerName,
      whatsAppNumber,
      phoneNumber,
      email,
      gstNumber,
      addressLine1,
      addressPremises,
      addressRoad,
      addressLandmark,
      addressLocality,
      addressCity,
      addressState,
      pinCode
    });
    showStatus("Business settings saved successfully!", "success");
  };

  const handleAddGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle || !galleryUrl) {
      showStatus("Please enter a title and photo URL.", "error");
      return;
    }
    const newItem: GalleryItem = {
      id: `gal-custom-${Date.now()}`,
      title: galleryTitle,
      hindiTitle: galleryHindiTitle || undefined,
      category: galleryCategory,
      imageUrl: galleryUrl,
      description: galleryDesc || `${galleryCategory} photography - loaded by Admin`,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    onAddGalleryItem(newItem);
    showStatus(`Photo added successfully to ${galleryCategory} gallery!`, "success");
    // reset form
    setGalleryTitle('');
    setGalleryHindiTitle('');
    setGalleryUrl('');
    setGalleryDesc('');
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle) {
      showStatus("Please enter a video title.", "error");
      return;
    }
    const thumb = videoThumbnailUrl || "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=400&q=80";
    const newItem: VideoItem = {
      id: `vid-custom-${Date.now()}`,
      title: videoTitle,
      hindiTitle: videoHindiTitle || undefined,
      videoUrl: videoUrl,
      thumbnailUrl: thumb,
      duration: videoDuration,
      description: videoDesc || "Simulated textile production video feed."
    };
    onAddVideoItem(newItem);
    showStatus("Video listing uploaded successfully!", "success");
    setVideoTitle('');
    setVideoHindiTitle('');
    setVideoUrl('https://www.w3schools.com/html/mov_bbb.mp4');
    setVideoThumbnailUrl('');
    setVideoDesc('');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName) {
      showStatus("Please provide a product name.", "error");
      return;
    }
    const defaultProductImg = prodUrl || "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80";
    const newProduct: ProductSpec = {
      id: `prod-custom-${Date.now()}`,
      name: prodName,
      category: "fabrics",
      description: prodDesc || "Custom fabric knitted of quality yarns with premium stretch response.",
      hindiDescription: prodHindiDesc || undefined,
      imageUrl: defaultProductImg,
      specifications: [
        { key: "Yield / Grammage", value: prodYield },
        { key: "Composition", value: prodComp },
        { key: "Suggested GSM", value: prodGsm },
        { key: "Quality Tier", value: "Premium Grade A" }
      ],
      isPopular: true
    };
    onAddProduct(newProduct);
    showStatus(`Product "${prodName}" added to catalog successfully!`, "success");
    setProdName('');
    setProdDesc('');
    setProdHindiDesc('');
    setProdYield('6.00 MTR/KG');
    setProdComp('Cotton/Polyester Blend + Lycra');
    setProdGsm('200 GSM');
    setProdUrl('');
  };

  const showStatus = (text: string, type: 'success' | 'error') => {
    setStatusMsg({ text, type });
    setTimeout(() => {
      setStatusMsg(null);
    }, 4500);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-gray-100">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Owner Control & Admin Portal</h3>
              <p className="text-xs text-gray-500 font-mono">GSTIN: {config.gstNumber} | Private Dashboard</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-900 hover:bg-gray-200/60 rounded-lg transition"
          >
            <X className="w-4 h-4 inline mr-1" /> Close
          </button>
        </div>

        {/* Dynamic Status Banner */}
        {statusMsg && (
          <div className={`p-3 text-sm flex items-center gap-2 font-medium ${
            statusMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
          }`}>
            {statusMsg.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            {statusMsg.text}
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex border-b border-gray-100 bg-gray-50/50 text-sm overflow-x-auto shrink-0">
          <button 
            type="button"
            onClick={() => setActiveTab('business')}
            className={`px-5 py-3.5 font-medium border-b-2 transition shrink-0 ${
              activeTab === 'business' 
                ? 'border-indigo-600 bg-white text-indigo-600' 
                : 'border-transparent text-gray-600 hover:text-indigo-600 hover:bg-gray-100/40'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-1.5" /> Business Info
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('add-product')}
            className={`px-5 py-3.5 font-medium border-b-2 transition shrink-0 ${
              activeTab === 'add-product' 
                ? 'border-indigo-600 bg-white text-indigo-600' 
                : 'border-transparent text-gray-600 hover:text-indigo-600 hover:bg-gray-100/40'
            }`}
          >
            <CheckCircle className="w-4 h-4 inline mr-1.5" /> Add New Fabric
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('add-photo')}
            className={`px-5 py-3.5 font-medium border-b-2 transition shrink-0 ${
              activeTab === 'add-photo' 
                ? 'border-indigo-600 bg-white text-indigo-600' 
                : 'border-transparent text-gray-600 hover:text-indigo-600 hover:bg-gray-100/40'
            }`}
          >
            <ImageIcon className="w-4 h-4 inline mr-1.5" /> Fabric Gallery Upload
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('add-video')}
            className={`px-5 py-3.5 font-medium border-b-2 transition shrink-0 ${
              activeTab === 'add-video' 
                ? 'border-indigo-600 bg-white text-indigo-600' 
                : 'border-transparent text-gray-600 hover:text-indigo-600 hover:bg-gray-100/40'
            }`}
          >
            <VideoIcon className="w-4 h-4 inline mr-1.5" /> Add Machine Video
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: Business config */}
          {activeTab === 'business' && (
            <form onSubmit={handleSaveConfig} className="space-y-5">
              <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-xs space-y-1">
                <p className="font-semibold">💡 Smart WhatsApp Sourcing Bridge:</p>
                <p>The system routes all customer orders dynamically using the active WhatsApp number below. Changing this updates every button on all 10 pages immediately!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">Company Name</label>
                  <input 
                    type="text" 
                    value={businessName} 
                    onChange={e => setBusinessName(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="E.g., Shree Shyam Multi Trade"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">Business Owner Name</label>
                  <input 
                    type="text" 
                    value={ownerName} 
                    onChange={e => setOwnerName(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Ramawatar Pareek"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">Tagline</label>
                <input 
                  type="text" 
                  value={tagline} 
                  onChange={e => setTagline(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Slogan"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold  text-gray-700 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-emerald-500" /> WhatsApp Number (Raw digits)
                  </label>
                  <input 
                    type="text" 
                    value={whatsAppNumber} 
                    onChange={e => setWhatsAppNumber(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg p-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="E.g., 919825126859"
                    required
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Start with Country Code (e.g. 91 for India), no spaces or +</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-indigo-500" /> Display Contact Number
                  </label>
                  <input 
                    type="text" 
                    value={phoneNumber} 
                    onChange={e => setPhoneNumber(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="+91 98251 26859"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-sky-500" /> Contact Email
                  </label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Email Address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <Hash className="w-3 h-3 text-purple-500" /> GSTIN Number
                  </label>
                  <input 
                    type="text" 
                    value={gstNumber} 
                    onChange={e => setGstNumber(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg p-2.5 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="26ALIPP..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">Postal PIN Code</label>
                  <input 
                    type="text" 
                    value={pinCode} 
                    onChange={e => setPinCode(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg p-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="396230"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-800 border-b pb-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-rose-500" /> Manufacturing Location Address (Silvassa)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="block text-xs text-gray-500 mb-0.5">Floor & Apartment No.</label>
                    <input 
                      type="text" 
                      value={addressLine1} 
                      onChange={e => setAddressLine1(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-0.5">Premises / Industry Estate</label>
                    <input 
                      type="text" 
                      value={addressPremises} 
                      onChange={e => setAddressPremises(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-0.5">Road / Area</label>
                    <input 
                      type="text" 
                      value={addressRoad} 
                      onChange={e => setAddressRoad(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-0.5">Landmark</label>
                    <input 
                      type="text" 
                      value={addressLandmark} 
                      onChange={e => setAddressLandmark(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-0.5">Locality</label>
                    <input 
                      type="text" 
                      value={addressLocality} 
                      onChange={e => setAddressLocality(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-0.5">City/Town</label>
                    <input 
                      type="text" 
                      value={addressCity} 
                      onChange={e => setAddressCity(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded-md p-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-0.5">State Or Union Territory</label>
                  <input 
                    type="text" 
                    value={addressState} 
                    onChange={e => setAddressState(e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded-md p-2"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t">
                <button 
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Save Business Directory
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Add Product */}
          {activeTab === 'add-product' && (
            <div className="space-y-8">
              <form onSubmit={handleAddProduct} className="space-y-5">
              <div className="bg-indigo-50/50 p-4 rounded-xl">
                <h4 className="font-semibold text-indigo-900 text-sm mb-1">Add Fabric to Catalog</h4>
                <p className="text-xs text-indigo-700">Creates a new live product with pricing yield, picture, and instant buy triggers.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">Product Name / Dimension</label>
                  <input 
                    type="text"
                    value={prodName}
                    onChange={e => setProdName(e.target.value)}
                    className="w-full text-sm border rounded-lg p-2.5"
                    placeholder="E.g., 8.00 MTR BRT Lycra"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">Fabric Yield Meterage</label>
                  <input 
                    type="text"
                    value={prodYield}
                    onChange={e => setProdYield(e.target.value)}
                    className="w-full text-sm border rounded-lg p-2.5"
                    placeholder="E.g., 8.00 MTR/KG"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">Suggested GSM weight</label>
                  <input 
                    type="text"
                    value={prodGsm}
                    onChange={e => setProdGsm(e.target.value)}
                    className="w-full text-sm border rounded-lg p-2.5"
                    placeholder="E.g., 180 GSM"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">Thread Composition & Mix</label>
                  <input 
                    type="text"
                    value={prodComp}
                    onChange={e => setProdComp(e.target.value)}
                    className="w-full text-sm border rounded-lg p-2.5"
                    placeholder="E.g., 92% Polyester + 8% Spandex"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">Product Photo URL</label>
                <input 
                  type="url"
                  value={prodUrl}
                  onChange={e => setProdUrl(e.target.value)}
                  className="w-full text-sm border rounded-lg p-2.5 font-mono"
                  placeholder="https://images.unsplash.com/photo-..."
                />
                <p className="text-[10px] text-gray-400 mt-1">Leave empty to use high grade textile default placeholder image</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">English Description</label>
                <textarea 
                  value={prodDesc}
                  onChange={e => setProdDesc(e.target.value)}
                  rows={2}
                  className="w-full text-sm border rounded-lg p-2.5"
                  placeholder="Provide technical specifications, gauge description, weight rolls, etc."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">Hindi Description / हिंदी विवरण (Optional)</label>
                <input 
                  type="text"
                  value={prodHindiDesc}
                  onChange={e => setProdHindiDesc(e.target.value)}
                  className="w-full text-sm border rounded-lg p-2.5"
                  placeholder="E.g., 8.00 मीटर उच्च गुणवत्ता लाइक्रा कपड़ा"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t">
                <button 
                  type="button" 
                  onClick={() => setActiveTab('business')} 
                  className="px-4 py-2 border rounded-lg text-sm text-gray-500 hover:bg-gray-50"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add to Product Catalog
                </button>
              </div>
            </form>

            {/* Existing Products Deletion Section */}
            <div className="mt-8 pt-8 border-t border-gray-150">
              <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-rose-500" /> Manage / Remove Fabric Products
              </h4>
              <p className="text-[11px] text-slate-500 mb-3">Below are the fabric products currently displayed on the catalog pages. Clicking delete will remove them from show catalog immediately.</p>
              {products.length === 0 ? (
                <p className="text-xs text-gray-500">No fabric products available in catalog.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {products.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-xl hover:bg-slate-50 transition bg-white text-xs">
                      <div className="flex items-center gap-3 min-w-0">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-10 h-10 object-cover rounded-md border shrink-0" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-800 truncate">{item.name}</p>
                          <p className="text-[10px] text-zinc-500 font-mono">
                            {item.specifications.find(s => s.key === "Suggested GSM")?.value || "Lycra Swatch"}
                          </p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => {
                          if (confirm(`Are you sure you want to remove the fabric product "${item.name}"?`)) {
                            onRemoveProduct(item.id);
                            showStatus(`Removed "${item.name}" successfully from catalog.`, "success");
                          }
                        }}
                        className="p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-700 rounded-lg transition"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: Add Photo Metadata */}
        {activeTab === 'add-photo' && (
          <div className="space-y-8">
            <form onSubmit={handleAddGallery} className="space-y-5">
              <div className="bg-sky-50 p-4 rounded-xl">
                <h4 className="font-semibold text-sky-900 text-sm mb-1">Add Dynamic Photo Item</h4>
                <p className="text-xs text-sky-700">Submit fabric, yarn, or machine pictures. It automatically synchronizes to the Product Gallery immediately.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">Photo Title</label>
                <input 
                  type="text"
                  value={galleryTitle}
                  onChange={e => setGalleryTitle(e.target.value)}
                  className="w-full text-sm border rounded-lg p-2.5"
                  placeholder="E.g., Knitted Rib Fabric Swatches"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">Hindi Title / हिंदी शीर्षक</label>
                  <input 
                    type="text"
                    value={galleryHindiTitle}
                    onChange={e => setGalleryHindiTitle(e.target.value)}
                    className="w-full text-sm border rounded-lg p-2.5"
                    placeholder="E.g., रिब कपड़ा नमूना"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">Classification Category</label>
                  <select
                    value={galleryCategory}
                    onChange={e => setGalleryCategory(e.target.value as any)}
                    className="w-full text-sm border rounded-lg p-2.5 bg-white"
                  >
                    <option value="fabrics">Fabrics / क्लॉथ</option>
                    <option value="yarn">Yarn spools / सूत धागा</option>
                    <option value="machinery">Circular Machines / मशीनरी</option>
                    <option value="production">Production & Dispatch / उत्पादन कार्य</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">Image Address URL</label>
                <input 
                  type="url"
                  value={galleryUrl}
                  onChange={e => setGalleryUrl(e.target.value)}
                  className="w-full text-sm border rounded-lg p-2.5 font-mono"
                  placeholder="https://images.unsplash.com/photo-..."
                  required
                />
                <p className="text-[10px] text-gray-400 mt-1">Provide any public image URL or paste an Unsplash textile link.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1 font-mono text-gray-500">Caption / Description</label>
                <textarea 
                  value={galleryDesc}
                  onChange={e => setGalleryDesc(e.target.value)}
                  rows={2}
                  className="w-full text-sm border rounded-lg p-2.5"
                  placeholder="Describe the fabric roll, custom weight, yarn sourcing details, or loom setup..."
                />
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t">
                <button 
                  type="button" 
                  onClick={() => setActiveTab('business')} 
                  className="px-4 py-2 border rounded-lg text-sm text-gray-500"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Save Photo to Gallery
                </button>
              </div>
            </form>

            {/* Existing Gallery Photos Deletion Section */}
            <div className="mt-8 pt-8 border-t border-gray-150">
              <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-rose-500" /> Manage / Remove Gallery Photos
              </h4>
              <p className="text-[11px] text-slate-500 mb-3">Below are the images currently displayed in the gallery sections. You can remove any image from display by clicking the remove button.</p>
              {gallery.length === 0 ? (
                <p className="text-xs text-gray-500">No gallery photos found.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {gallery.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-xl hover:bg-slate-50 transition bg-white text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-10 h-10 object-cover rounded-md border shrink-0" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-800 truncate">{item.title}</p>
                          <p className="text-[10px] text-zinc-400 font-mono capitalize">{item.category}</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => {
                          if (confirm(`Are you sure you want to remove the photo "${item.title}" from the gallery?`)) {
                            onRemoveGalleryItem(item.id);
                            showStatus(`Removed "${item.title}" successfully.`, "success");
                          }
                        }}
                        className="p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-700 rounded-lg transition"
                        title="Delete Photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: Add Video */}
        {activeTab === 'add-video' && (
          <div className="space-y-8">
            <form onSubmit={handleAddVideo} className="space-y-5">
              <div className="bg-purple-50 p-4 rounded-xl">
                <h4 className="font-semibold text-purple-900 text-sm mb-1">Add Textile Video Slot</h4>
                <p className="text-xs text-purple-700">Creates a video card. It will render in the Video Gallery and play directly when clicked.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">Video Title</label>
                  <input 
                    type="text"
                    value={videoTitle}
                    onChange={e => setVideoTitle(e.target.value)}
                    className="w-full text-sm border rounded-lg p-2.5"
                    placeholder="Circular machine in motion"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">Video Duration</label>
                  <input 
                    type="text"
                    value={videoDuration}
                    onChange={e => setVideoDuration(e.target.value)}
                    className="w-full text-sm border rounded-lg p-2.5"
                    placeholder="E.g., 2:15"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">Hindi Title (Optional)</label>
                  <input 
                    type="text"
                    value={videoHindiTitle}
                    onChange={e => setVideoHindiTitle(e.target.value)}
                    className="w-full text-sm border rounded-lg p-2.5"
                    placeholder="मशीन कार्य प्रदर्शन"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">Video Source URL (MP4 Format)</label>
                  <input 
                    type="text"
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                    className="w-full text-sm border rounded-lg p-2.5 font-mono text-xs"
                    placeholder="Simulated fallback mp4 URL"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">Thumbnail Cover URL</label>
                <input 
                  type="url"
                  value={videoThumbnailUrl}
                  onChange={e => setVideoThumbnailUrl(e.target.value)}
                  className="w-full text-sm border rounded-lg p-2.5 font-mono"
                  placeholder="https://images.unsplash.com/photo-..."
                />
                <p className="text-[10px] text-gray-400 mt-1">Leave empty to auto-load an industrial placeholder image</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">Video Description</label>
                <textarea 
                  value={videoDesc}
                  onChange={e => setVideoDesc(e.target.value)}
                  rows={2}
                  className="w-full text-sm border rounded-lg p-2.5"
                  placeholder="Short brief of what is demonstrated in the video..."
                />
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t">
                <button 
                  type="button" 
                  onClick={() => setActiveTab('business')} 
                  className="px-4 py-2 border rounded-lg text-sm text-gray-500"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Save Video listing
                </button>
              </div>
            </form>

            {/* Existing Videos Deletion Section */}
            <div className="mt-8 pt-8 border-t border-gray-150">
              <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-rose-500" /> Manage / Remove Machinery Videos
              </h4>
              <p className="text-[11px] text-slate-500 mb-3">Below are the machinery or factory clips currently listed. You can delete any video listing by clicking the remove button.</p>
              {videos.length === 0 ? (
                <p className="text-xs text-gray-500">No machinery video clips listed.</p>
              ) : (
                <div className="space-y-3">
                  {videos.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-xl hover:bg-slate-50 transition bg-white text-xs">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.thumbnailUrl} 
                          alt={item.title} 
                          className="w-12 h-10 object-cover rounded-md border shrink-0" 
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-semibold text-slate-800">{item.title}</p>
                          <p className="text-[10px] text-zinc-500 font-mono">Duration: {item.duration}</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => {
                          if (confirm(`Are you sure you want to remove the video listing "${item.title}"?`)) {
                            onRemoveVideoItem(item.id);
                            showStatus(`Removed "${item.title}" successfully.`, "success");
                          }
                        }}
                        className="p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-700 rounded-lg transition"
                        title="Delete Video Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
}
