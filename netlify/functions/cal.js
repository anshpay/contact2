const CAL_API_BASE = 'https://api.cal.com/v2';
const API_VERSION = '2024-08-13';
const DEFAULT_TIMEZONE = 'Asia/Kolkata';

const API_KEY = process.env.CAL_API_KEY || process.env.VITE_CAL_API_KEY || process.env.REACT_APP_CAL_API_KEY;
const EVENT_TYPE_ID =
  process.env.CAL_EVENT_TYPE_ID || process.env.VITE_CAL_EVENT_TYPE_ID || process.env.REACT_APP_CAL_EVENT_TYPE_ID;

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${API_KEY}`,
  'cal-api-version': API_VERSION,
};

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

const formatSlots = (slots = []) =>
  slots
    .map((slot) => slot?.start)
    .filter(Boolean)
    .map((iso) =>
      new Date(iso).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: DEFAULT_TIMEZONE,
      })
    );

exports.handler = async (event) => {
  if (!API_KEY || !EVENT_TYPE_ID) {
    return jsonResponse(500, { error: 'Cal.com credentials missing on server.' });
  }

  const { action } = event.queryStringParameters || {};

  if (action === 'slots') {
    const { date } = event.queryStringParameters || {};
    if (!date) return jsonResponse(400, { error: 'date is required' });

    try {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setHours(23, 59, 59, 999);

      const params = new URLSearchParams({
        eventTypeId: EVENT_TYPE_ID,
        timezone: DEFAULT_TIMEZONE,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      });

      const res = await fetch(`${CAL_API_BASE}/slots/available?${params.toString()}`, {
        headers,
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('Cal slots error', res.status, errText);
        return jsonResponse(res.status, { error: 'Failed to fetch slots' });
      }

      const data = await res.json();
      return jsonResponse(200, { slots: formatSlots(data?.slots) });
    } catch (error) {
      console.error('Cal slots exception', error);
      return jsonResponse(500, { error: 'Unexpected error fetching slots' });
    }
  }

  if (action === 'booking' && event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body || '{}');
      const bookingPayload = {
        ...body,
        eventTypeId: EVENT_TYPE_ID,
        timezone: DEFAULT_TIMEZONE,
      };

      const res = await fetch(`${CAL_API_BASE}/bookings`, {
        method: 'POST',
        headers,
        body: JSON.stringify(bookingPayload),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('Cal booking error', res.status, errText);
        return jsonResponse(res.status, { error: 'Failed to create booking' });
      }

      const data = await res.json();
      return jsonResponse(200, data);
    } catch (error) {
      console.error('Cal booking exception', error);
      return jsonResponse(500, { error: 'Unexpected error creating booking' });
    }
  }

  return jsonResponse(400, { error: 'Unsupported action' });
};
