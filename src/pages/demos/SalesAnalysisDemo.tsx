import { useState } from 'react';
import { motion } from 'framer-motion';
import { DemoPageTemplate } from '../../components/demos/DemoPageTemplate';
import { Phone, BarChart3, AlertTriangle, CheckCircle, Search, TrendingUp } from 'lucide-react';

export function SalesAnalysisDemo() {
    const [analyzing, setAnalyzing] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const startAnalysis = () => {
        setAnalyzing(true);
        setShowResult(false);

        setTimeout(() => {
            setAnalyzing(false);
            setShowResult(true);
        }, 2000);
    };

    return (
        <DemoPageTemplate
            title="Fire Your Sales Manager. Hire AI."
            subtitle="Your sales manager can listen to 5 calls a week. Our AI listens to 5,000. It spots objection patterns, script adherence, and closing signals instantly."
            heroCta="Analyze My Calls"
            onCtaClick={() => document.getElementById('demo-interactive')?.scrollIntoView({ behavior: 'smooth' })}
            comparisonTable={{
                headers: ['Feature', 'Human Sales Manager', 'W3 Sales Intelligence'],
                rows: [
                    { feature: 'Coverage', oldWay: '< 1% of Calls', newWay: '100% of Calls' },
                    { feature: 'Feedback', oldWay: 'Weekly 1:1s (Subjective)', newWay: 'Instant Post-Call (Objective)' },
                    { feature: 'Training', oldWay: 'Generic "Sales Training"', newWay: 'Personalized Micro-Coaching' },
                    { feature: 'CRM Sync', oldWay: 'Manual Data Entry', newWay: 'Auto-Populate Fields' },
                    { feature: 'Cost', oldWay: '$120k / year', newWay: 'Usage Based' },
                ]
            }}
        >
            <div id="demo-interactive" className="max-w-4xl mx-auto text-center px-4">
                <h3 className="text-3xl font-bold mb-12">The "Black Box" Opener</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* The Problem: Black Box */}
                    <div className="bg-[--bg-tertiary] border border-[--border-primary] rounded-2xl p-8 opacity-50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="text-center">
                                <Phone className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                                <h4 className="text-2xl font-bold text-gray-400">Your Sales Calls</h4>
                                <p className="text-sm text-gray-500">Unheard. Unanalyzed. Lost.</p>
                            </div>
                        </div>
                    </div>

                    {/* The Solution: AI Analysis */}
                    <div className="bg-[--bg-tertiary] border border-[--border-primary] rounded-2xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
                        {!showResult && !analyzing && (
                            <button
                                onClick={startAnalysis}
                                className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-gray-200 transition-colors shadow-lg shadow-white/20"
                            >
                                <Search className="w-5 h-5" /> Analyze Last Call
                            </button>
                        )}

                        {analyzing && (
                            <div className="text-center space-y-4">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <BarChart3 className="w-16 h-16 text-[--primary] mx-auto" />
                                </motion.div>
                                <div className="space-y-1 text-sm font-mono text-[--primary]">
                                    <p>Transcribing Audio...</p>
                                    <p>Detecting Objections...</p>
                                    <p>Scoring Sentiment...</p>
                                </div>
                            </div>
                        )}

                        {showResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full text-left"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="text-xl font-bold text-white">Call Score: 82/100</h4>
                                    <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20">CLOSED WON</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                                        <h5 className="flex items-center gap-2 font-bold text-red-400 text-sm mb-1">
                                            <AlertTriangle className="w-4 h-4" /> Missed Objection
                                        </h5>
                                        <p className="text-xs text-gray-400">Prospect mentioned "Budget concern" at 12:30. You did not address ROI calculation.</p>
                                    </div>

                                    <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                                        <h5 className="flex items-center gap-2 font-bold text-green-400 text-sm mb-1">
                                            <CheckCircle className="w-4 h-4" /> Winning Moment
                                        </h5>
                                        <p className="text-xs text-gray-400">Excellent "Social Proof" usage at 15:45. Sentiment spiked +40%.</p>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-[--border-primary] text-center">
                                    <p className="text-xs text-[--text-secondary] mb-2">Automated Coaching actions sent to Rep.</p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {showResult && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 inline-block bg-gradient-to-r from-[--primary] to-blue-600 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg shadow-blue-500/20"
                    >
                        <TrendingUp className="w-6 h-6 inline-block mr-2" />
                        Revenue Impact: +30% Close Rate
                    </motion.div>
                )}

            </div>
        </DemoPageTemplate>
    );
}
