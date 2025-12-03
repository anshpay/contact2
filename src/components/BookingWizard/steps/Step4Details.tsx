import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Step4Props } from '../../../types';
import { createBooking, getTimezone } from '../../../services/calApi';

const getTimezoneOffsetMinutes = (timeZone: string, date: Date) => {
  const local = new Date(date.toLocaleString('en-US', { timeZone }));
  const utc = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  return (local.getTime() - utc.getTime()) / 60000;
};

const toEventDate = (fullDate: string, timeLabel: string, timeZone: string) => {
  const [time, meridiem] = timeLabel.split(' ');
  const [hourStr, minuteStr] = time.split(':');
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  if (meridiem?.toUpperCase() === 'PM' && hour !== 12) hour += 12;
  if (meridiem?.toUpperCase() === 'AM' && hour === 12) hour = 0;

  const [year, month, day] = fullDate.split('-').map(Number);
  const utcDate = new Date(Date.UTC(year, (month || 1) - 1, day || 1, hour, minute, 0, 0));
  const offsetMinutes = getTimezoneOffsetMinutes(timeZone, utcDate);
  return new Date(utcDate.getTime() - offsetMinutes * 60000);
};

const Step4Details: React.FC<Step4Props> = ({
  name,
  phone,
  selectedDate,
  selectedTime,
  email,
  setEmail,
  notes,
  setNotes,
  onNext,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !email.includes('@')) return;
    const timezone = getTimezone();
    setIsSubmitting(true);
    try {
      const start = toEventDate(selectedDate.fullDate, selectedTime, timezone);
      const end = new Date(start);
      end.setMinutes(end.getMinutes() + 45);

      await createBooking({
        eventTypeId: '',
        start: start.toISOString(),
        end: end.toISOString(),
        timezone,
        attendees: [
          {
            name,
            email,
            phoneNumber: phone ? `+91${phone}` : undefined,
            notes: notes || undefined,
          },
        ],
        metadata: notes ? { notes } : undefined,
      });
    } catch (error) {
      console.error('Booking submission failed', error);
    } finally {
      setIsSubmitting(false);
      onNext();
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-2xl font-bold text-white mb-2">Confirm your details to schedule the expert call</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-4">
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 focus-within:border-white transition-colors">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email ID"
            className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
          />
        </div>
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 focus-within:border-white transition-colors">
          <input
            type="email"
            placeholder="Guest email ID (optional)"
            className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
          />
        </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 focus-within:border-white transition-colors mb-8 h-32">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Anything specific you'd like to discuss? e.g., Portfolio restructuring"
          className="w-full h-full bg-transparent text-white placeholder-gray-500 outline-none resize-none"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!email.includes('@') || isSubmitting || !selectedDate || !selectedTime}
        className="w-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
      >
        Submit <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default Step4Details;
