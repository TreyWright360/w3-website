import { useState } from 'react';
import { motion } from 'framer-motion';
import { DemoPageTemplate } from '../../components/demos/DemoPageTemplate';
import { Clock, Zap, Play, Pause } from 'lucide-react';

export function MassOutreachDemo() {
    const [activeSimulator, setActiveSimulator] = useState<'standard' | 'neural' | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = (type: 'standard' | 'neural') => {
        if (activeSimulator === type && isPlaying) {
            setIsPlaying(false);
            setActiveSimulator(null);
            return;
        }
        setActiveSimulator(type);
        setIsPlaying(true);
        // In a real app, we would play audio here
        setTimeout(() => {
            setIsPlaying(false);
            setActiveSimulator(null);
        }, 4000);
    };

    return (
        <DemoPageTemplate
            title="Is Your AI Agent Scaring Customers Away?"
            subtitle="Legacy Voice AI has a 2-second delay. That's why they hang up. Our Sub-500ms Neural Voice Agent feels human."
            heroCta="Hear the Difference"
            onCtaClick={() => document.getElementById('demo-interactive')?.scrollIntoView({ behavior: 'smooth' })}
            comparisonTable={{
                headers: ['Feature', 'Competitor (The "Robotic" Agent)', 'W3 Neural Voice'],
                rows: [
                    { feature: 'Latency', oldWay: '1000ms - 2000ms (Awkward)', newWay: '< 500ms (Human-Like)' },
                    { feature: 'Cost', oldWay: '$0.20 - $0.35 / min', newWay: 'Significantly Lower (Wholesale)' },
                    { feature: 'Interruptions', oldWay: 'Continues talking over you', newWay: 'Instant "Listening" Adaptation' },
                    { feature: 'Emotion', oldWay: 'Monotone / Flat', newWay: 'Dynamic Emotional Range' },
                    { feature: 'Scale', oldWay: 'Crashes at 100+ calls', newWay: 'Unlimited Concurrency' },
                ]
            }}
        >
            <div id="demo-interactive" className="max-w-4xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-8">Latency Simulator</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Standard AI Simulator */}
                    <div className={`p-8 rounded-2xl border transition-all duration-300 ${activeSimulator === 'standard' ? 'bg-red-500/10 border-red-500' : 'bg-[--bg-tertiary] border-[--border-primary]'}`}>
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                                <Clock className="w-8 h-8 text-red-400" />
                            </div>
                        </div>
                        <h4 className="text-xl font-bold mb-2">Standard AI</h4>
                        <p className="text-[--text-secondary] mb-6">1.5s Latency (The "Awkward Pause")</p>

                        <button
                            onClick={() => handlePlay('standard')}
                            className="w-full py-3 rounded-xl bg-[--bg-secondary] border border-[--border-primary] hover:bg-red-500/20 hover:border-red-500/50 transition-all font-bold flex items-center justify-center gap-2"
                        >
                            {activeSimulator === 'standard' && isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                            {activeSimulator === 'standard' && isPlaying ? 'Playing...' : 'Test Lag'}
                        </button>

                        {activeSimulator === 'standard' && isPlaying && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-6 text-sm text-red-300 bg-red-950/30 p-3 rounded-lg"
                            >
                                Thinking... (Buffering)... "Hello?"
                            </motion.div>
                        )}
                    </div>

                    {/* Neural AI Simulator */}
                    <div className={`p-8 rounded-2xl border transition-all duration-300 ${activeSimulator === 'neural' ? 'bg-green-500/10 border-green-500' : 'bg-[--bg-tertiary] border-[--border-primary]'}`}>
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                                <Zap className="w-8 h-8 text-green-400" />
                            </div>
                        </div>
                        <h4 className="text-xl font-bold mb-2">W3 Neural</h4>
                        <p className="text-[--text-secondary] mb-6">400ms Latency (Human Speed)</p>

                        <button
                            onClick={() => handlePlay('neural')}
                            className="w-full py-3 rounded-xl bg-[--primary] text-white hover:bg-[--primary-dark] transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-[--primary]/25"
                        >
                            {activeSimulator === 'neural' && isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                            {activeSimulator === 'neural' && isPlaying ? 'Playing...' : 'Test Speed'}
                        </button>

                        {activeSimulator === 'neural' && isPlaying && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-6 text-sm text-green-300 bg-green-950/30 p-3 rounded-lg flex items-center justify-center gap-2"
                            >
                                <Zap className="w-4 h-4" /> Instant Response
                            </motion.div>
                        )}
                    </div>
                </div>

                <p className="mt-12 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                    Result: "You just saved 30% of your leads."
                </p>
            </div>
        </DemoPageTemplate>
    );
}
