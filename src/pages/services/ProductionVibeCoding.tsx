import { Check, Code2, Rocket, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProductionVibeCoding() {
    return (
        <div className="pt-24 pb-16">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[--primary]/10 border border-[--primary]/20 text-[--primary] mb-6"
                        >
                            <Code2 className="w-4 h-4" />
                            <span className="text-sm font-medium">Production-Ready Development</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                        >
                            Transform Designs Into <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--primary] to-[--accent]">
                                Ship-Ready Code
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-[--text-secondary] mb-8"
                        >
                            Not just beautiful UIs. Production systems that scale. <br />
                            From $5,000 | 1-3 Days Delivery | 100% Production-Ready
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Problem / Solution */}
            <section className="py-20 bg-[--bg-secondary]/30">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/10">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-red-500/10 text-red-500">❌</span>
                                Standard AI Code
                            </h3>
                            <ul className="space-y-4">
                                {['Not scalable', 'Hard to maintain', 'Hardcoded values everywhere', 'No error handling', 'Demo code, not production code'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[--text-secondary]">
                                        <div className="w-6 h-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center flex-shrink-0">×</div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-8 rounded-2xl bg-green-500/5 border border-green-500/10">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-green-500/10 text-green-500">✅</span>
                                Production-Ready Vibe Coding
                            </h3>
                            <ul className="space-y-4">
                                {['Scalable architecture from day 1', 'Clean, maintainable code', 'Proper error handling', 'Fully responsive & Themeable', 'SEO-optimized'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[--text-primary]">
                                        <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-4 h-4" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16">What's Included</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                icon: <Rocket />,
                                title: "Design Analysis",
                                desc: "Convert your Figma/mockup to structured specification and JSONC design brief."
                            },
                            {
                                icon: <Code2 />,
                                title: "Production Codebase",
                                desc: "Next.js + Tailwind CSS + TypeScript. Component library and design tokens."
                            },
                            {
                                icon: <ShieldCheck />,
                                title: "Engineering Excellence",
                                desc: "Frontend Design skill, Component Architecture, and Error Handling applied."
                            },
                            {
                                icon: <Zap />,
                                title: "Deployment Ready",
                                desc: "Configured for Vercel/Netlify with proper environment setup and documentation."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[--bg-secondary] border border-[--border] hover:border-[--primary] transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-[--primary]/10 text-[--primary] flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-[--text-secondary] text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-20 bg-[--bg-secondary]/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12">Straightforward Pricing</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <PricingCard
                                title="Landing Page"
                                price="$5,000"
                                delivery="1-3 Days"
                                features={['Ideal for MVPs', 'Conversion Optimized', 'SEO Ready']}
                            />
                            <PricingCard
                                title="Dashboard"
                                price="$8,000"
                                delivery="3-5 Days"
                                highlight
                                features={['User Auth UI', 'Analytics Charts', 'Admin Tables']}
                            />
                            <PricingCard
                                title="Full Web App"
                                price="$10,000+"
                                delivery="Custom"
                                features={['Complex Logic', 'Database Integration', 'API Development']}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function PricingCard({ title, price, delivery, features, highlight = false }: any) {
    return (
        <div className={`p-8 rounded-2xl border ${highlight ? 'bg-[--bg-secondary] border-[--primary] ring-1 ring-[--primary]' : 'bg-[--bg-primary] border-[--border]'} flex flex-col`}>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <div className="text-3xl font-bold mb-1">{price}</div>
            <div className="text-sm text-[--text-secondary] mb-6">{delivery} Delivery</div>

            <ul className="space-y-3 mb-8 flex-1">
                {features.map((f: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-[--primary]" />
                        {f}
                    </li>
                ))}
            </ul>

            <button className={`w-full py-3 rounded-xl font-medium transition-all ${highlight ? 'bg-[--primary] text-white hover:shadow-lg hover:shadow-[--primary]/25' : 'bg-[--bg-secondary] hover:bg-[--border]'}`}>
                Get Started
            </button>
        </div>
    );
}
