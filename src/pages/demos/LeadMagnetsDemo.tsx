import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DemoPageTemplate } from '../../components/demos/DemoPageTemplate';
import { Loader2, Sparkles, FileText, ArrowRight } from 'lucide-react';

export function LeadMagnetsDemo() {
    const [url, setUrl] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const handleAnalyze = () => {
        if (!url) return;
        setIsAnalyzing(true);
        setShowResult(false);

        // Simulate AI delay
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowResult(true);
        }, 2000);
    };

    return (
        <DemoPageTemplate
            title="Stop Burning 95% of Your Traffic"
            subtitle="Static PDFs convert at 5%. Intelligent, AI-Powered Lead Magnets convert at 40%. See the difference."
            heroCta="Try the Live Demo"
            onCtaClick={() => document.getElementById('demo-interactive')?.scrollIntoView({ behavior: 'smooth' })}
            comparisonTable={{
                headers: ['Feature', 'Static PDF (The Old Way)', 'W3 AI Magnet (The New Way)'],
                rows: [
                    { feature: 'Engagement', oldWay: 'Passive Reading (Boring)', newWay: 'Interactive & Instant' },
                    { feature: 'Personalization', oldWay: 'One-Size-Fits-All', newWay: '100% Tailored to User' },
                    { feature: 'Data Collected', oldWay: 'Email Only', newWay: 'Pain Points, Revenue, Goals' },
                    { feature: 'Follow-Up', oldWay: 'Generic Drip Sequence', newWay: 'AI-Agent Call (Immediate)' },
                    { feature: 'Conversion Rate', oldWay: '2-5%', newWay: '25-40%' },
                ]
            }}
        >
            <div id="demo-interactive" className="max-w-2xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-6">See It In Action</h3>
                <p className="text-[--text-secondary] mb-8">
                    Enter any website URL below. Our AI will simulate generating a custom "Improvement Report" instantly.
                </p>

                <div className="flex gap-4 mb-12">
                    <input
                        type="text"
                        placeholder="www.yourbusiness.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="flex-1 bg-[--bg-tertiary] border border-[--border-primary] rounded-xl px-4 py-3 text-[--text-primary] focus:outline-none focus:ring-2 focus:ring-[--primary]"
                    />
                    <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 text-purple-600" />}
                        {isAnalyzing ? 'Scanning...' : 'Generate Report'}
                    </button>
                </div>

                <AnimatePresence>
                    {showResult && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-[--bg-tertiary] rounded-xl p-6 text-left border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <FileText className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white">Custom Growth Report: {url}</h4>
                                    <p className="text-sm text-green-400">Generated in 1.4 seconds</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '85%' }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                        className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                                    />
                                </div>
                                <div className="flex justify-between text-sm text-[--text-secondary]">
                                    <span>Optimization Score</span>
                                    <span className="text-white font-bold">85/100</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-[--bg-secondary] p-4 rounded-lg border border-[--border-primary]">
                                    <h5 className="font-bold mb-2 text-red-400">Current Leakage</h5>
                                    <p className="text-sm text-[--text-secondary]">$12,500 / month estimated lost revenue due to static forms.</p>
                                </div>
                                <div className="bg-[--bg-secondary] p-4 rounded-lg border border-[--border-primary]">
                                    <h5 className="font-bold mb-2 text-green-400">AI Opportunity</h5>
                                    <p className="text-sm text-[--text-secondary]">Capture 312 more leads with an interactive calculator.</p>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-[--border-primary] flex justify-end">
                                <button className="text-[--primary] font-bold text-sm flex items-center gap-2 hover:translate-x-1 transition-transform">
                                    View Full Report <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DemoPageTemplate>
    );
}
