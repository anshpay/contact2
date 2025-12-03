import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Step1Props } from '../../../types';

const Step1Name: React.FC<Step1Props> = ({ name, setName, onNext }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-3xl font-bold text-white mb-8">What is your name?</h2>
      <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-1 focus-within:border-white transition-colors mb-8">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full bg-transparent p-4 text-white placeholder-gray-500 outline-none text-lg"
          autoFocus
        />
      </div>
      <button
        onClick={onNext}
        disabled={name.length < 2}
        className="w-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
      >
        Next <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default Step1Name;
