/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BusinessConfig {
  businessName: string;
  tagline: string;
  ownerName: string;
  whatsAppNumber: string; // E.g., "+919825126859"
  phoneNumber: string;    // E.g., "+919825126859"
  email: string;
  gstNumber: string;
  addressLine1: string;
  addressPremises: string;
  addressRoad: string;
  addressLandmark: string;
  addressLocality: string;
  addressCity: string;
  addressState: string;
  pinCode: string;
  mapEmbedUrl: string;
  indiamartUrl?: string;
  tradeindiaUrl?: string;
}

export interface ProductSpec {
  id: string;
  name: string;
  category: 'fabrics' | 'yarn';
  description: string;
  hindiDescription?: string;
  specifications: { key: string; value: string }[];
  imageUrl: string;
  isPopular?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  hindiTitle?: string;
  category: 'fabrics' | 'yarn' | 'machinery' | 'production';
  imageUrl: string;
  description: string;
  dateAdded: string;
}

export interface VideoItem {
  id: string;
  title: string;
  hindiTitle?: string;
  videoUrl: string; // Simulated link or youtube link
  thumbnailUrl: string;
  duration: string;
  description: string;
}

// Default Business Config
export const DEFAULT_BUSINESS_CONFIG: BusinessConfig = {
  businessName: "Shree Shyam Multi Trade",
  tagline: "Manufacturer of Quality Knitted Fabrics & Yarn Trading Solutions",
  ownerName: "Ramawatar Pareek",
  whatsAppNumber: "919825126859", // Raw digits for wa.me/919825126859
  phoneNumber: "+91 98251 26859",
  email: "shreeshyammultitrade@gmail.com",
  gstNumber: "26ALIPP3828J1ZQ",
  addressLine1: "Floor No.: FIRST FLOOR",
  addressPremises: "GALA NO 122, 123A AND 123B, TIRUPATI INDUSTRIAL ESTATE",
  addressRoad: "66KVA GRID STATION ROAD",
  addressLandmark: "NEAR 66KVA GRID STATION",
  addressLocality: "Amli",
  addressCity: "Silvassa",
  addressState: "Dadra and Nagar Haveli and Daman and Diu",
  pinCode: "396230",
  mapEmbedUrl: "https://maps.google.com/?q=20.285484,72.998245",
  indiamartUrl: "https://www.indiamart.com/shree-shyam-multi-trade/",
  tradeindiaUrl: "https://www.tradeindia.com/shree-shyam-multi-trade/"
};

