import { motion } from 'framer-motion';
import { Play, Phone, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

interface IndustryPageTemplateProps {
    title: string;
    subtitle: string;
    heroImage?: string;
    painPoints: {
        title: string;
        description: string;
        stat: string; // e.g., "43% Missed Calls"
    }[];
    solutionFeatures: {
        icon: React.ElementType;
        title: string;
        description: string;
    }[];
    demoConfig: {
        audioSrc?: string; // Path to voice sample
        videoSrc?: string; // Path to video
        agentName: string;
    };
    roiStats: {
        value: string;
        label: string;
    }[];
}

export function IndustryPageTemplate({
    title,
    subtitle,
    heroImage,
    painPoints,
    solutionFeatures,
    demoConfig,
    roiStats
}: IndustryPageTemplateProps) {
    return (
        <div className="min-h-screen bg-[#050510] text-[#E0E0E0] selection:bg-amber-500/30">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,_rgba(251,191,36,0.1),_transparent_70%)]" />

                <Container className="relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
                                <Star className="w-4 h-4 fill-amber-400" /> Industry Authorized Solution
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                                {title}
                            </h1>
                            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                                {subtitle}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg shadow-amber-500/25">
                                    Hear the Demo <Play className="w-5 h-5 ml-2 fill-current" />
                                </Button>
                                <Button size="lg" variant="outline" className="border-gray-700 hover:bg-gray-800">
                                    View ROI Data
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            {/* Abstract Graphic or Hero Image */}
                            <div className="aspect-square rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-2 overflow-hidden shadow-2xl relative">
                                {heroImage ? (
                                    <img src={heroImage} alt={title} className="w-full h-full object-cover rounded-2xl opacity-80" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-900/50">
                                        <div className="text-center p-8">
                                            <div className="w-24 h-24 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                                                <Phone className="w-10 h-10 text-amber-400" />
                                            </div>
                                            <p className="text-gray-500 font-mono text-sm">AI Agent Active</p>
                                        </div>
                                    </div>
                                )}

                                {/* Floating Stat Card */}
                                <motion.div
                                    className="absolute -bottom-6 -left-6 bg-gray-900 border border-amber-500/30 p-6 rounded-xl shadow-xl shadow-amber-900/20 max-w-xs"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1 }}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Live Activity</span>
                                    </div>
                                    <p className="text-sm text-gray-300">
                                        Agent {demoConfig.agentName} just recovered a missed call from <span className="text-white font-bold">(555) ***-9201</span>
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Pain Points (The "Bleeding Neck") */}
            <section className="py-20 bg-black/50 border-t border-gray-900">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why traditional methods are failing</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">The industry standard is broken. Here is the cost of doing nothing.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {painPoints.map((point, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-[#0A0A15] border border-gray-800 p-8 rounded-2xl hover:border-red-900/50 transition-colors group"
                            >
                                <div className="text-4xl font-bold text-red-500 mb-4 font-mono">{point.stat}</div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">{point.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">{point.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Solution Features */}
            <section className="py-20">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-8">The W3 Solution</h2>
                            <div className="space-y-8">
                                {solutionFeatures.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="flex gap-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                                            <feature.icon className="w-6 h-6 text-amber-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                                            <p className="text-gray-400">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-gray-800">
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-white">Live Voice Demo</h3>
                                <p className="text-gray-400 text-sm">Listen to {demoConfig.agentName} handle a real scenario</p>
                            </div>

                            {/* Audio Player Placeholder */}
                            <div className="bg-[#050510] rounded-xl p-6 border border-gray-800 flex items-center gap-4 mb-6">
                                <button className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center hover:bg-amber-600 transition-colors">
                                    <Play className="w-5 h-5 text-black fill-current ml-1" />
                                </button>
                                <div className="flex-1">
                                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full w-1/3 bg-amber-500" />
                                    </div>
                                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                                        <span>0:12</span>
                                        <span>1:45</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-900/10 border border-green-900/30 rounded-lg p-4 text-center">
                                <p className="text-green-400 font-mono text-sm">"The reservation was booked in 45 seconds."</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ROI Stats */}
            <section className="py-20 border-t border-gray-900">
                <Container>
                    <div className="bg-amber-500 rounded-3xl p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 text-black text-center md:text-left">
                            <div className="col-span-1 md:col-span-3 mb-4">
                                <h2 className="text-3xl font-bold mb-2">Impact by the Numbers</h2>
                                <p className="opacity-80">Average results from our first 30 days of implementation.</p>
                            </div>
                            {roiStats.map((stat, idx) => (
                                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-black/5">
                                    <div className="text-4xl font-bold mb-2">{stat.value}</div>
                                    <div className="font-medium opacity-75 uppercase tracking-wide text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}
