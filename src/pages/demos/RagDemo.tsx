import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DemoPageTemplate } from '../../components/demos/DemoPageTemplate';
import { Search, Database, FileText, Brain, Lock, Loader2 } from 'lucide-react';

export function RagDemo() {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const handleSearch = () => {
        if (!query) return;
        setIsSearching(true);
        setShowResult(false);

        setTimeout(() => {
            setIsSearching(false);
            setShowResult(true);
        }, 1500);
    };

    return (
        <DemoPageTemplate
            title="Stop Playing 'Hide and Seek' with Your Data."
            subtitle="Employees waste 25% of their week searching for information. Standard keyword search fails. You need Semantic Neural Retrieval."
            heroCta="Search Your Enterprise Data"
            onCtaClick={() => document.getElementById('demo-interactive')?.scrollIntoView({ behavior: 'smooth' })}
            comparisonTable={{
                headers: ['Feature', 'Standard Keyword Search (SharePoint)', 'W3 Neural RAG'],
                rows: [
                    { feature: 'Understanding', oldWay: 'Exact Keywords Only', newWay: 'Full Semantic Meaning' },
                    { feature: 'Sources', oldWay: 'Siloed (Drive OR Slack)', newWay: 'Unified (Drive + Slack + CRM)' },
                    { feature: 'Answer Format', oldWay: 'List of Links (Read it yourself)', newWay: 'Direct Answer (Synthesized)' },
                    { feature: 'Security', oldWay: 'Access Permissions Nightmare', newWay: 'Role-Based Access Control' },
                    { feature: 'Cost', oldWay: '$50k+ Enterprise License', newWay: 'Pay Per Usage' },
                ]
            }}
        >
            <div id="demo-interactive" className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold mb-8 text-center">Neural Search Simulator</h3>

                <div className="bg-[--bg-tertiary] border border-[--border-primary] rounded-2xl p-6 md:p-10 shadow-xl">
                    <div className="relative mb-8">
                        <input
                            type="text"
                            placeholder="e.g. 'What was the Q4 revenue for Project Apollo?'"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full bg-[--bg-primary] border border-[--border-primary] rounded-xl pl-12 pr-4 py-4 text-lg focus:ring-2 focus:ring-cyan-400 outline-none shadow-inner"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                        <button
                            onClick={handleSearch}
                            disabled={isSearching}
                            className="absolute right-2 top-2 bottom-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 rounded-lg font-bold transition-colors disabled:opacity-50"
                        >
                            {isSearching ? <Loader2 className="animate-spin w-5 h-5" /> : 'Ask AI'}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative min-h-[300px]">
                        {/* Visualizing Data Silos */}
                        <div className="md:col-span-2 flex justify-center gap-4 mb-4 opacity-50">
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-3 bg-blue-500/10 rounded-lg"><FileText className="w-5 h-5 text-blue-400" /></div>
                                <span className="text-xs">Drive</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-3 bg-purple-500/10 rounded-lg"><Database className="w-5 h-5 text-purple-400" /></div>
                                <span className="text-xs">Notion</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-3 bg-green-500/10 rounded-lg"><Lock className="w-5 h-5 text-green-400" /></div>
                                <span className="text-xs">Secure CRM</span>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {!showResult && !isSearching && (
                                <div className="md:col-span-2 flex flex-col items-center justify-center text-[--text-secondary] pt-12">
                                    <Brain className="w-16 h-16 mb-4 opacity-20" />
                                    <p>Ask a question to search across all company knowledge bases instantly.</p>
                                </div>
                            )}

                            {isSearching && (
                                <div className="md:col-span-2 flex flex-col items-center justify-center text-cyan-400 pt-12">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Brain className="w-16 h-16 mb-4" />
                                    </motion.div>
                                    <p className="animate-pulse">Synthesizing answer from 14,000 documents...</p>
                                </div>
                            )}

                            {showResult && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="md:col-span-2 space-y-6"
                                >
                                    <div className="bg-[--bg-secondary] border border-cyan-500/30 rounded-xl p-6 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                                        <h4 className="flex items-center gap-2 text-cyan-400 font-bold mb-3">
                                            <Brain className="w-5 h-5" /> AI Answer
                                        </h4>
                                        <p className="text-lg leading-relaxed text-[--text-primary]">
                                            Based on the financial reports in <span className="text-blue-400 font-bold">Google Drive</span> and the closing summaries in <span className="text-green-400 font-bold">Salesforce</span>, the Q4 revenue for Project Apollo was <span className="text-white font-bold">$1.2M</span>, which is a <span className="text-green-400">15% increase</span> YoY.
                                        </p>
                                        <p className="mt-4 text-sm text-[--text-secondary] border-t border-[--border-primary] pt-3">
                                            <strong>Citations:</strong> Q4_Report.pdf (p.12), Slack_Message_CFO (Dec 12), Salesforce_Opp_8829
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </DemoPageTemplate>
    );
}
