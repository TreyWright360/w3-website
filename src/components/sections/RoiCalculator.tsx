import { useState } from 'react';
import { BadgeDollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export function RoiCalculator() {
  const [missedCalls, setMissedCalls] = useState(10);
  const [customerValue, setCustomerValue] = useState(500);

  const monthlyBurn = missedCalls * 4 * customerValue;

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            The <span className="text-red-500">Cost</span> of Silence
          </h2>
          <p className="text-[--text-secondary] text-lg max-w-2xl mx-auto">
            Most businesses miss 20-30% of their inbound calls. See how much revenue you are leaving on the table every single month.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-[--bg-secondary] border border-[--border-default] rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Sliders */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-medium text-lg">Missed Calls Per Week</label>
                  <span className="px-3 py-1 bg-[--bg-tertiary] rounded-lg font-mono text-[--primary]">{missedCalls}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={missedCalls} 
                  onChange={(e) => setMissedCalls(Number(e.target.value))}
                  className="w-full h-2 bg-[--bg-tertiary] rounded-lg appearance-none cursor-pointer accent-[--primary]"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-medium text-lg">Avg. Customer Value</label>
                  <span className="px-3 py-1 bg-[--bg-tertiary] rounded-lg font-mono text-[--primary]">${customerValue}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="5000" 
                  step="50"
                  value={customerValue} 
                  onChange={(e) => setCustomerValue(Number(e.target.value))}
                  className="w-full h-2 bg-[--bg-tertiary] rounded-lg appearance-none cursor-pointer accent-[--primary]"
                />
              </div>
            </div>

            {/* Result */}
            <div className="relative">
                <div className="absolute inset-0 bg-red-500/5 blur-3xl rounded-full" />
                <div className="relative bg-black/40 border border-white/5 rounded-2xl p-8 text-center backdrop-blur-sm">
                    <p className="text-[--text-secondary] mb-2 uppercase tracking-wide text-sm">Monthly Revenue Lost</p>
                    <motion.div 
                        key={monthlyBurn}
                        initial={{ scale: 0.9, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-red-600 font-mono"
                    >
                        ${monthlyBurn.toLocaleString()}
                    </motion.div>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm text-[--text-secondary]">
                        <BadgeDollarSign className="w-4 h-4 text-green-400" />
                        <span>Recoverable with AI Receptionist</span>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
