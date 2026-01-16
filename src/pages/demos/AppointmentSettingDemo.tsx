import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DemoPageTemplate } from '../../components/demos/DemoPageTemplate';
import { Calendar, Clock, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

export function AppointmentSettingDemo() {
    const [hoursWasted, setHoursWasted] = useState(5);
    const [hourlyRate, setHourlyRate] = useState(100);

    const weeklyCost = hoursWasted * hourlyRate;
    const annualCost = weeklyCost * 52;
    const annualSavings = annualCost - 1200; // Assuming $100/mo W3 cost

    return (
        <DemoPageTemplate
            title="Your Calendar is a Tetris Game. Let AI Play It."
            subtitle="43% of people spend 3+ hours a week just scheduling meetings. Stop the 'Email Ping Pong'. Reclaim 150 hours a year."
            heroCta="Reclaim Your Time"
            onCtaClick={() => document.getElementById('demo-interactive')?.scrollIntoView({ behavior: 'smooth' })}
            comparisonTable={{
                headers: ['Feature', 'Calendly / Manual Email', 'W3 Scheduler Agent'],
                rows: [
                    { feature: 'Initiation', oldWay: 'You send a link (Passive)', newWay: 'AI calls/texts them (Active)' },
                    { feature: 'Rescheduling', oldWay: 'Manual back-and-forth', newWay: 'Automatic Negotiation' },
                    { feature: 'No-Shows', oldWay: '20% Industry Avg', newWay: '< 5% (SMS Reminders)' },
                    { feature: 'Context', oldWay: 'None (Just a time slot)', newWay: 'Pre-qualified & Briefed' },
                    { feature: 'Cost', oldWay: '$15/mo + Your Time', newWay: 'Outcome Based' },
                ]
            }}
        >
            <div id="demo-interactive" className="max-w-4xl mx-auto text-center px-4">
                <h3 className="text-3xl font-bold mb-12">The "Email Ping Pong" Tax</h3>

                <div className="bg-[--bg-tertiary] border border-[--border-primary] rounded-3xl p-8 md:p-12 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mb-12">
                        <div>
                            <label className="block text-sm font-medium mb-4 text-[--text-secondary]">
                                Hours/Week scheduling meetings: <span className="text-[--primary] font-bold text-xl ml-2">{hoursWasted}</span>
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                value={hoursWasted}
                                onChange={(e) => setHoursWasted(Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[--primary]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-4 text-[--text-secondary]">
                                Your Hourly Value ($):
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                <input
                                    type="number"
                                    value={hourlyRate}
                                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                                    className="w-full bg-[--bg-secondary] border border-[--border-primary] rounded-xl pl-8 pr-4 py-2 text-[--text-primary] focus:ring-2 focus:ring-[--primary] outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative">
                        {/* Visual: Ping Pong */}
                        <div className="relative w-48 h-32 md:w-64 md:h-48 border-2 border-dashed border-gray-600 rounded-2xl flex items-center justify-center bg-gray-800/50">
                            <div className="absolute top-2 left-2 text-xs text-gray-400">Monday</div>
                            <motion.div
                                animate={{ x: [0, 100, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                className="w-4 h-4 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                            />
                            <div className="absolute bottom-2 right-2 text-xs text-gray-400">Friday</div>
                            <p className="absolute -bottom-8 text-sm text-red-400 font-bold">Manual Ping Pong</p>
                        </div>

                        <ArrowRight className="w-8 h-8 text-[--text-secondary] hidden md:block" />

                        {/* Visual: AI Tetris */}
                        <div className="relative w-48 h-32 md:w-64 md:h-48 border-2 border-[--primary] rounded-2xl bg-[--primary]/10 overflow-hidden">
                            <motion.div
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="absolute top-2 left-2 w-12 h-8 bg-green-400/80 rounded"
                            />
                            <motion.div
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1 }}
                                className="absolute top-12 left-16 w-12 h-16 bg-blue-400/80 rounded"
                            />
                            <motion.div
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.5 }}
                                className="absolute bottom-2 right-4 w-20 h-8 bg-purple-400/80 rounded"
                            />
                            <p className="absolute -bottom-8 text-sm text-[--primary] font-bold">AI Optimization</p>
                        </div>
                    </div>

                    <motion.div
                        key={annualSavings}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mt-16 p-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl border border-indigo-500/30"
                    >
                        <h4 className="text-2xl font-bold text-white mb-2">
                            ${annualSavings.toLocaleString()} / year
                        </h4>
                        <p className="text-[--text-secondary]">
                            Value reclaimed by switching to AI scheduling.
                        </p>
                    </motion.div>
                </div>
            </div>
        </DemoPageTemplate>
    );
}
