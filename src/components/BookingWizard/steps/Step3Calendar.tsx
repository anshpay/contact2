import React, { useEffect, useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { DateOption, Step3Props } from '../../../types';
import { getAvailableSlots } from '../../../services/calApi';

const getNextDays = (days: number = 5): DateOption[] => {
  const dates: DateOption[] = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);

    dates.push({
      fullDate: nextDate.toISOString(),
      day: nextDate.toLocaleDateString('en-US', { weekday: 'short' }),
      date: nextDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      available: nextDate.getDay() !== 0 && nextDate.getDay() !== 6,
    });
  }
  return dates;
};

const Step3Calendar: React.FC<Step3Props> = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  onNext,
}) => {
  const [dates, setDates] = useState<DateOption[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  useEffect(() => {
    const nextDays = getNextDays(6);
    setDates(nextDays);
    const firstAvailable = nextDays.find((d) => d.available);
    if (firstAvailable) setSelectedDate(firstAvailable);
  }, [setSelectedDate]);

  useEffect(() => {
    let isMounted = true;
    const loadSlots = async () => {
      if (selectedDate && selectedDate.available) {
        setIsLoadingSlots(true);
        setSelectedTime(null);
        try {
          const slots = await getAvailableSlots(selectedDate.fullDate);
          if (isMounted) {
            setAvailableSlots(slots);
          }
        } catch (error) {
          console.error('Unable to load slots', error);
          if (isMounted) {
            setAvailableSlots([]);
          }
        } finally {
          if (isMounted) {
            setIsLoadingSlots(false);
          }
        }
      }
    };

    loadSlots();
    return () => {
      isMounted = false;
    };
  }, [selectedDate, setSelectedTime]);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-3xl font-bold text-white mb-6">Select date and time</h2>

      <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {dates.map((d, i) => (
          <button
            key={i}
            onClick={() => d.available && setSelectedDate(d)}
            disabled={!d.available}
            className={`
                    flex flex-col items-center justify-center min-w-[80px] h-[90px] rounded-xl border transition-all
                    ${
                      !d.available
                        ? 'border-gray-800 opacity-50 cursor-not-allowed bg-gray-900/30'
                        : selectedDate?.date === d.date
                        ? 'bg-white text-black border-white'
                        : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500'
                    }
                `}
          >
            <span className="text-xs font-medium uppercase mb-1">{d.day}</span>
            <span className="text-lg font-bold">{d.date.split(' ')[0]}</span>
            <span className="text-xs">{d.date.split(' ')[1]}</span>
          </button>
        ))}
      </div>

      <p className="text-gray-400 mb-4 text-sm">45 min call (Indian Standard Time)</p>

      <div className="min-h-[160px]">
        {isLoadingSlots ? (
          <div className="flex items-center justify-center h-32 text-gray-500 gap-2">
            <Loader2 className="animate-spin" /> Checking availability...
          </div>
        ) : availableSlots.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-gray-500 bg-gray-900/30 rounded-lg border border-gray-800 border-dashed">
            No slots available for this date.
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 mb-12">
            {availableSlots.map((time, i) => (
              <button
                key={i}
                onClick={() => setSelectedTime(time)}
                className={`
                            py-3 rounded-lg border text-sm font-medium transition-all
                            ${
                              selectedTime === time
                                ? 'bg-white text-black border-white'
                                : 'bg-gray-900 border-gray-700 text-white hover:bg-gray-800'
                            }
                        `}
              >
                {time}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-8 flex items-start gap-3">
        <div className="mt-1">
          <div className="text-yellow-500">💡</div>
        </div>
        <div>
          <p className="text-gray-300 text-sm">
            <span className="font-bold text-white">413</span> private clients scheduled a consultation with Sovereign this
            month
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!selectedDate || !selectedTime}
        className="w-full bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
      >
        Confirm time slot <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default Step3Calendar;
