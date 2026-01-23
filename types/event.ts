export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  category: string;
  price: number;
  image: string;
  organizer: string;
  availableTickets: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventFilters {
  category?: string;
  date?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}