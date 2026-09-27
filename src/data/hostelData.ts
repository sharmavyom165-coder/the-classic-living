import { Room, Review, MessDaySchedule } from '../types/hostel';

export const HOSTEL_INFO = {
  name: "THE CLASSIC LIVING",
  nameHindi: "थे क्लासिक लिविंग",
  type: "Boys' Hostel & Premium Student Living",
  rating: 4.1,
  totalReviews: 106,
  phone: "097550 55599",
  phoneFormatted: "+91 97550 55599",
  whatsappNumber: "919755055599",
  email: "theclassiclivingindore@gmail.com",
  address: "Priti Nagar, 24-B, Shri Ram Nagar, Indore, Madhya Pradesh 452016",
  landmark: "Near Shri Ram Nagar Main Square, 5 mins from Vijay Nagar & Geeta Bhawan coaching corridors",
  plusCode: "PWC6+H5 Indore, Madhya Pradesh",
  operatingHours: "Closed · Opens 9:00 AM (Warden on premise 24x7)",
  visitingHours: "Morning 09:00 AM – 01:00 PM | Evening 04:00 PM – 08:30 PM",
  curfewTime: "10:30 PM (Biometric entry with late pass system)",
  summaryHighlights: [
    "Spacious, clean, and well-maintained rooms",
    "Hygienic and tasty food with varied menus",
    "Supportive management, respectful staff",
    "Safe, peaceful atmosphere ideal for studying",
    "Ventilated rooms with ample natural light",
    "Spotless washrooms with 24/7 hot water geysers"
  ],
  nearbyInstitutes: [
    { name: "Allen Career Institute (Vijay Nagar)", distance: "1.2 km", travelTime: "4 mins" },
    { name: "Aakash Institute (Palasia)", distance: "2.4 km", travelTime: "7 mins" },
    { name: "SGSITS Engineering College", distance: "3.5 km", travelTime: "10 mins" },
    { name: "DAVV University Campus", distance: "4.1 km", travelTime: "12 mins" },
    { name: "Bhawarkua Student & Coaching Hub", distance: "4.8 km", travelTime: "14 mins" },
    { name: "Indore Junction Railway Station", distance: "4.0 km", travelTime: "11 mins" },
    { name: "Devi Ahilya Bai Holkar Airport", distance: "11.2 km", travelTime: "25 mins" }
  ]
};

