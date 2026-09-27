import React, { useState } from 'react';
import { X, Check, BedDouble, Shield, CreditCard, QrCode, Building, ArrowRight, ArrowLeft, Download, Printer, CheckCircle2, Copy, AlertCircle, Phone } from 'lucide-react';
import { Room, BookingDetails } from '../types/hostel';
import { HOSTEL_INFO } from '../data/hostelData';

interface OnlinePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom: Room | null;
  onBookingConfirmed: (booking: BookingDetails) => void;
  availableRooms: Room[];
}

export const OnlinePaymentModal: React.FC<OnlinePaymentModalProps> = ({
  isOpen,
  onClose,
  selectedRoom,
  onBookingConfirmed,
  availableRooms,
}) => {
  // Stepper: 1: Resident Info, 2: Room & Plan, 3: Review & Fees, 4: Payment, 5: Confirmation Slip
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [activeRoomId, setActiveRoomId] = useState<string>(
    selectedRoom ? selectedRoom.id : availableRooms[0]?.id || ''
  );
  const currentRoom = availableRooms.find((r) => r.id === activeRoomId) || availableRooms[0];

  const [selectedBedNumber, setSelectedBedNumber] = useState<string>(
    currentRoom?.bedSlots.find((b) => !b.isOccupied)?.bedNumber || 'Bed 1'
  );

  const [residentName, setResidentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [institution, setInstitution] = useState('Allen Career Institute (Vijay Nagar)');
  const [idType, setIdType] = useState<'Aadhaar Card' | 'College ID' | 'Driving License'>('Aadhaar Card');
  const [idNumber, setIdNumber] = useState('');

  const [checkInDate, setCheckInDate] = useState(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [stayTenureMonths, setStayTenureMonths] = useState<number>(6);
  const [mealPlan, setMealPlan] = useState<'all_meals' | 'breakfast_dinner' | 'room_only'>('all_meals');

  // Coupon code
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState('');

  // Payment method
  const [paymentChoice, setPaymentChoice] = useState<'advance_token' | 'full_month'>('advance_token');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking'>('UPI');
  const [upiRefNumber, setUpiRefNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<BookingDetails | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);

  if (!isOpen || !currentRoom) return null;

  // Pricing calculations
  const messMonthlyCost =
    mealPlan === 'all_meals' ? 3500 : mealPlan === 'breakfast_dinner' ? 2500 : 0;
  const monthlyTotal = currentRoom.monthlyRent + messMonthlyCost;
  const deposit = currentRoom.securityDeposit;

  // Tenure discount (5% for 11 months)
  const tenureDiscount = stayTenureMonths >= 11 ? Math.round(monthlyTotal * 0.05) : 0;
  const totalDiscount = tenureDiscount + discountAmount;

  // Payment amounts
  const tokenAdvanceFee = 2000;
  const fullFirstMonthFee = monthlyTotal + deposit - totalDiscount;
  const amountToPayNow = paymentChoice === 'advance_token' ? tokenAdvanceFee : fullFirstMonthFee;
  const balanceRemaining =
    paymentChoice === 'advance_token'
      ? fullFirstMonthFee - tokenAdvanceFee
      : 0;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'STUDENT2026') {
      setCouponApplied(true);
      setDiscountAmount(1000);
    } else if (code === 'EARLYBIRD') {
      setCouponApplied(true);
      setDiscountAmount(500);
    } else {
      setCouponError('Invalid coupon. Try "STUDENT2026" or "EARLYBIRD"');
    }
  };

  const handleProcessPayment = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      const generatedId = `TCL-IND-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newBooking: BookingDetails = {
        bookingId: generatedId,
        residentName,
        phone,
        email,
        guardianName,
        guardianPhone,
        institution,
        idType,
        idNumber,
        roomId: currentRoom.id,
        roomNumber: currentRoom.roomNumber,
        roomTitle: currentRoom.title,
        bedNumber: selectedBedNumber,
        checkInDate,
        stayTenureMonths,
        mealPlan,
        monthlyRent: currentRoom.monthlyRent,
        securityDeposit: currentRoom.securityDeposit,
        messMonthlyFee: messMonthlyCost,
        discountApplied: totalDiscount,
        couponCode: couponApplied ? couponCode.toUpperCase() : undefined,
        paymentType: paymentChoice,
        amountPaid: amountToPayNow,
        balanceDue: balanceRemaining,
        paymentMethod,
        transactionId: `TXN_IND_${Date.now().toString().slice(-8)}`,
        timestamp: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setConfirmedBooking(newBooking);
      onBookingConfirmed(newBooking);
      setIsProcessingPayment(false);
      setCurrentStep(5);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText('classicliving@indoreicici');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-stone-200 shadow-2xl my-8 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="bg-stone-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold text-sm tracking-wide">
                THE CLASSIC LIVING
              </span>
              <span className="text-stone-400 text-xs">· Secure Allotment Portal</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
              {currentStep === 5 ? 'Official Admission & Allotment Voucher' : 'Hostel Bed Booking & Online Payment'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (Steps 1 to 4) */}
        {currentStep < 5 && (
          <div className="bg-stone-100 px-4 sm:px-6 py-2.5 border-b border-stone-200 flex items-center justify-between text-xs font-medium text-stone-600 shrink-0">
            <span className={currentStep === 1 ? 'font-bold text-amber-800' : ''}>
              1. Resident Info
            </span>
            <span className="text-stone-300">/</span>
            <span className={currentStep === 2 ? 'font-bold text-amber-800' : ''}>
              2. Room & Meals
            </span>
            <span className="text-stone-300">/</span>
            <span className={currentStep === 3 ? 'font-bold text-amber-800' : ''}>
              3. Summary & Fees
            </span>
            <span className="text-stone-300">/</span>
            <span className={currentStep === 4 ? 'font-bold text-amber-800' : ''}>
              4. Online Payment
            </span>
          </div>
        )}

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* STEP 1: Resident & Guardian Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-stone-900">Student & Resident Profile</h4>
                <p className="text-xs text-stone-500">
                  Required for hostel biometric registration and warden communication in Shri Ram Nagar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aryan Sharma"
                    value={residentName}
                    onChange={(e) => setResidentName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Student Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile (e.g. 9826012345)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Student Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. aryan@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Enrolled Institute / College in Indore *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Allen (Vijay Nagar), SGSITS, DAVV"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Parent / Guardian Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Parent / Guardian Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Emergency guardian phone"
                    value={guardianPhone}
                    onChange={(e) => setGuardianPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Govt ID Proof Type
                  </label>
                  <select
                    value={idType}
                    onChange={(e) => setIdType(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-600"
                  >
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="College ID">College ID Card</option>
                    <option value="Driving License">Driving License</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    ID Proof Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5432-8765-1234"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-600 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Room & Meal Plan Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-stone-900">Room Unit & Dining Customization</h4>
                <p className="text-xs text-stone-500">
                  Select your specific bed and desired homestyle meal plan.
                </p>
              </div>

              {/* Room Selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase">
                  Select Room
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableRooms.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => {
                        setActiveRoomId(r.id);
                        const firstFreeBed = r.bedSlots.find((b) => !b.isOccupied);
                        if (firstFreeBed) setSelectedBedNumber(firstFreeBed.bedNumber);
                      }}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        activeRoomId === r.id
                          ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-600'
                          : 'border-stone-200 hover:border-stone-300 bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-stone-900">
                          Room {r.roomNumber} ({r.sharingType})
                        </span>
                        <span className="font-mono text-xs font-semibold text-stone-900">
                          ₹{r.monthlyRent.toLocaleString('en-IN')}/m
                        </span>
                      </div>
                      <div className="text-xs text-stone-500 mt-1">
                        {r.title} · {r.acType.toUpperCase()}
                      </div>
                      <div className="text-[11px] text-emerald-700 font-medium mt-1">
                        {r.availableBeds} beds available
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specific Bed Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase">
                  Choose Your Preferred Bed in Room {currentRoom.roomNumber}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {currentRoom.bedSlots.map((bed, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={bed.isOccupied}
                      onClick={() => setSelectedBedNumber(bed.bedNumber)}
                      className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                        bed.isOccupied
                          ? 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed'
                          : selectedBedNumber === bed.bedNumber
                          ? 'bg-amber-600 text-white border-amber-600 font-bold shadow-xs'
                          : 'bg-white border-stone-300 hover:border-amber-500 text-stone-800'
                      }`}
                    >
                      <div className="text-xs font-bold">{bed.bedNumber}</div>
                      <div className="text-[10px] mt-0.5">
                        {bed.isOccupied ? 'Occupied' : 'Selected / Free'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Meal Plan Options */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase">
                  Homestyle Pure-Veg Mess Plan
                </label>
                <div className="space-y-2">
                  <div
                    onClick={() => setMealPlan('all_meals')}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      mealPlan === 'all_meals'
                        ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-600'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-stone-900 flex items-center gap-2">
                        <span>Full 4-Time Mess (Recommended)</span>
                        <span className="text-[10px] bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded">
                          Best Value
                        </span>
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        Breakfast with Tea, Unlimited Lunch Thali, Evening Snacks, & Dinner Feast
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-stone-900">
                      +₹3,500/mo
                    </span>
                  </div>

                  <div
                    onClick={() => setMealPlan('breakfast_dinner')}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      mealPlan === 'breakfast_dinner'
                        ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-600'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-stone-900">
                        2-Time Mess (Breakfast & Dinner)
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        Suitable for students taking college canteen lunch
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-stone-900">
                      +₹2,500/mo
                    </span>
                  </div>

                  <div
                    onClick={() => setMealPlan('room_only')}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      mealPlan === 'room_only'
                        ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-600'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-stone-900">Room Only (No Mess)</div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        Excludes daily hostel meals (only room & amenities)
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-stone-500">+₹0/mo</span>
                  </div>
                </div>
              </div>

              {/* Move-in Date & Stay Tenure */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Planned Move-In Date *
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Stay Duration / Tenure
                  </label>
                  <select
                    value={stayTenureMonths}
                    onChange={(e) => setStayTenureMonths(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-600 cursor-pointer"
                  >
                    <option value={1}>1 Month (Trial)</option>
                    <option value={3}>3 Months (Quarterly)</option>
                    <option value={6}>6 Months (Semester)</option>
                    <option value={11}>11 Months (Full Academic Year - 5% Off)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Summary, Coupons & Transparent Breakdown */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-stone-900">Booking Summary & Tariff</h4>
                <p className="text-xs text-stone-500">
                  Review the complete financial transparent schedule before proceeding to payment.
                </p>
              </div>

              {/* Allotment preview card */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-stone-900 text-sm">
                  <span>Room {currentRoom.roomNumber} ({currentRoom.title})</span>
                  <span className="font-mono text-amber-800">{selectedBedNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-500">
                  <span>Student: <strong>{residentName || 'Aryan Sharma'}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Move-in: {checkInDate}</span>
                  <span aria-hidden="true">·</span>
                  <span>Tenure: {stayTenureMonths} Months</span>
                </div>
              </div>

              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Have coupon? Try STUDENT2026 or EARLYBIRD"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 uppercase font-mono tracking-wider focus:outline-none focus:border-amber-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap"
                >
                  Apply Code
                </button>
              </form>
              {couponApplied && (
                <div className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Coupon applied! ₹{discountAmount} deducted.
                </div>
              )}
              {couponError && <div className="text-xs text-rose-600">{couponError}</div>}

              {/* Fee Schedule Table */}
              <div className="border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-100 text-xs">
                <div className="p-3 flex justify-between bg-stone-50 text-stone-600 font-medium">
                  <span>Monthly Room Rent ({currentRoom.sharingType} AC)</span>
                  <span className="font-mono tabular-nums font-semibold text-stone-900">
                    ₹{currentRoom.monthlyRent.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-3 flex justify-between bg-white text-stone-600">
                  <span>
                    Mess Package ({mealPlan === 'all_meals' ? '4-Time Daily' : mealPlan === 'breakfast_dinner' ? '2-Time Daily' : 'None'})
                  </span>
                  <span className="font-mono tabular-nums font-semibold text-stone-900">
                    ₹{messMonthlyCost.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-3 flex justify-between bg-white text-stone-600">
                  <span>Refundable Security Deposit (100% returned upon exit)</span>
                  <span className="font-mono tabular-nums font-semibold text-stone-900">
                    ₹{deposit.toLocaleString('en-IN')}
                  </span>
                </div>
                {totalDiscount > 0 && (
                  <div className="p-3 flex justify-between bg-emerald-50 text-emerald-800 font-medium">
                    <span>Discount (Tenure & Coupon)</span>
                    <span className="font-mono tabular-nums font-semibold">
                      -₹{totalDiscount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="p-3.5 flex justify-between bg-stone-900 text-white font-bold text-sm">
                  <span>Total First Month Dues (Rent + Deposit + Mess)</span>
                  <span className="font-mono tabular-nums">
                    ₹{fullFirstMonthFee.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Payment Split Preference */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2 uppercase">
                  How would you like to pay right now?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentChoice('advance_token')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentChoice === 'advance_token'
                        ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-600'
                        : 'border-stone-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">
                        Pay Advance Token (Hold Bed)
                      </span>
                      <span className="text-xs font-bold text-amber-700 font-mono">₹2,000</span>
                    </div>
                    <div className="text-[11px] text-stone-500 mt-1">
                      Lock your bed instantly. Pay the remaining ₹{balanceRemaining.toLocaleString('en-IN')} during physical check-in at Indore.
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentChoice('full_month')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentChoice === 'full_month'
                        ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-600'
                        : 'border-stone-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">
                        Pay Complete 1st Month + Deposit
                      </span>
                      <span className="text-xs font-bold text-stone-900 font-mono">
                        ₹{fullFirstMonthFee.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500 mt-1">
                      Zero dues on arrival. Immediate key handover guaranteed.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Payment Gateway Simulation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-stone-900">Complete Online Payment</h4>
                <p className="text-xs text-stone-500">
                  Authorizing <strong className="text-stone-900 font-mono">₹{amountToPayNow.toLocaleString('en-IN')}</strong> to The Classic Living, Shri Ram Nagar, Indore.
                </p>
              </div>

              {/* Payment Methods Tabs */}
              <div className="flex border border-stone-200 rounded-lg p-1 bg-stone-100">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'UPI' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>UPI / QR Code</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'Card' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Debit / Credit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('NetBanking')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'NetBanking' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Net Banking</span>
                </button>
              </div>

              {/* Method 1: Instant UPI QR Code */}
              {paymentMethod === 'UPI' && (
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 text-center space-y-4">
                  <div className="text-xs text-stone-600 font-medium">
                    Scan with any UPI App (Google Pay, PhonePe, Paytm, BHIM)
                  </div>

                  {/* High Quality SVG UPI QR */}
                  <div className="inline-block p-3 bg-white border border-stone-300 rounded-xl shadow-xs">
                    <svg viewBox="0 0 160 160" className="w-36 h-36 mx-auto">
                      <rect width="160" height="160" fill="white" />
                      {/* Top left marker */}
                      <rect x="15" y="15" width="40" height="40" fill="#1c1917" rx="3" />
                      <rect x="23" y="23" width="24" height="24" fill="white" />
                      <rect x="29" y="29" width="12" height="12" fill="#d97706" />

                      {/* Top right marker */}
                      <rect x="105" y="15" width="40" height="40" fill="#1c1917" rx="3" />
                      <rect x="113" y="23" width="24" height="24" fill="white" />
                      <rect x="119" y="29" width="12" height="12" fill="#d97706" />

                      {/* Bottom left marker */}
                      <rect x="15" y="105" width="40" height="40" fill="#1c1917" rx="3" />
                      <rect x="23" y="113" width="24" height="24" fill="white" />
                      <rect x="29" y="119" width="12" height="12" fill="#d97706" />

                      {/* Data Pattern */}
                      <rect x="65" y="20" width="8" height="20" fill="#1c1917" />
                      <rect x="80" y="25" width="15" height="8" fill="#1c1917" />
                      <rect x="65" y="50" width="30" height="8" fill="#1c1917" />
                      <rect x="20" y="65" width="20" height="10" fill="#1c1917" />
                      <rect x="50" y="70" width="60" height="20" fill="#1c1917" />
                      <rect x="120" y="70" width="25" height="15" fill="#1c1917" />
                      <rect x="65" y="105" width="15" height="40" fill="#1c1917" />
                      <rect x="90" y="115" width="20" height="10" fill="#1c1917" />
                      <rect x="120" y="110" width="25" height="35" fill="#1c1917" />

                      {/* Center Brand Badge */}
                      <circle cx="80" cy="80" r="14" fill="#ffffff" />
                      <circle cx="80" cy="80" r="12" fill="#1c1917" />
                      <text x="80" y="84" textAnchor="middle" fill="#d97706" fontSize="9" fontWeight="bold">
                        TCL
                      </text>
                    </svg>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <span className="font-mono text-xs text-stone-700 bg-white border border-stone-300 px-3 py-1.5 rounded-lg select-all">
                      classicliving@indoreicici
                    </span>
                    <button
                      type="button"
                      onClick={copyUpiId}
                      className="px-2.5 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedUpi ? 'Copied!' : 'Copy UPI'}</span>
                    </button>
                  </div>

                  <div className="max-w-xs mx-auto text-left">
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      UPI UTR / Reference No. (Optional for fast verification)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 427981249821"
                      value={upiRefNumber}
                      onChange={(e) => setUpiRefNumber(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-900 font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Method 2: Card */}
              {paymentMethod === 'Card' && (
                <div className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="4532 ···· ···· 8921"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm font-mono text-stone-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="08/29"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm font-mono text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={3}
                        placeholder="•••"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm font-mono text-stone-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Method 3: Net Banking */}
              {paymentMethod === 'NetBanking' && (
                <div className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs">
                  <label className="block font-semibold text-stone-700">Select Bank</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Punjab National Bank', 'Bank of Baroda'].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                          selectedBank === bank
                            ? 'bg-amber-50 border-amber-600 font-bold text-amber-900'
                            : 'bg-white border-stone-200 text-stone-700'
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Official Booking Voucher / Receipt Slip */}
          {currentStep === 5 && confirmedBooking && (
            <div className="space-y-6 printable-slip">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-900 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-sm">Bed Reservation Confirmed!</div>
                  <div className="text-xs text-emerald-800">
                    Your allotment slip is generated. Key reservation locked under reference #{confirmedBooking.bookingId}.
                  </div>
                </div>
              </div>

              {/* Printable Hostel Allotment Slip */}
              <div className="border-2 border-stone-900 rounded-xl p-6 bg-white text-stone-900 space-y-5 shadow-xs">
                {/* Official Letterhead */}
                <div className="flex items-start justify-between border-b-2 border-stone-900 pb-4">
                  <div>
                    <h2 className="text-xl font-black tracking-tight text-stone-900 uppercase">
                      THE CLASSIC LIVING
                    </h2>
                    <div className="text-xs font-medium text-stone-600">
                      थे क्लासिक लिविंग · Boys' Hostel & Co-Living
                    </div>
                    <div className="text-[11px] text-stone-500 mt-1 max-w-sm">
                      {HOSTEL_INFO.address}
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono">
                      Warden Desk: {HOSTEL_INFO.phone} · Plus Code: {HOSTEL_INFO.plusCode}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono uppercase text-stone-400">Allotment No.</div>
                    <div className="text-base font-black font-mono text-amber-800">
                      {confirmedBooking.bookingId}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-1 font-mono">
                      Issued: {confirmedBooking.timestamp}
                    </div>
                  </div>
                </div>

                {/* Resident Particulars */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-stone-400 block font-mono">RESIDENT NAME</span>
                    <strong className="text-sm font-bold text-stone-900">
                      {confirmedBooking.residentName || 'Aryan Sharma'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-mono">CONTACT NUMBER</span>
                    <strong className="font-mono text-stone-900">
                      {confirmedBooking.phone || '+91 98260 12345'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-mono">INSTITUTE / EXAM</span>
                    <strong className="text-stone-900">{confirmedBooking.institution}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-mono">ROOM ALLOTTED</span>
                    <strong className="text-stone-900">
                      Room {confirmedBooking.roomNumber} ({confirmedBooking.roomTitle})
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-mono">BED IDENTIFIER</span>
                    <strong className="text-stone-900 bg-amber-100 px-2 py-0.5 rounded font-mono">
                      {confirmedBooking.bedNumber}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-mono">CHECK-IN DATE</span>
                    <strong className="text-stone-900">{confirmedBooking.checkInDate}</strong>
                  </div>
                </div>

                {/* Financial Breakup */}
                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-xs space-y-2">
                  <div className="flex justify-between text-stone-600">
                    <span>Monthly Accommodation Rent:</span>
                    <span className="font-mono">₹{confirmedBooking.monthlyRent.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Mess Charges:</span>
                    <span className="font-mono">₹{confirmedBooking.messMonthlyFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Refundable Caution Deposit:</span>
                    <span className="font-mono">₹{confirmedBooking.securityDeposit.toLocaleString('en-IN')}</span>
                  </div>
                  {confirmedBooking.discountApplied > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount (Coupon/Tenure):</span>
                      <span className="font-mono">-₹{confirmedBooking.discountApplied.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-stone-200 pt-2 font-bold text-stone-900">
                    <span>Amount Paid Online ({confirmedBooking.paymentMethod}):</span>
                    <span className="font-mono text-emerald-700">
                      ₹{confirmedBooking.amountPaid.toLocaleString('en-IN')} (PAID)
                    </span>
                  </div>
                  {confirmedBooking.balanceDue > 0 && (
                    <div className="flex justify-between text-stone-600 pt-1">
                      <span>Remaining Balance Payable at Physical Check-in:</span>
                      <span className="font-mono font-bold text-amber-800">
                        ₹{confirmedBooking.balanceDue.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Instructions */}
                <div className="text-[11px] text-stone-500 space-y-1">
                  <div>• Please present this slip and government ID card at the front desk upon arrival.</div>
                  <div>• Biometric entry access card will be configured within 10 minutes of arrival.</div>
                  <div>• Daily mess starts from day of check-in. Warden Hotline: {HOSTEL_INFO.phone}.</div>
                </div>
              </div>

              {/* Action Buttons for Confirmed State */}
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Allotment Voucher</span>
                </button>

                <a
                  href={`https://wa.me/${HOSTEL_INFO.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Warden, I have booked a bed online at The Classic Living Indore! Booking ID: ${confirmedBooking.bookingId}, Room: ${confirmedBooking.roomNumber}, Bed: ${confirmedBooking.bedNumber}, Name: ${confirmedBooking.residentName}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Send Confirmation to Warden (WhatsApp)</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Controls */}
        <div className="bg-stone-100 p-4 sm:px-6 border-t border-stone-200 flex items-center justify-between shrink-0">
          {currentStep > 1 && currentStep < 5 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="py-2 px-4 border border-stone-300 hover:border-stone-400 bg-white rounded-lg text-xs font-semibold text-stone-700 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 4 && (
            <button
              type="button"
              onClick={() => {
                if (currentStep === 1 && !residentName) {
                  setResidentName('Aryan Sharma');
                }
                setCurrentStep((prev) => prev + 1);
              }}
              className="py-2.5 px-5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span>Continue to Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {currentStep === 4 && (
            <button
              type="button"
              disabled={isProcessingPayment}
              onClick={handleProcessPayment}
              className="py-2.5 px-6 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-sm"
            >
              {isProcessingPayment ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Confirming Transaction...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Pay ₹{amountToPayNow.toLocaleString('en-IN')} & Lock Bed</span>
                </>
              )}
            </button>
          )}

          {currentStep === 5 && (
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Done & Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
