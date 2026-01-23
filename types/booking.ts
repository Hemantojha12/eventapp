export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  tickets: number;
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  paymentId?: string;
  event?: {
    title: string;
    date: string;
    image: string;
  };
}

export interface CreateBookingDto {
  eventId: string;
  tickets: number;
  paymentMethod: string;
}