export const INITIAL_ROOMS: Room[] = [
  {
    id: "room-101",
    roomNumber: "101",
    title: "Executive Single Suite (AC)",
    floor: 1,
    floorName: "1st Floor - Quiet Study Wing",
    sharingType: "single",
    acType: "ac",
    monthlyRent: 13500,
    securityDeposit: 5000,
    maintenanceFee: 1000,
    dimensions: "15 x 13 ft",
    totalBeds: 1,
    availableBeds: 1,
    bedSlots: [
      { bedNumber: "Bed 1", isOccupied: false }
    ],
    amenities: [
      "Split Air Conditioner (1.5 Ton 5-Star)",
      "High-speed 200 Mbps Optical Fiber Wi-Fi",
      "Spacious Wooden Study Desk & Ergonomic Chair",
      "Attached Western Washroom + 25L Instant Geyser",
      "Full Height 3-Door Teak Finish Wardrobe",
      "Private Balcony with Green Courtyard View",
      "24/7 Power Inverter & Generator Backup",
      "Spring Mattress with Waterproof Protector"
    ],
    description: "Our premier private accommodation crafted specifically for competitive exam aspirants needing absolute quiet and peak concentration. Features natural morning cross-ventilation.",
    badge: "Only 1 Vacancy Left",
    imageAccent: "amber",
    features: {
      washroomType: "Attached",
      ventilation: "Balcony Attached",
      furniture: "Teak desk, high-back ergonomic chair, orthopedic mattress",
      wifiSpeed: "200 Mbps Dedicated"
    }
  },
  {
    id: "room-202",
    roomNumber: "202",
    title: "Double Sharing Deluxe (AC)",
    floor: 2,
    floorName: "2nd Floor - East Wing",
    sharingType: "double",
    acType: "ac",
    monthlyRent: 9500,
    securityDeposit: 5000,
    maintenanceFee: 800,
    dimensions: "18 x 14 ft",
    totalBeds: 2,
    availableBeds: 1,
    bedSlots: [
      { bedNumber: "Bed A", isOccupied: true, occupantStream: "JEE Advanced Aspirant (Allen)" },
      { bedNumber: "Bed B", isOccupied: false }
    ],
    amenities: [
      "Daikin Inverter AC",
      "Individual 4-ft Study Desks with Softboard",
      "Dual Separate Lockable Steel Almirahs",
      "Attached Washroom with Exhaust & Hot Water",
      "Wide East-facing Glazed Windows",
      "High-Speed Wi-Fi Access Points in corridor",
      "Daily Room Mopping & Washroom Sanitization"
    ],
    description: "Generously proportioned double sharing room with designated individual corners so roommates study and rest without interruption. Spotless tiled flooring with abundant sunshine.",
    badge: "Top Rated by Students",
    imageAccent: "blue",
    features: {
      washroomType: "Attached",
      ventilation: "East-Facing Window",
      furniture: "Twin sturdy wood beds, dual study setups, soft pin boards",
      wifiSpeed: "150 Mbps Mesh"
    }
  },
  {
    id: "room-204",
    roomNumber: "204",
    title: "Double Sharing Executive (Non-AC)",
    floor: 2,
    floorName: "2nd Floor - Garden Wing",
    sharingType: "double",
    acType: "non-ac",
    monthlyRent: 7800,
    securityDeposit: 4000,
    maintenanceFee: 800,
    dimensions: "17 x 14 ft",
    totalBeds: 2,
    availableBeds: 2,
    bedSlots: [
      { bedNumber: "Bed A", isOccupied: false },
      { bedNumber: "Bed B", isOccupied: false }
    ],
    amenities: [
      "Heavy-duty High-RPM Ceiling Fans + Exhaust",
      "Cross-ventilation Windows on dual walls",
      "Individual Study Desks & Book racks",
      "Separate Lockers with personal padlocks",
      "Attached Spotless Washroom",
      "24/7 RO Purified Water on same floor",
      "RO drinking water dispenser at entrance"
    ],
    description: "Cool and naturally ventilated room with wide garden-facing windows that stay breezy throughout Indore's summer evenings. Budget-friendly without compromising cleanliness.",
    badge: "Both Beds Available",
    imageAccent: "emerald",
    features: {
      washroomType: "Attached",
      ventilation: "Courtyard View",
      furniture: "Dual beds with storage drawers, individual reading lamps",
      wifiSpeed: "150 Mbps Mesh"
    }
  },
  {
    id: "room-301",
    roomNumber: "301",
    title: "Triple Sharing Premium (AC)",
    floor: 3,
    floorName: "3rd Floor - South Wing",
    sharingType: "triple",
    acType: "ac",
    monthlyRent: 7200,
    securityDeposit: 4000,
    maintenanceFee: 700,
    dimensions: "22 x 15 ft",
    totalBeds: 3,
    availableBeds: 1,
    bedSlots: [
      { bedNumber: "Bed 1", isOccupied: true, occupantStream: "B.Tech CS (SGSITS)" },
      { bedNumber: "Bed 2", isOccupied: true, occupantStream: "CA Intermediate" },
      { bedNumber: "Bed 3", isOccupied: false }
    ],
    amenities: [
      "2.0 Ton Heavy AC for deep cooling",
      "Three Independent Study Cubicles",
      "Triple Built-in Full Length Wardrobes",
      "Spacious Attached Bathroom with dual mirrors",
      "Balcony Access with Clothes Drying Rack",
      "Fiber Optic Wi-Fi Router inside room",
      "Daily Housekeeping & Linen Change"
    ],
    description: "Extremely spacious room with high 11-ft ceilings and individual study islands. Great camaraderie with disciplined college and coaching peers.",
    badge: "Last Bed Left",
    imageAccent: "indigo",
    features: {
      washroomType: "Attached",
      ventilation: "Balcony Attached",
      furniture: "Three single beds, 3 study units, individual charging hubs",
      wifiSpeed: "200 Mbps Mesh"
    }
  },
  {
    id: "room-305",
    roomNumber: "305",
    title: "Triple Sharing Economy (Non-AC)",
    floor: 3,
    floorName: "3rd Floor - West Wing",
    sharingType: "triple",
    acType: "non-ac",
    monthlyRent: 6200,
    securityDeposit: 3500,
    maintenanceFee: 600,
    dimensions: "20 x 14 ft",
    totalBeds: 3,
    availableBeds: 2,
    bedSlots: [
      { bedNumber: "Bed A", isOccupied: true, occupantStream: "NEET Aspirant" },
      { bedNumber: "Bed B", isOccupied: false },
      { bedNumber: "Bed C", isOccupied: false }
    ],
    amenities: [
      "Twin Aerodynamic High-Speed Fans",
      "Three Study Desks with overhead LED battens",
      "Individual Steel Wardrobes with internal drawer",
      "Attached Bathroom with instant geyser",
      "High-speed Wi-Fi and 24x7 Inverter Backup",
      "Daily sweeping and mopping"
    ],
    description: "Our most economical room choice for budget-conscious students. Offers complete basic comforts, hygiene, and full mess access.",
    badge: "Budget Friendly",
    imageAccent: "teal",
    features: {
      washroomType: "Attached",
      ventilation: "Courtyard View",
      furniture: "Solid metal beds with ply base, 4-inch high density mattress",
      wifiSpeed: "100 Mbps Mesh"
    }
  },
  {
    id: "room-401",
    roomNumber: "401",
    title: "Presidential Top-Floor Studio (AC)",
    floor: 4,
    floorName: "4th Floor - Terrace View Penthouse",
    sharingType: "single",
    acType: "ac",
    monthlyRent: 15500,
    securityDeposit: 6000,
    maintenanceFee: 1000,
    dimensions: "18 x 14 ft + Private Terrace",
    totalBeds: 1,
    availableBeds: 1,
    bedSlots: [
      { bedNumber: "Bed 1", isOccupied: false }
    ],
    amenities: [
      "Top-floor Private Balcony overlooking Indore skyline",
      "1.5 Ton Panasonic Smart Inverter AC",
      "Executive Solid Wood 5-ft Desk + Revolving Chair",
      "Attached Luxury Washroom with Jaquar fittings",
      "Personal Mini-Fridge for health snacks & milk",
      "Gigabit Wi-Fi 300 Mbps direct connection",
      "Sound-dampening double-glazed sliding glass"
    ],
    description: "Indore's finest private student sanctuary. Complete isolation for serious UPSC, GATE, or CAT preparation with a panoramic rooftop terrace right outside your door.",
    badge: "Premium Study Suite",
    imageAccent: "rose",
    features: {
      washroomType: "Attached",
      ventilation: "Balcony Attached",
      furniture: "Executive workstation, bookshelf, mini fridge, luxury bed",
      wifiSpeed: "300 Mbps Dedicated"
    }
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Pranav Parmar",
    avatarColor: "bg-blue-600",
    rating: 5,
    date: "6 months ago",
    stayDuration: "Stayed 1 academic year",
    residentType: "JEE Aspirant (Allen)",
    tag: "safe atmosphere",
    content: "I have stayed in several hostels before, but this one truly exceeded my expectations. The hostel provides a peaceful, safe, and motivating environment that supports both academic and personal growth. From day one, the management made the transition smooth. The warden is genuinely caring and addresses any minor plumbing or Wi-Fi issue within an hour.",
    helpfulCount: 24,
    isVerifiedResident: true,
    ownerReply: {
      date: "6 months ago",
      content: "Thank you so much Pranav! We take pride in maintaining an academic-first environment for all students preparing in Indore. Wishing you stellar success in your exams!"
    }
  },
  {
    id: "rev-2",
    author: "Harshit Madeshia",
    avatarColor: "bg-amber-600",
    rating: 5,
    date: "6 months ago",
    stayDuration: "Stayed 10 months",
    residentType: "SGSITS Student",
    tag: "hygienic mess food",
    content: "Let’s be real: hostel food is usually a nightmare. But here? It’s actually something I look forward to. The mess menu is diverse, hygienic, and surprisingly tasty. They actually listen to student feedback and change the menu regularly. The hot phulkas with ghee and Indori poha-jalebi on Sunday mornings are absolute highlights!",
    helpfulCount: 19,
    isVerifiedResident: true,
    ownerReply: {
      date: "6 months ago",
      content: "Dear Harshit, thank you for your kind words! Our kitchen team works hard every day to serve homestyle, nutritious food that reminds you of home."
    }
  },
  {
    id: "rev-3",
    author: "Akshat Chouhan",
    avatarColor: "bg-emerald-600",
    rating: 5,
    date: "4 months ago",
    stayDuration: "Stayed 14 months",
    residentType: "CA Intermediate",
    tag: "approachable warden",
    content: "Transitioning to a new city was daunting, but this hostel made it seamless. The community here is incredible. I’ve met some of my best friends in the dining hall and during the various festivals the management organizes. It’s not just a place to sleep—it really feels like a second home. Highly approachable warden who treats us with respect.",
    helpfulCount: 16,
    isVerifiedResident: true
  },
  {
    id: "rev-4",
    author: "Rohan Agrawal",
    avatarColor: "bg-indigo-600",
    rating: 4,
    date: "3 months ago",
    stayDuration: "Current Resident (8 months)",
    residentType: "NEET Aspirant",
    tag: "ventilated rooms",
    content: "The rooms are genuinely well ventilated with large windows and proper sunlight, which is rare in Shri Ram Nagar / Priti Nagar hostels. The study tables are wide enough for multiple thick medical books and test papers. Only giving 4 stars because Wi-Fi had a 2-hour glitch during rain last month, but the team fixed it promptly.",
    helpfulCount: 11,
    isVerifiedResident: true,
    ownerReply: {
      date: "3 months ago",
      content: "Thank you Rohan! We've since upgraded our primary connection to redundant dual-fiber lines so even stormy weather won't interrupt your study sessions."
    }
  },
  {
    id: "rev-5",
    author: "Virendra Rathore",
    avatarColor: "bg-teal-600",
    rating: 5,
    date: "2 months ago",
    stayDuration: "Parent of Resident",
    residentType: "Parent of Student",
    tag: "safe atmosphere",
    content: "As a parent from Gwalior sending my 18-year-old son to Indore for the first time, safety was my topmost concern. The biometric gate pass, strict visitor verification, and CCTV monitoring gave us total peace of mind. The warden sent us monthly progress and attendance updates. Truly commendable.",
    helpfulCount: 32,
    isVerifiedResident: true
  },
  {
    id: "rev-6",
    author: "Divyansh Soni",
    avatarColor: "bg-purple-600",
    rating: 4,
    date: "1 month ago",
    stayDuration: "Stayed 6 months",
    residentType: "IT Professional",
    tag: "spotless washrooms",
    content: "Spotless washrooms were my non-negotiable requirement. The housekeeping staff scrubs the attached bathrooms every alternate day with disinfectant. Hot water is available 24/7 through high-capacity geysers. Clean drinking water RO plant is checked every week.",
    helpfulCount: 8,
    isVerifiedResident: true
  }
];

