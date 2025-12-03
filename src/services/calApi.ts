import { CreateBookingPayload } from '../types';

const DEFAULT_TIMEZONE = 'Asia/Kolkata';
const FUNCTION_BASE = '/.netlify/functions/cal';

export const getAvailableSlots = async (date: string): Promise<string[]> => {
  try {
    const params = new URLSearchParams({
      action: 'slots',
      date,
    });

    const response = await fetch(`${FUNCTION_BASE}?${params.toString()}`);
    if (!response.ok) {
      console.error('Failed to fetch available slots', response.statusText);
      return [];
    }

    const data = await response.json();
    return Array.isArray(data?.slots) ? data.slots : [];
  } catch (error) {
    console.error('Error fetching available slots', error);
    return [];
  }
};

export const createBooking = async (payload: CreateBookingPayload) => {
  try {
    const response = await fetch(`${FUNCTION_BASE}?action=booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        timezone: DEFAULT_TIMEZONE,
      }),
    });

    if (!response.ok) {
      console.error('Failed to create booking', response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating booking', error);
    return null;
  }
};

export const getTimezone = () => DEFAULT_TIMEZONE;
