import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DemoPageTemplate } from '../../components/demos/DemoPageTemplate';
import { Mail, Search, Check, X, ShieldAlert, Sparkles, Send } from 'lucide-react';

export function PersonalizedOutreachDemo() {
    const [domain, setDomain] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const startScan = () => {
        if (!domain) return;
        setIsScanning(true);
        setShowResult(false);

        setTimeout(() => {
            setIsScanning(false);
            setShowResult(true);
        }, 2500);
    };

    return (
        <DemoPageTemplate
            title="Stop Sending 'Hey {FirstName}' Spam."
            subtitle="Competitors send 1,000 generic emails to get 1 reply. W3 monitors 'Signals' (hiring, funding, news) to send the right message at the right time."
            heroCta="See The Signal Engine"
            onCtaClick={() => document.getElementById('demo-interactive')?.scrollIntoView({ behavior: 'smooth' })}
            comparisonTable={{
                headers: ['Feature', 'Generic Cold Email', 'W3 Signal-Based Outreach'],
                rows: [
                    { feature: 'Trigger', oldWay: 'Random "Spray & Pray"', newWay: 'Specific "Buying Signal"' },
                    { feature: 'Subject Line', oldWay: 'Quick Question?', newWay: 'Idea for [News Event]' },
                    { feature: 'Deliverability', oldWay: 'Spam Folder Risk (>0.3%)', newWay: 'Primary Inbox (Relevance)' },
                    { feature: 'Research', oldWay: 'None / LinkedIn Bio', newWay: 'Deep Web & News Analysis' },
                    { feature: 'Volume', oldWay: 'High Volume, Low Trust', newWay: 'Low Volume, High Trust' },
                ]
            }}
        >
            <div id="demo-interactive" className="max-w-3xl mx-auto text-center">
                <h3 className="text-3xl font-bold mb-8">The Spam Filter Test</h3>
                <p className="text-[--text-secondary] mb-12">
                    Enter a prospect's domain. We'll simulate how a "Traditional" vs "Signal-Based" email lands in their inbox.
                </p>

                <div className="flex gap-4 mb-16 relative z-10">
                    <input
                        type="text"
                        placeholder="company.com"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="flex-1 bg-[--bg-tertiary] border border-[--border-primary] rounded-xl px-4 py-3 text-[--text-primary] focus:outline-none focus:ring-2 focus:ring-[--primary]"
                    />
                    <button
                        onClick={startScan}
                        disabled={isScanning}
                        className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {isScanning ? (
                            'Scanning Signals...'
                        ) : (
                            <>
                                <Search className="w-5 h-5" /> Test Deliverability
                            </>
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    {/* Traditional Email */}
                    <div className={`border rounded-2xl p-6 transition-all duration-500 ${showResult ? 'opacity-50 blur-[2px]' : 'bg-[--bg-secondary] border-[--border-primary]'}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-red-500/10 rounded-lg">
                                <ShieldAlert className="w-5 h-5 text-red-400" />
                            </div>
                            <h4 className="font-bold">Traditional Outreach</h4>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 mb-4 text-sm font-mono text-gray-400">
                            Subject: Quick question?<br />
                            Body: Hey team, I saw you exist...
                        </div>
                        {showResult && (
                            <div className="text-red-400 font-bold flex items-center gap-2">
                                <X className="w-5 h-5" /> Detected as Spam
                            </div>
                        )}
                    </div>

                    {/* Signal-Based Email */}
                    <div className={`border rounded-2xl p-6 transition-all duration-500 ${showResult ? 'bg-green-500/10 border-green-500 scale-105 shadow-2xl shadow-green-500/20' : 'bg-[--bg-secondary] border-[--border-primary]'}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-500/10 rounded-lg">
                                <Sparkles className="w-5 h-5 text-green-400" />
                            </div>
                            <h4 className="font-bold text-white">W3 Signal-Based</h4>
                        </div>
                        {showResult ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white/10 rounded-lg p-4 mb-4 text-sm font-mono text-white"
                            >
                                Subject: Congrats on the Series B!<br />
                                Body: Saw the TechCrunch news...
                            </motion.div>
                        ) : (
                            <div className="bg-white/5 rounded-lg p-4 mb-4 text-sm font-mono text-gray-500">
                                (Waiting for Signal Analysis...)
                            </div>
                        )}

                        {showResult && (
                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-green-400 font-bold flex items-center gap-2"
                            >
                                <Check className="w-5 h-5" /> Delivered to Primary Inbox
                            </motion.div>
                        )}
                    </div>
                </div>

            </div>
        </DemoPageTemplate>
    );
}
