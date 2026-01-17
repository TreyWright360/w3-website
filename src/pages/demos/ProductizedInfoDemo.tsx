import { useState } from 'react';
import { motion } from 'framer-motion';
import { DemoPageTemplate } from '../../components/demos/DemoPageTemplate';
import { BookOpen, TableProperties, Download } from 'lucide-react';

export function ProductizedInfoDemo() {
    const [reportValue, setReportValue] = useState(2500);
    const salesVolume = 10;

    const manualRevenue = salesVolume * reportValue;
    const productizedRevenue = salesVolume * reportValue * 10; // Scaling effect

    return (
        <DemoPageTemplate
            title="Stop Selling Your Time. Sell Your Brain."
            subtitle="Consultants hit a revenue ceiling because they sell hours. Turn your expertise into an AI Product that sells while you sleep."
            heroCta="Productize Yourself"
            onCtaClick={() => document.getElementById('demo-interactive')?.scrollIntoView({ behavior: 'smooth' })}
            comparisonTable={{
                headers: ['Feature', 'Consulting (Selling Time)', 'W3 Data Product (Selling Asset)'],
                rows: [
                    { feature: 'Delivery', oldWay: 'Manual Report (Weeks)', newWay: 'Instant Dashboard (Seconds)' },
                    { feature: 'Margin', oldWay: 'Linear (More rev = More work)', newWay: 'Exponential (Zero marginal cost)' },
                    { feature: 'Update Frequency', oldWay: 'Quarterly Check-ins', newWay: 'Live Data Streams' },
                    { feature: 'Valuation', oldWay: '1x Revenue (Service Biz)', newWay: '10x Revenue (SaaS Biz)' },
                    { feature: 'Client Experience', oldWay: 'Waiting for you', newWay: 'Self-Serve 24/7' },
                ]
            }}
        >
            <div id="demo-interactive" className="max-w-4xl mx-auto text-center px-4">
                <h3 className="text-3xl font-bold mb-12">The "Service Trap" Escape</h3>

                <div className="bg-[--bg-tertiary] border border-[--border-primary] rounded-3xl p-8 shadow-2xl overflow-hidden relative">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 text-left">
                        <div>
                            <label className="block text-sm font-medium mb-4 text-[--text-secondary]">
                                Report/Audit Price ($): <span className="text-[--primary] font-bold text-xl ml-2">${reportValue}</span>
                            </label>
                            <input
                                type="range"
                                min="500"
                                max="5000"
                                step="100"
                                value={reportValue}
                                onChange={(e) => setReportValue(Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[--primary]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-4 text-[--text-secondary]">
                                Monthly Sales Limit (Humanly Possible):
                            </label>
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold text-gray-400">{salesVolume}</span>
                                <span className="text-xs text-red-400">(Capped by your time)</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        {/* Service Business Model */}
                        <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6 opacity-60">
                            <h4 className="flex items-center gap-2 font-bold mb-4 text-gray-400">
                                <BookOpen className="w-5 h-5" /> Current Model (Service)
                            </h4>
                            <div className="space-y-2 text-sm text-[--text-secondary] mb-6">
                                <p>10 Clients x 10 Hours each = 100 Hours</p>
                                <p className="text-red-400">Result: Burnout</p>
                            </div>
                            <div className="text-2xl font-bold text-gray-300">
                                ${manualRevenue.toLocaleString()} / mo
                            </div>
                        </div>

                        {/* Product Business Model */}
                        <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500 rounded-2xl p-6 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors"></div>
                            <h4 className="flex items-center gap-2 font-bold mb-4 text-white relative z-10">
                                <TableProperties className="w-5 h-5 text-indigo-400" /> New Model (Product)
                            </h4>
                            <div className="space-y-2 text-sm text-[--text-secondary] mb-6 relative z-10">
                                <p>100 Clients x 0 Hours each = 0 Hours</p>
                                <p className="text-green-400">Result: Freedom</p>
                            </div>
                            <motion.div
                                key={productizedRevenue}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="text-3xl font-bold text-white relative z-10"
                            >
                                ${(productizedRevenue).toLocaleString()} / mo
                                <span className="block text-xs text-indigo-300 font-normal mt-1">
                                    (Assuming 10x scale with no time cost)
                                </span>
                            </motion.div>
                        </div>
                    </div>

                    <div className="mt-12 flex justify-center">
                        <button className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-gray-200 transition-colors shadow-lg shadow-white/20">
                            <Download className="w-5 h-5" /> Download Product Strategy
                        </button>
                    </div>

                </div>
            </div>
        </DemoPageTemplate>
    );
}
