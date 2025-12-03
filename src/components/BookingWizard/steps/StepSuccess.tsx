import React from 'react';
import { User } from 'lucide-react';

const StepSuccess: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-in zoom-in duration-500">
      <div className="relative mb-8">
        <div className="flex items-center justify-center -space-x-4">
          <div className="w-16 h-16 rounded-full border-4 border-black bg-gray-700 overflow-hidden">
            <img src="/api/placeholder/100/100" alt="Avatar" className="w-full h-full object-cover opacity-80" />
          </div>
          <div className="w-20 h-20 rounded-full border-4 border-black bg-gray-600 z-10 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400">
              <User size={32} />
            </div>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-black bg-gray-700 overflow-hidden">
            <img src="/api/placeholder/100/100" alt="Avatar" className="w-full h-full object-cover opacity-80" />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">Welcome to Sovereign</h2>
      <p className="text-gray-400 text-sm max-w-md">
        Assigning a dedicated Relationship Manager to your profile. Please avoid clicking back or closing the window.
      </p>

      <div className="mt-8 flex gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  );
};

export default StepSuccess;
