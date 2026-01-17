
import { useState } from 'react';
import { motion } from 'framer-motion';
import { DemoPageTemplate } from '../../components/demos/DemoPageTemplate';
import { Users, Zap } from 'lucide-react';

export function TextSupportDemo() {
    const [ticketVolume, setTicketVolume] = useState(500);
    const [isAnnual, setIsAnnual] = useState(false);

    // Industry stats
    const humanCostPerTicket = 7; // $7 per resolution avg
    const intercomSeatCost = 1200; // $100/mo * 12
    const w3FlatRate = 500 * 12; // $6k/yr flat for unlimited

    // Calculations
    const agentsNeeded = Math.ceil(ticketVolume / 400); // 400 tickets/agent/month
    const annualHumanCost = (ticketVolume * 12 * humanCostPerTicket) + (agentsNeeded * intercomSeatCost);
    const annualW3Cost = w3FlatRate;
    const savings = annualHumanCost - annualW3Cost;

    return (
        <DemoPageTemplate
            title="Stop Paying the 'Intercom Tax'."
            subtitle="Competitors charge you per seat and per resolution. We charge a flat rate for unlimited scale. Stop being punished for growth."
            heroCta="Calculate Your Savings"
            onCtaClick={() => document.getElementById('demo-interactive')?.scrollIntoView({ behavior: 'smooth' })}
            comparisonTable={{
                headers: ['Feature', 'Intercom/Zendesk', 'W3 Text Neural'],
                rows: [
                    { feature: 'Pricing Model', oldWay: 'Per Seat + Per Resolution', newWay: 'Flat Monthly Rate' },
                    { feature: 'Training', oldWay: 'Manual Human Onboarding', newWay: 'Instant Knowledge Base Sync' },
                    { feature: 'Response Time', oldWay: '2 - 4 Hours', newWay: 'Instant (0 Seconds)' },
                    { feature: 'Availability', oldWay: '9am - 5pm', newWay: '24/7/365' },
                    { feature: 'Tone', oldWay: 'Inconsistent', newWay: 'Perfectly On-Brand' },
                ]
            }}
        >
            <div id="demo-interactive" className="max-w-4xl mx-auto text-center px-4">
                <h3 className="text-3xl font-bold mb-12">The "Scale Tax" Calculator</h3>

                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => setIsAnnual(!isAnnual)}
                        className="bg-[--bg-tertiary] border border-[--border-primary] px-4 py-2 rounded-full text-sm font-medium hover:bg-[--bg-secondary] transition-colors"
                    >
                        {isAnnual ? 'Showing Annual Savings' : 'Show Annual Savings'}
                    </button>
                </div>

                <div className="bg-[--bg-tertiary] border border-[--border-primary] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">

                    {/* Slider Section */}
                    <div className="mb-16 max-w-2xl mx-auto">
                        <label className="block text-xl font-bold mb-6">
                            Monthly Support Tickets: <span className="text-[--primary] text-3xl ml-2">{ticketVolume}</span>
                        </label>
                        <input
                            type="range"
                            min="100"
                            max="5000"
                            step="100"
                            value={ticketVolume}
                            onChange={(e) => setTicketVolume(Number(e.target.value))}
                            className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[--primary]"
                        />
                        <div className="flex justify-between text-sm text-[--text-secondary] mt-3">
                            <span>Startup (100)</span>
                            <span>Enterprise (5,000+)</span>
                        </div>
                    </div>

                    {/* Comparison Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">

                        {/* Competitor Cost */}
                        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8 relative overflow-hidden transition-all duration-300 hover:bg-red-500/10">
                            <div className="absolute -right-4 -top-4 bg-red-500/20 w-24 h-24 rounded-full blur-2xl"></div>

                            <h4 className="text-xl font-bold text-red-400 mb-6 flex items-center justify-center gap-2">
                                <Users className="w-5 h-5" /> Human + SaaS Cost
                            </h4>

                            <div className="space-y-3 mb-8 text-sm text-[--text-secondary]">
                                <div className="flex justify-between">
                                    <span>Agents Needed:</span>
                                    <span className="font-bold text-white">{agentsNeeded}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Avg. Cost/Ticket:</span>
                                    <span className="font-bold text-white">$7.00</span>
                                </div>
                                <div className="flex justify-between border-t border-red-500/20 pt-2">
                                    <span>SaaS Seats Cost:</span>
                                    <span className="font-bold text-white">${(agentsNeeded * intercomSeatCost).toLocaleString()}/yr</span>
                                </div>
                            </div>

                            <div className="text-4xl font-bold text-white">
                                ${annualHumanCost.toLocaleString()}
                                <span className="text-sm font-normal text-[--text-secondary] block mt-1">per year</span>
                            </div>
                        </div>

                        {/* W3 Cost */}
                        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-8 relative overflow-hidden transition-all duration-300 hover:bg-emerald-500/10">
                            <div className="absolute -right-4 -top-4 bg-emerald-500/20 w-24 h-24 rounded-full blur-2xl"></div>

                            <h4 className="text-xl font-bold text-emerald-400 mb-6 flex items-center justify-center gap-2">
                                <Zap className="w-5 h-5" /> W3 Flat Rate
                            </h4>

                            <div className="space-y-3 mb-8 text-sm text-[--text-secondary]">
                                <div className="flex justify-between">
                                    <span>Agents Needed:</span>
                                    <span className="font-bold text-white">0 (AI)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Cost/Ticket:</span>
                                    <span className="font-bold text-white">$0.00</span>
                                </div>
                                <div className="flex justify-between border-t border-emerald-500/20 pt-2">
                                    <span>SaaS Seats Cost:</span>
                                    <span className="font-bold text-white">$0</span>
                                </div>
                            </div>

                            <div className="text-4xl font-bold text-white">
                                ${annualW3Cost.toLocaleString()}
                                <span className="text-sm font-normal text-[--text-secondary] block mt-1">per year</span>
                            </div>
                        </div>
                    </div>

                    {/* Savings Badge */}
                    <motion.div
                        key={savings}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mt-12 inline-block bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg shadow-emerald-500/20"
                    >
                        {`You Save: $${savings.toLocaleString()} / year`}
                    </motion.div >

                </div >
            </div >
        </DemoPageTemplate >
    );
}
