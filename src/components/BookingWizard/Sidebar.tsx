import React from 'react';
import { Video } from 'lucide-react';
import { SidebarProps } from '../../types';

const Sidebar: React.FC<SidebarProps> = ({ step, selectedDate, selectedTime }) => {
  return (
    <div className="hidden md:flex flex-col justify-between w-1/3 bg-black p-8 border-r border-gray-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 to-black opacity-50 z-0"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-auto mt-4">
          <h1 className="text-5xl font-serif text-white mb-4 tracking-wide">Sovereign</h1>
          <p className="text-gray-400 text-sm uppercase tracking-widest border-l-2 border-white pl-4 ml-1">
            Private Client Group
          </p>
        </div>

        <div className="mb-12">
          {step === 4 ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <p className="text-gray-400 text-xs mb-2 uppercase tracking-wider">Meeting Schedule</p>
                <div className="text-white text-xl font-light">
                  {selectedDate?.day}, {selectedDate?.date}
                </div>
                <div className="text-white text-xl font-light">{selectedTime}</div>
              </div>
              <p className="text-gray-500 text-sm">You will receive updates on your registered number.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-gray-300 text-xl font-light leading-relaxed">
                Experience bespoke wealth management solutions tailored for ultra-high net worth individuals.
              </p>
              <div className="flex items-center gap-4 text-gray-500 text-sm pt-4">
                <div className="w-8 h-[1px] bg-gray-700"></div>
                <span className="uppercase tracking-wider text-xs">By Invitation Only</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <Video size={14} />
          <span>Web conference details provided upon confirmation</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
