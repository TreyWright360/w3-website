import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DemoPageTemplate } from '../../components/demos/DemoPageTemplate';
import { FileText, UserPlus, Clock, Check, X, Shield, Sparkles } from 'lucide-react';

export function RecruitmentDemo() {
    const [file, setFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const handleUpload = () => {
        // Simulate upload
        setIsAnalyzing(true);
        setShowResult(false);

        setTimeout(() => {
            setIsAnalyzing(false);
            setShowResult(true);
        }, 2000);
    };

    return (
        <DemoPageTemplate
            title="Stop Ghosting Your Best Candidates."
            subtitle="The average time-to-hire is 30+ days. Top talent is gone in 3. Our AI interviews candidates instantly, 24/7."
            heroCta="Test The Interviewer"
            onCtaClick={() => document.getElementById('demo-interactive')?.scrollIntoView({ behavior: 'smooth' })}
            comparisonTable={{
                headers: ['Feature', 'Greenhouse / Ashby', 'W3 Recruiter Agent'],
                rows: [
                    { feature: 'Response Time', oldWay: '3 - 5 Days', newWay: 'Instant (0s)' },
                    { feature: 'Screening', oldWay: 'Manual Resume Scan', newWay: 'Live Voice/Chat Interview' },
                    { feature: 'Scheduling', oldWay: 'Email Ping Pong', newWay: 'Instant Booking' },
                    { feature: 'Bias', oldWay: 'Unconscious Human Bias', newWay: 'Objective Scoring' },
                    { feature: 'Capacity', oldWay: 'Limited by HR Team', newWay: 'Unlimited' },
                ]
            }}
        >
            <div id="demo-interactive" className="max-w-4xl mx-auto text-center px-4">
                <h3 className="text-3xl font-bold mb-12">The "Resume Black Hole" Breaker</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* The Black Hole (Traditional) */}
                    <div className="bg-[--bg-tertiary] border border-[--border-primary] rounded-2xl p-8 relative overflow-hidden flex flex-col items-center justify-center opacity-70">
                        <div className="w-24 h-24 mb-6 rounded-full bg-black flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                            <FileText className="w-8 h-8 text-gray-600" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-400 mb-2">The ATS "Black Hole"</h4>
                        <p className="text-sm text-gray-500 mb-6">Status: Unread for 14 days.</p>
                        <div className="px-3 py-1 bg-red-500/10 text-red-500 text-xs font-bold rounded-full">Candidate Lost to Competitor</div>
                    </div>

                    {/* The Solution (AI Instant) */}
                    <div className="bg-[--bg-tertiary] border border-[--border-primary] rounded-2xl p-8 relative overflow-hidden flex flex-col items-center justify-start min-h-[350px]">

                        {!isAnalyzing && !showResult && (
                            <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl p-8 hover:border-[--primary] transition-colors cursor-pointer" onClick={handleUpload}>
                                <UserPlus className="w-12 h-12 text-gray-400 mb-4" />
                                <p className="font-bold">Drop Resume Here</p>
                                <p className="text-xs text-gray-500 mt-2">Simulate an application</p>
                            </div>
                        )}

                        {isAnalyzing && (
                            <div className="w-full h-full flex flex-col items-center justify-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                    className="w-16 h-16 border-4 border-[--primary] border-t-transparent rounded-full mb-6"
                                />
                                <div className="space-y-2 text-sm text-[--primary] font-mono">
                                    <p>Scanning Skills...</p>
                                    <p>Matching Job Description...</p>
                                    <p>Initiating Interview...</p>
                                </div>
                            </div>
                        )}

                        {showResult && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full text-left"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h4 className="text-xl font-bold text-white flex items-center gap-2">
                                            <Sparkles className="w-5 h-5 text-yellow-400" /> Top Candidate Found
                                        </h4>
                                        <p className="text-sm text-gray-400">Match Score: 94%</p>
                                    </div>
                                    <div className="bg-green-500/10 p-2 rounded-full">
                                        <Check className="w-6 h-6 text-green-400" />
                                    </div>
                                </div>

                                <div className="bg-[--bg-secondary] rounded-xl p-4 mb-4 border border-[--border-primary]">
                                    <p className="text-xs font-bold text-gray-500 mb-2 uppercase">AI Interview Log</p>
                                    <div className="text-sm space-y-2">
                                        <p><span className="text-[--primary]">AI:</span> "Can you explain your experience with React hooks?"</p>
                                        <p><span className="text-white">Candidate:</span> "Yes, I used custom hooks to manage..."</p>
                                    </div>
                                </div>

                                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-center gap-4">
                                    <Clock className="w-8 h-8 text-blue-400" />
                                    <div>
                                        <p className="font-bold text-blue-400">Interview Booked</p>
                                        <p className="text-xs text-blue-300/70">Tomorrow at 10:00 AM </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {showResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 inline-block"
                    >
                        <strong>Time to Interview:</strong> 2 minutes (vs 5 days)
                    </motion.div>
                )}
            </div>
        </DemoPageTemplate>
    );
}
