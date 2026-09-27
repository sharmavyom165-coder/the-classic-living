export type SharingType = 'single' | 'double' | 'triple';
export type ACType = 'ac' | 'non-ac';

export interface BedSlot {
  bedNumber: string;
  isOccupied: boolean;
  occupantStream?: string; // e.g. "JEE Aspirant", "SGSITS Engineering"
}

export interface Room {
  id: string;
  roomNumber: string;
  title: string;
  floor: number;
  floorName: string;
  sharingType: SharingType;
  acType: ACType;
  monthlyRent: number;
  securityDeposit: number;
  maintenanceFee: number;
  dimensions: string;
  totalBeds: number;
  availableBeds: number;
  bedSlots: BedSlot[];
  amenities: string[];
  description: string;
  badge?: string;
  imageAccent: string; // Color mood or theme
  features: {
    washroomType: 'Attached' | 'Dedicated';
    ventilation: 'East-Facing Window' | 'Balcony Attached' | 'Courtyard View';
    furniture: string;
    wifiSpeed: string;
  };
}

export interface Review {
  id: string;
  author: string;
  avatarColor: string;
  rating: number;
  date: string;
  stayDuration: string;
  residentType: string;
  tag: 'safe atmosphere' | 'approachable warden' | 'ventilated rooms' | 'spotless washrooms' | 'hygienic mess food' | 'peaceful study';
  content: string;
  helpfulCount: number;
  isVerifiedResident: boolean;
  ownerReply?: {
    date: string;
    content: string;
  };
}

export interface MessDaySchedule {
  day: string;
  breakfast: string;
  lunch: string;
  snacks: string;
  dinner: string;
  specialBadge?: string;
}

export interface BookingDetails {
  bookingId: string;
  residentName: string;
  phone: string;
  email: string;
  guardianName: string;
  guardianPhone: string;
  institution: string;
  idType: 'Aadhaar Card' | 'College ID' | 'Driving License';
  idNumber: string;
  roomId: string;
  roomNumber: string;
  roomTitle: string;
  bedNumber: string;
  checkInDate: string;
  stayTenureMonths: number;
  mealPlan: 'all_meals' | 'breakfast_dinner' | 'room_only';
  monthlyRent: number;
  securityDeposit: number;
  messMonthlyFee: number;
  discountApplied: number;
  couponCode?: string;
  paymentType: 'full_month' | 'advance_token';
  amountPaid: number;
  balanceDue: number;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking';
  transactionId: string;
  timestamp: string;
}

export interface ScheduledVisit {
  id: string;
  name: string;
  phone: string;
  preferredDate: string;
  timeSlot: string;
  roomInterest: string;
  guestsCount: number;
  status: 'confirmed' | 'pending';
}
