import { useState } from 'react';
import { motion } from 'framer-motion';
import { DemoPageTemplate } from '../../components/demos/DemoPageTemplate';
import { PhoneOff, Calculator, Moon, Sun, DollarSign } from 'lucide-react';

export function PhoneSupportDemo() {
    const [missedCalls, setMissedCalls] = useState(10);
    const [avgValue, setAvgValue] = useState(500);
    const [isDark, setIsDark] = useState(true);

    const annualLoss = missedCalls * 52 * avgValue;
    const annualCostW3 = 1200;

    return (
        <DemoPageTemplate
            title="Your Receptionist Sleeps. Your Competitor's AI Doesn't."
            subtitle="60% of leads call after hours. They don't leave voicemails. They call the next number. Stop the bleeding."
            heroCta="Activate 24/7 Support"
            onCtaClick={() => document.getElementById('demo-interactive')?.scrollIntoView({ behavior: 'smooth' })}
            comparisonTable={{
                headers: ['Feature', 'Human Receptionist', 'W3 AI Receptionist'],
                rows: [
                    { feature: 'Availability', oldWay: '9am - 5pm (40 hrs/wk)', newWay: '24/7/365 (168 hrs/wk)' },
                    { feature: 'Capacity', oldWay: '1 Call at a time', newWay: 'Unlimited Simultaneous Calls' },
                    { feature: 'Cost', oldWay: '~$3,000 / month', newWay: '~$99 / month' },
                    { feature: 'Memory', oldWay: 'Forgets details / Sick days', newWay: 'Perfect Recall / Annual Uptime' },
                    { feature: 'Action', oldWay: 'Takes a message (maybe)', newWay: 'Books Appointment + Sends SMS' },
                ]
            }}
        >
            <div id="demo-interactive" className="max-w-4xl mx-auto text-center relative overflow-hidden transition-colors duration-500">

                {/* Day/Night Toggle Mockup */}
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className={`p-2 rounded-full ${isDark ? 'bg-indigo-900 text-white' : 'bg-yellow-100 text-yellow-600'} transition-colors`}
                    >
                        {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </button>
                </div>

                <div className={`p-8 rounded-3xl border transition-all duration-500 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200 text-gray-900'}`}>
                    <h3 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>Missed Revenue Calculator</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 text-left">
                        <div>
                            <label className={`block text-sm font-medium mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Missed Calls per Week: <span className="text-[--primary] font-bold text-xl ml-2">{missedCalls}</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="50"
                                value={missedCalls}
                                onChange={(e) => setMissedCalls(Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[--primary]"
                            />
                        </div>
                        <div>
                            <label className={`block text-sm font-medium mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Avg. Customer Value ($):
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="number"
                                    value={avgValue}
                                    onChange={(e) => setAvgValue(Number(e.target.value))}
                                    className={`w-full pl-10 pr-4 py-2 rounded-xl border focus:ring-2 focus:ring-[--primary] outline-none ${isDark ? 'bg-slate-800 border-slate-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                        {/* Loss Card */}
                        <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl relative overflow-hidden group">
                            {annualLoss > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.1 }}
                                    className="absolute inset-0 bg-red-500 blur-3xl"
                                />
                            )}
                            <h4 className="text-red-400 font-medium mb-2 flex items-center gap-2">
                                <PhoneOff className="w-5 h-5" /> Current Annual Loss
                            </h4>
                            <motion.p
                                key={annualLoss}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="text-4xl font-bold text-red-500"
                            >
                                ${annualLoss.toLocaleString()}
                            </motion.p>
                            <p className="text-xs text-red-400/60 mt-2">Money currently going to competitors</p>
                        </div>

                        {/* W3 Card */}
                        <div className="bg-[--primary]/10 border border-[--primary]/30 p-6 rounded-2xl relative overflow-hidden">
                            <h4 className="text-[--primary] font-medium mb-2 flex items-center gap-2">
                                <Calculator className="w-5 h-5" /> W3 Annual Cost
                            </h4>
                            <p className="text-4xl font-bold text-[--primary]">
                                ${annualCostW3.toLocaleString()}
                            </p>
                            <p className="text-xs text-[--primary]/60 mt-2">Fixed cost. Infinite scale.</p>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-8 p-4 bg-green-500/10 rounded-xl border border-green-500/20 text-green-400"
                    >
                        <strong>ROI Insight:</strong> You could save <strong>${(annualLoss - annualCostW3).toLocaleString()}</strong> this year by switching to AI.
                    </motion.div>
                </div>
            </div>
        </DemoPageTemplate>
    );
}
