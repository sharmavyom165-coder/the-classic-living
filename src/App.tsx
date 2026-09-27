import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AmenitiesHighlight } from './components/AmenitiesHighlight';
import { RoomAvailability } from './components/RoomAvailability';
import { FloorplanVisualizer } from './components/FloorplanVisualizer';
import { MessMenu } from './components/MessMenu';
import { TenantReviews } from './components/TenantReviews';
import { LocationAndNeighborhood } from './components/LocationAndNeighborhood';
import { Footer } from './components/Footer';
import { OnlinePaymentModal } from './components/OnlinePaymentModal';
import { RoomDetailModal } from './components/RoomDetailModal';
import { WriteReviewModal } from './components/WriteReviewModal';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';
import { BookingLookupModal } from './components/BookingLookupModal';
import { INITIAL_ROOMS, INITIAL_REVIEWS } from './data/hostelData';
import { Room, Review, BookingDetails } from './types/hostel';

export default function App() {
  // Rooms state with localStorage persistence
  const [rooms, setRooms] = useState<Room[]>(() => {
    try {
      const saved = localStorage.getItem('tcl_rooms_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback to initial
    }
    return INITIAL_ROOMS;
  });

  // Reviews state with localStorage persistence
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('tcl_reviews_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_REVIEWS;
  });

  // Bookings state with sample pre-seeded test booking
  const [bookings, setBookings] = useState<BookingDetails[]>(() => {
    try {
      const saved = localStorage.getItem('tcl_bookings_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return [
      {
        bookingId: 'TCL-IND-2026-1042',
        residentName: 'Pranav Parmar',
        phone: '9826012345',
        email: 'pranav.parmar@gmail.com',
        guardianName: 'Dinesh Parmar',
        guardianPhone: '9826098765',
        institution: 'Allen Career Institute (Vijay Nagar)',
        idType: 'Aadhaar Card',
        idNumber: '4892-1092-3841',
        roomId: 'room-101',
        roomNumber: '101',
        roomTitle: 'Executive Single Suite (AC)',
        bedNumber: 'Bed 1',
        checkInDate: '2026-07-01',
        stayTenureMonths: 11,
        mealPlan: 'all_meals',
        monthlyRent: 13500,
        securityDeposit: 5000,
        messMonthlyFee: 3500,
        discountApplied: 1000,
        paymentType: 'advance_token',
        amountPaid: 2000,
        balanceDue: 19000,
        paymentMethod: 'UPI',
        transactionId: 'TXN_IND_89412039',
        timestamp: '15 Jul 2026, 04:30 PM',
      },
    ];
  });

  // Filters state
  const [filterSharing, setFilterSharing] = useState<string>('all');
  const [filterAC, setFilterAC] = useState<string>('all');

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);

  const [isInspectOpen, setIsInspectOpen] = useState(false);
  const [selectedRoomForInspect, setSelectedRoomForInspect] = useState<Room | null>(null);

  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [isVisitOpen, setIsVisitOpen] = useState(false);
  const [isLookupOpen, setIsLookupOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('tcl_rooms_data', JSON.stringify(rooms));
    } catch (e) {}
  }, [rooms]);

  useEffect(() => {
    try {
      localStorage.setItem('tcl_reviews_data', JSON.stringify(reviews));
    } catch (e) {}
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('tcl_bookings_data', JSON.stringify(bookings));
    } catch (e) {}
  }, [bookings]);

  // Compute total available beds across all rooms
  const totalAvailableBeds = rooms.reduce((acc, r) => acc + r.availableBeds, 0);

  // Handle booking confirmation and decrement room capacity
  const handleBookingConfirmed = (newBooking: BookingDetails) => {
    setBookings((prev) => [newBooking, ...prev]);

    // Update room bed occupancy
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id === newBooking.roomId) {
          const updatedSlots = room.bedSlots.map((slot) => {
            if (slot.bedNumber === newBooking.bedNumber) {
              return {
                ...slot,
                isOccupied: true,
                occupantStream: `${newBooking.institution}`,
              };
            }
            return slot;
          });

          const newAvailable = Math.max(0, room.availableBeds - 1);
          return {
            ...room,
            availableBeds: newAvailable,
            bedSlots: updatedSlots,
            badge: newAvailable === 0 ? 'Fully Booked' : room.badge,
          };
        }
        return room;
      })
    );
  };

  // Handle user writing a review
  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  // Handle review helpful upvote
  const handleLikeReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  // Scroll to section handler
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      {/* 3-Zone Sticky Navigation Bar */}
      <Navbar
        onOpenBooking={() => {
          setSelectedRoomForBooking(rooms.find((r) => r.availableBeds > 0) || rooms[0]);
          setIsBookingOpen(true);
        }}
        onOpenLookup={() => setIsLookupOpen(true)}
        onOpenVisit={() => setIsVisitOpen(true)}
        onNavigate={handleNavigate}
        availableBedsCount={totalAvailableBeds}
      />

      <main className="flex-1">
        {/* Hero Section with Quick Availability Filter */}
        <Hero
          onCheckAvailability={(filters) => {
            setFilterSharing(filters.sharingType);
            setFilterAC(filters.acType);
            handleNavigate('rooms');
          }}
          onOpenBooking={() => {
            setSelectedRoomForBooking(rooms.find((r) => r.availableBeds > 0) || rooms[0]);
            setIsBookingOpen(true);
          }}
          onOpenVisit={() => setIsVisitOpen(true)}
          totalAvailableBeds={totalAvailableBeds}
        />

        {/* Standard Campus Amenities Overview */}
        <AmenitiesHighlight />

        {/* Live Room Availability & Pricing Grid */}
        <RoomAvailability
          rooms={rooms}
          onSelectRoomForBooking={(room) => {
            setSelectedRoomForBooking(room);
            setIsBookingOpen(true);
          }}
          onInspectRoom={(room) => {
            setSelectedRoomForInspect(room);
            setIsInspectOpen(true);
          }}
          activeFilterSharing={filterSharing}
          activeFilterAC={filterAC}
          onFilterChange={(sharing, ac) => {
            setFilterSharing(sharing);
            setFilterAC(ac);
          }}
        />

        {/* Interactive Floorplan & Bed Units Visualizer */}
        <FloorplanVisualizer
          rooms={rooms}
          onSelectRoomForBooking={(room) => {
            setSelectedRoomForBooking(room);
            setIsBookingOpen(true);
          }}
          onInspectRoom={(room) => {
            setSelectedRoomForInspect(room);
            setIsInspectOpen(true);
          }}
        />

        {/* Homestyle Pure-Veg Mess Weekly Schedule */}
        <MessMenu />

        {/* Verified Tenant & Parent Reviews with Tag Filters */}
        <TenantReviews
          reviews={reviews}
          onOpenWriteReview={() => setIsWriteReviewOpen(true)}
          onLikeReview={handleLikeReview}
        />

        {/* Location, Plus Code, Map, and Nearby Coaching Distances */}
        <LocationAndNeighborhood onOpenVisit={() => setIsVisitOpen(true)} />
      </main>

      {/* Institutional Clean Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => {
          setSelectedRoomForBooking(rooms.find((r) => r.availableBeds > 0) || rooms[0]);
          setIsBookingOpen(true);
        }}
        onOpenVisit={() => setIsVisitOpen(true)}
        onOpenLookup={() => setIsLookupOpen(true)}
      />

      {/* Modals & Dialogs */}
      <OnlinePaymentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedRoom={selectedRoomForBooking}
        onBookingConfirmed={handleBookingConfirmed}
        availableRooms={rooms}
      />

      <RoomDetailModal
        room={selectedRoomForInspect}
        onClose={() => setIsInspectOpen(false)}
        onBookRoom={(room) => {
          setSelectedRoomForBooking(room);
          setIsBookingOpen(true);
        }}
      />

      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onSubmitReview={handleAddReview}
      />

      <ScheduleVisitModal
        isOpen={isVisitOpen}
        onClose={() => setIsVisitOpen(false)}
      />

      <BookingLookupModal
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
        bookings={bookings}
      />
    </div>
  );
}