export const MESS_WEEKLY_MENU: MessDaySchedule[] = [
  {
    day: "Monday",
    breakfast: "Authentic Indori Poha with Ratlami Sev, Boiled Sprouts, Ginger Cardamom Tea / Hot Milk",
    lunch: "Arhar Dal Tadka, Aloo Gobhi Matar, Phulka Rotis with desi ghee, Steamed Rice, Green Salad & Crispy Papad",
    snacks: "Veg Cutlets with Mint Chutney & Tea",
    dinner: "Paneer Bhurji, Malwa Dal Fry, Butter Tawa Roti, Jeera Rice, Gulab Jamun (1 pc)",
    specialBadge: "Student Favorite"
  },
  {
    day: "Tuesday",
    breakfast: "South Indian Idli Sambhar & Fresh Coconut Chutney, Banana, Hot Tea / Coffee",
    lunch: "Rajma Masala (Punjabi Style), Dahi Bundi Raita, Steamed Basmati Rice, Chapati, Fresh Onion Salad",
    snacks: "Aloo Bonda with Tangy Imli Chutney & Chai",
    dinner: "Mix Veg Handi, Moong Dal Khichdi / Tawa Rotis, Kadhi Pakoda, Papad",
    specialBadge: "Comfort Food"
  },
  {
    day: "Wednesday",
    breakfast: "Aloo Pyaz Stuffed Paratha with Fresh Curd & Pickle, Tea / Hot Milk",
    lunch: "Chana Dal with Lauki, Dum Aloo Kashmiri, Steamed Rice, Hot Soft Chapatis, Beetroot Salad",
    snacks: "Indori Khasta Kachori with Green Mirchi & Tea",
    dinner: "Shahi Matar Paneer, Dal Makhani, Ghee Phulkas, Veg Pulao, Seasonal Kheer",
    specialBadge: "Special Feast"
  },
  {
    day: "Thursday",
    breakfast: "Upma with Roasted Peanuts & Lemon, Fresh Papaya, Tea / Milk",
    lunch: "Pindi Chole, Plain Bhature / Ghee Rotis, Jeera Rice, Sirka Pyaaz, Roasted Papad",
    snacks: "Biscuit / Toast with Cutting Chai",
    dinner: "Bhindi Masala Fry, Panchmel Dal, Phulka Rotis, Steamed Rice, Semiya Payasam",
  },
  {
    day: "Friday",
    breakfast: "Methi Thepla with Chhundo / Curd, Boiled Egg / Fruit, Masala Tea",
    lunch: "Kadi Pakoda (Besan Kadhi), Aloo Jeera Dry, Steamed Rice, Tawa Rotis, Kachumber Salad",
    snacks: "Crispy Samosa with Sweet & Spicy Chutneys, Hot Tea",
    dinner: "Kadai Paneer, Yellow Dal Fry, Butter Naan / Tawa Roti, Veg Biryani with Raita",
    specialBadge: "Chef Special"
  },
  {
    day: "Saturday",
    breakfast: "Uttapam / Dosa with Tomato-Garlic Dip & Sambhar, Tea / Bournvita",
    lunch: "Dal Bati Churma (Traditional Malwi Specialty with Desi Ghee), Mirchi Tapore, Green Salad",
    snacks: "Poha Chivda / Corn Chat with Hot Chai",
    dinner: "Soyabean Chaap Curry, Dal Tadka, Hot Rotis, Steamed Rice, Ice Cream Cup",
    specialBadge: "Malwi Delicacy"
  },
  {
    day: "Sunday",
    breakfast: "Classic Indore Special: Poha + Garam Jalebi, Sprouts, Hot Masala Tea",
    lunch: "Chole Kulche / Puri Sabzi, Boondi Raita, Veg Pulao, Fresh Cucumber Salad",
    snacks: "Maggi / Pasta & Evening Tea",
    dinner: "Special Paneer Butter Masala, Kashmiri Pulao, Butter Roti, Rasgulla",
    specialBadge: "Sunday Grand Feast"
  }
];

