import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Step2Props } from '../../../types';

const Step2Phone: React.FC<Step2Props> = ({ phone, setPhone, onNext }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-3xl font-bold text-white mb-2">Enter your contact details</h2>
      <p className="text-gray-400 mb-8">Receive a reminder before the call</p>

      <div className="space-y-4 mb-8">
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-1 focus-within:border-white transition-colors relative">
          <span className="absolute top-4 left-4 text-gray-400 pointer-events-none text-sm font-medium">Phone Number</span>
          <div className="flex items-center mt-6 px-4 pb-2">
            <span className="text-white mr-2">+91</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder=""
              className="w-full bg-transparent text-white outline-none text-lg"
              autoFocus
            />
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={phone.length < 10}
        className="w-full bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
      >
        Next <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default Step2Phone;
