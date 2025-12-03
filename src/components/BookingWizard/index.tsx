import React, { useState } from 'react';
import { ChevronLeft, MessageCircle, ShieldCheck } from 'lucide-react';
import Sidebar from './Sidebar';
import Step1Name from './steps/Step1Name';
import Step2Phone from './steps/Step2Phone';
import Step3Calendar from './steps/Step3Calendar';
import Step4Details from './steps/Step4Details';
import StepSuccess from './steps/StepSuccess';
import { DateOption } from '../../types';

const BookingWizard: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<DateOption | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-5xl h-[650px] bg-black rounded-3xl overflow-hidden flex shadow-2xl border border-gray-800">
        {step !== 5 && <Sidebar step={step} selectedDate={selectedDate} selectedTime={selectedTime} />}

        <div
          className={`
             ${step === 5 ? 'w-full' : 'w-full md:w-2/3'} 
             relative bg-black flex flex-col
        `}
        >
          <div className="flex items-center justify-between p-8 pb-0">
            {step > 1 && step < 5 && (
              <button onClick={prevStep} className="flex items-center text-gray-400 hover:text-white transition-colors text-sm">
                <ChevronLeft size={16} /> Step {step} of 4
              </button>
            )}

            {step < 5 && (
              <button className="ml-auto flex items-center gap-2 bg-gray-800/50 hover:bg-gray-800 text-white px-4 py-2 rounded-full text-xs font-medium transition-all border border-gray-700">
                <MessageCircle size={14} className="text-green-500" /> Help
              </button>
            )}
          </div>

          <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
            {step === 1 && <Step1Name name={name} setName={setName} onNext={nextStep} />}

            {step === 2 && <Step2Phone phone={phone} setPhone={setPhone} onNext={nextStep} />}

            {step === 3 && (
              <Step3Calendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                onNext={nextStep}
              />
            )}

            {step === 4 && (
              <Step4Details
                name={name}
                phone={phone}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                email={email}
                setEmail={setEmail}
                notes={notes}
                setNotes={setNotes}
                onNext={nextStep}
              />
            )}

            {step === 5 && <StepSuccess />}
          </div>

          {step < 5 && (
            <div className="p-8 pt-0 flex justify-center md:justify-end">
              <div className="flex items-center gap-2 text-gray-600 text-xs">
                <ShieldCheck size={12} />
                Your data is 100% protected
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingWizard;
