import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DemoPageTemplate } from '../../components/demos/DemoPageTemplate';
import { Video, Youtube, Twitter, Linkedin, Scissors, Sparkles, Check } from 'lucide-react';

export function ContentRepurposingDemo() {
    const [videoUrl, setVideoUrl] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const processVideo = () => {
        if (!videoUrl) return;
        setIsProcessing(true);
        setShowResult(false);

        setTimeout(() => {
            setIsProcessing(false);
            setShowResult(true);
        }, 2500);
    };

    return (
        <DemoPageTemplate
            title="One Video. Everywhere. Instantly."
            subtitle="Stop paying editors $50/hour to chop up clips. Our AI finds the viral moments, adds captions, and posts to TikTok, Reels, and Shorts automatically."
            heroCta="Repurpose a Video"
            onCtaClick={() => document.getElementById('demo-interactive')?.scrollIntoView({ behavior: 'smooth' })}
            comparisonTable={{
                headers: ['Feature', 'Human Editor / OpusClip', 'W3 Content Agent'],
                rows: [
                    { feature: 'Clipping Logic', oldWay: 'Random "Keywords" (Hit or Miss)', newWay: 'Context-Aware Viral Score' },
                    { feature: 'Speed', oldWay: '24 - 48 Hours', newWay: '3 Minutes' },
                    { feature: 'Distribution', oldWay: 'Manual Uploading', newWay: 'Auto-Post to All Platforms' },
                    { feature: 'Captions', oldWay: 'Generic Templates', newWay: 'Brand-Matched Styles' },
                    { feature: 'Cost', oldWay: '$20/video or $500/mo', newWay: 'Flat Monthly Rate' },
                ]
            }}
        >
            <div id="demo-interactive" className="max-w-4xl mx-auto text-center px-4">
                <h3 className="text-3xl font-bold mb-12">The Content Factory</h3>

                <div className="bg-[--bg-tertiary] border border-[--border-primary] rounded-3xl p-8 shadow-2xl relative overflow-hidden">

                    <div className="flex gap-4 mb-16 relative z-10 max-w-2xl mx-auto">
                        <div className="relative flex-1">
                            <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Paste YouTube URL..."
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                className="w-full bg-[--bg-secondary] border border-[--border-primary] rounded-xl pl-12 pr-4 py-4 text-[--text-primary] focus:ring-2 focus:ring-[--primary] outline-none"
                            />
                        </div>
                        <button
                            onClick={processVideo}
                            disabled={isProcessing}
                            className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {isProcessing ? (
                                <>Processing...</>
                            ) : (
                                <>
                                    <Scissors className="w-5 h-5" /> Clip It
                                </>
                            )}
                        </button>
                    </div>

                    {/* Processing Animation */}
                    {isProcessing && (
                        <div className="mb-12">
                            <div className="flex justify-center gap-2 mb-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: [20, 60, 20] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                                        className="w-4 bg-[--primary]/50 rounded-full"
                                    />
                                ))}
                            </div>
                            <p className="text-[--primary] animate-pulse">Analyzing Transcript & Viral Potential...</p>
                        </div>
                    )}

                    {/* Results Grid */}
                    {showResult && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { platform: 'TikTok', icon: <Video className="w-5 h-5" />, score: 98, title: "The 'Aha' Moment..." },
                                { platform: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, score: 92, title: "Why this strategy works" },
                                { platform: 'Twitter', icon: <Twitter className="w-5 h-5" />, score: 88, title: "Thread: Key Takeaways" },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.2 }}
                                    className="bg-[--bg-secondary] border border-[--border-primary] rounded-xl p-6 text-left hover:border-[--primary] transition-colors group"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="bg-white/10 p-2 rounded-lg">{item.icon}</span>
                                        <span className="text-green-400 font-bold text-sm bg-green-500/10 px-2 py-1 rounded">Viral Score: {item.score}</span>
                                    </div>
                                    <div className="w-full aspect-[9/16] bg-black/40 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                                            <p className="text-white font-bold text-sm">{item.title}</p>
                                            <div className="flex gap-1 mt-2">
                                                <div className="h-1 bg-white/20 flex-1 rounded-full"></div>
                                                <div className="h-1 bg-white flex-1 rounded-full"></div>
                                                <div className="h-1 bg-white/20 flex-1 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full py-2 bg-[--primary]/10 text-[--primary] rounded-lg font-bold text-sm hover:bg-[--primary] hover:text-white transition-colors flex items-center justify-center gap-2">
                                        <Sparkles className="w-4 h-4" /> Auto-Post
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {showResult && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-8 flex items-center justify-center gap-2 text-green-400 bg-green-500/10 py-3 rounded-lg border border-green-500/20"
                        >
                            <Check className="w-5 h-5" /> All assets generated in 3.2 seconds.
                        </motion.div>
                    )}

                </div>
            </div>
        </DemoPageTemplate>
    );
}
