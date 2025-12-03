export interface DateOption {
  fullDate: string;
  day: string;
  date: string;
  available: boolean;
}

export interface SidebarProps {
  step: number;
  selectedDate: DateOption | null;
  selectedTime: string | null;
}

export interface Step1Props {
  name: string;
  setName: (name: string) => void;
  onNext: () => void;
}

export interface Step2Props {
  phone: string;
  setPhone: (phone: string) => void;
  onNext: () => void;
}

export interface Step3Props {
  selectedDate: DateOption | null;
  setSelectedDate: (date: DateOption) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  onNext: () => void;
}

export interface Step4Props {
  name: string;
  phone: string;
  selectedDate: DateOption | null;
  selectedTime: string | null;
  email: string;
  setEmail: (email: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  onNext: () => void;
}

export interface CreateBookingPayload {
  eventTypeId?: string;
  start: string;
  end: string;
  timezone?: string;
  attendees: Array<{
    name: string;
    email: string;
    phoneNumber?: string;
    notes?: string;
  }>;
  metadata?: Record<string, unknown>;
}