export const AMENITIES_LIST = [
  { title: "24/7 CCTV & Security", desc: "Biometric entry locks, 32 surveillance cameras, full-time resident warden.", icon: "ShieldCheck" },
  { title: "Hygienic 4-Time Mess", desc: "Pure vegetarian homestyle kitchen, RO purified cooking, diverse student-approved menu.", icon: "Utensils" },
  { title: "High-Speed Optical Wi-Fi", desc: "Dual fiber lines with 200+ Mbps, uninterrupted live video classes & downloads.", icon: "Wifi" },
  { title: "Full Power Backup", desc: "Automated silent generator & heavy-duty inverters for non-stop study lighting and fans.", icon: "Zap" },
  { title: "Spotless Washrooms", desc: "Cleaned and sanitized alternate days with 24/7 instant hot water geysers.", icon: "Sparkles" },
  { title: "Quiet Study Atmosphere", desc: "Strict 10:30 PM quiet hours, individual study workstations in every room.", icon: "BookOpen" },
  { title: "RO Drinking Water", desc: "Multi-stage RO + UV water purifiers and cold water dispensers on each floor.", icon: "Droplet" },
  { title: "Daily Housekeeping", desc: "Free daily sweeping and mopping of all rooms and communal corridors.", icon: "CheckCircle2" }
];