// Default product list matching the user specifications exactly
export const DEFAULT_PRODUCTS: ProductSpec[] = [
  {
    id: "prod-1",
    name: "9.50 MTR BRT Lycra",
    category: "fabrics",
    description: "Premium Bright (BRT) Lycra fabric with exactly 9.50 meters yield per kilogram. Highly stretchable, durable, and suitable for high-end activewear, t-shirts, and sportswear.",
    hindiDescription: "9.50 मीटर ब्राइट लाइक्रा कपड़ा - अत्यधिक खिंचावदार, खेल-कूद और टी-शर्ट के लिए सर्वोत्तम।",
    specifications: [
      { key: "Yield / Grammage", value: "9.50 MTR/KG" },
      { key: "Composition", value: "Bright Polyester + Spandex / Lycra Blend" },
      { key: "Width / Diameter", value: "32 to 36 Inch Tube or 72 Inch Open Width" },
      { key: "Suggested GSM", value: "140 - 160 GSM" },
      { key: "Usage", value: "Sportswear, Activewear, T-shirts, Indian innerwear" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80",
    isPopular: true
  },
  {
    id: "prod-2",
    name: "7.50 MTR BRT Lycra",
    category: "fabrics",
    description: "Standard Bright Lycra fabric with 7.50 meters yield per kilogram. Offers optimal density and balanced fabric thickness for leggings, track pants, and athleisure garments.",
    hindiDescription: "7.50 मीटर ब्राइट लाइक्रा कपड़ा - मजबूत इलास्टिसिटी, लेगिंग्स और ट्रैक पैंट के लिए उपयुक्त।",
    specifications: [
      { key: "Yield / Grammage", value: "7.50 MTR/KG" },
      { key: "Composition", value: "Polyester BRT + premium Spandex" },
      { key: "Width / Diameter", value: "30 to 34 Inch Tubular / Circular" },
      { key: "Suggested GSM", value: "170 - 190 GSM" },
      { key: "Feel", value: "Rich, smooth finish with high recovery percentage" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    isPopular: true
  },
  {
    id: "prod-3",
    name: "5.00 MTR Lycra",
    category: "fabrics",
    description: "Heavy-duty Lycra knit fabric with exactly 5.00 meters yield per kilogram. Exceptionally sturdy with rich hand-feel, ideal for thermal wear, thicker winterwear, and structured garments.",
    hindiDescription: "5.00 मीटर हैवी लाइक्रा कपड़ा - मोटा आरामदायक कपड़ा, थर्मल इनर और जैकेट के लिए अनुकूल।",
    specifications: [
      { key: "Yield / Grammage", value: "5.00 MTR/KG" },
      { key: "Composition", value: "Knitted Cotton/Polyester plus Lycra Spandex" },
      { key: "Circular Feed", value: "Multi-feeder Circular Knit" },
      { key: "Suggested GSM", value: "240 - 260 GSM" },
      { key: "Properties", value: "Thick winter insulation, dual stretch, brushed feel available" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&w=800&q=80",
    isPopular: false
  },
  {
    id: "prod-4",
    name: "6.00 MTR Lycra",
    category: "fabrics",
    description: "Medium-heavy Lycra knit fabric with 6.00 meters yield per kilogram. Most popular fabric dimension for general Indian garments, giving the perfect balance of weight, yardage, and breathability.",
    hindiDescription: "6.00 मीटर लाइक्रा कपड़ा - भारतीय परिधानों के लिए सबसे लोकप्रिय गुणवत्ता और वजन का संतुलन।",
    specifications: [
      { key: "Yield / Grammage", value: "6.00 MTR/KG" },
      { key: "Composition", value: "High grade Cotton-Touch Polyester Lycra" },
      { key: "Knitting Gauge", value: "24 GG / 28 GG Circular Knit" },
      { key: "Suggested GSM", value: "200 - 220 GSM" },
      { key: "Market Preference", value: "Highly preferred for leggings and western ladies tops" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&w=800&q=80",
    isPopular: true
  },
  {
    id: "prod-5",
    name: "All types of Knitted Fabrics",
    category: "fabrics",
    description: "Custom-manufactured knitted fabrics including Sinker Body, Rib Knit, Interlock, Honeycomb, French Terry, Fleece, Hosiery, and Single Jersey. Knitted on advance Circular knitting machines with custom counts.",
    hindiDescription: "सभी प्रकार के निटेड कपड़े - जैसे सिंकर बॉडी, रिब निट, इंटरलॉक, टेरी, फ्लीस और सिंगल जर्सी।",
    specifications: [
      { key: "Variants", value: "Single Jersey, Pique, Rib, Interlock, Terry, Fleece, Jacquard" },
      { key: "GSM Range", value: "80 GSM to 320 GSM based on requirement" },
      { key: "Machinery Used", value: "Precision Circular Knitting Machines" },
      { key: "Yarn Options", value: "Combed Cotton, Semi-combed, Carded, Polyester, Viscose, Blends" },
      { key: "Finish Options", value: "Bio-washed, Silicon Softened, Heat Setted, Mercerized" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=800&q=80",
    isPopular: true
  }
];

// Default Gallery Items
export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Circular Knitting Machinery Setup",
    hindiTitle: "सर्कुलर बुनाई मशीन सेटअप",
    category: "machinery",
    imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=800&q=80",
    description: "Our state-of-the-art circular knitting machine lineup in Silvassa workshop, optimizing continuous high-speed fabric generation.",
    dateAdded: "2026-04-10"
  },
  {
    id: "gal-2",
    title: "Premium Dyed Lycra Rolls",
    hindiTitle: "प्रीमियम रंगीन लाइक्रा कपड़े",
    category: "fabrics",
    imageUrl: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80",
    description: "Finished fabric rolls of 9.50 MTR and 7.50 MTR Lycra ready for client dispatch. Solid dye consistency and soft haptic feeling.",
    dateAdded: "2026-05-15"
  },
  {
    id: "gal-3",
    title: "Polyester & Spandex Spools",
    hindiTitle: "पॉलिएस्टर और स्पैन्डेक्स यार्न स्पूल",
    category: "yarn",
    imageUrl: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&w=800&q=80",
    description: "High tenacity Bright (BRT) yarn spools from elite domestic mills stocked for knitting and independent trading brokerage.",
    dateAdded: "2026-05-20"
  },
  {
    id: "gal-4",
    title: "Knitting In-Progress Zoom",
    hindiTitle: "बुनाई की प्रक्रिया का विवरण",
    category: "production",
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    description: "High-precision needles on our circular knitting cylinder feeding spandex thread live to construct 6.00 MTR fabric with maximum density.",
    dateAdded: "2026-06-01"
  },
  {
    id: "gal-5",
    title: "Cotton Yarn Cones Stored",
    hindiTitle: "सूती धागे के कोन",
    category: "yarn",
    imageUrl: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&w=800&q=80",
    description: "Cotton combed and semi-combed yarn cones ready for knitting into Sinker and Interlock fabrics of Indian standard gauges.",
    dateAdded: "2026-06-12"
  },
  {
    id: "gal-6",
    title: "Ready For Delivery Bundles",
    hindiTitle: "डिलीवरी के लिए तैयार बंडल",
    category: "production",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    description: "Rolls wrapped in protective high-density covers with yield weights tagged per bag to secure timely, spotless delivery in Silvassa and outer hubs.",
    dateAdded: "2026-06-17"
  }
];

// Default video items
export const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: "vid-1",
    title: "Circular Knitting Machine Feed Demo",
    hindiTitle: "सर्कुलर निटिंग मशीन फीड वीडियो",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-working-weaving-machine-in-a-textile-factory-34303-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=800&q=80",
    duration: "1:45",
    description: "Watch our circular knitting machines operating live. Watch how yarn comes from top creels down into feeders to create continuous knitted tubes."
  },
  {
    id: "vid-2",
    title: "Lycra Fabric Elasticity & Quality Check",
    hindiTitle: "लाइक्रा कपड़े की इलास्टिसिटी और गुणवत्ता जांच",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-spinning-yarn-on-a-spindle-in-a-textile-factory-34302-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    duration: "2:10",
    description: "Inspection on our specialized light table checking consistency, GSM parameters, and elasticity response of the 9.50 MTR BRT Lycra fabric."
  },
  {
    id: "vid-3",
    title: "Yarn Brokerage Loading and Dispatch Log",
    hindiTitle: "धागा ब्रोकरेज लोडिंग और प्रेषण",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-working-weaving-machine-in-a-textile-factory-34303-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    duration: "0:58",
    description: "Vans loading with bulk yarn order direct from partner mills under our brokerage supervision for the Surat/Daman/Bhiwandi textile clusters."
  }
];

// WhatsApp URL builder helper
export function getWhatsAppLink(
  whatsAppNumber: string,
  message: string
): string {
  // Clear non-digits
  const cleanNumber = whatsAppNumber.replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

// Generate prefilled order templates
export function generateOrderMessage(
  productName: string,
  clientName: string,
  clientPhone: string,
  qty: string,
  yarnOrFabricType: string,
  customNotes: string
): string {
  return `Hello Shree Shyam Multi Trade,

I am interested in placing an order/enquiring about:
======================================
*Product/Requirement:* ${productName}
*Fabric/Yarn Type:* ${yarnOrFabricType || "Standard Lycra"}
*Quantity:* ${qty || "Not specified"}
======================================

*My Contact Details:*
- Name: ${clientName || "Visitor"}
- Mobile: ${clientPhone || "Provided on Chat"}

*Additional Requirements:*
${customNotes || "No extra requirements. Please send rates and delivery time."}

Thank you,
${clientName || "Buyer"}`;
}

// Generate premium quick inquiry message
export function generateInquiryMessage(
  subject: string,
  details: string
): string {
  return `Hello Shree Shyam Multi Trade,

I have a business inquiry regarding:
*${subject}*

*Details of Requirement:*
${details}

Please reply with availability and rates. Thank you!`;
}
