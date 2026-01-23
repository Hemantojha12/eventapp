import api from './api';
import { Event, EventFilters } from '../types/event';

export const eventService = {
  // Get all events
  getAllEvents: async (filters?: EventFilters) => {
    const response = await api.get('/events', { params: filters });
    return response.data;
  },

  // Get single event
  getEventById: async (id: string) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  // Get events by category
  getEventsByCategory: async (category: string) => {
    const response = await api.get(`/events/category/${category}`);
    return response.data;
  },

  // Search events
  searchEvents: async (query: string) => {
    const response = await api.get(`/events/search?q=${query}`);
    return response.data;
  },

  // Get upcoming events
  getUpcomingEvents: async () => {
    const response = await api.get('/events/upcoming');
    return response.data;
  },

  // Get featured events
  getFeaturedEvents: async () => {
    const response = await api.get('/events/featured');
    return response.data;
  },
};