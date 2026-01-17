import { Check, Globe, Rocket, Sparkles, Palette, Send, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function AIBusinessWebsite() {
    const pagesFramework = [
        {
            letter: 'P',
            title: 'Purpose',
            description: 'Define your destination. Competitive research & clear goals before we write a single line of code.',
            icon: <Rocket className="w-6 h-6" />
        },
        {
            letter: 'A',
            title: 'Anchor',
            description: 'Scroll-stopping hero section with stunning animations that capture attention in seconds.',
            icon: <Sparkles className="w-6 h-6" />
        },
        {
            letter: 'G',
            title: 'Guide',
            description: 'Conversion-optimized copy that leads visitors on a journey to take action.',
            icon: <Send className="w-6 h-6" />
        },
        {
            letter: 'E',
            title: 'Elevate',
            description: 'Premium UI components from Magic UI and world-class design libraries.',
            icon: <Palette className="w-6 h-6" />
        },
        {
            letter: 'S',
            title: 'Ship',
            description: 'Deploy to Vercel with your custom domain. Go live in days, not months.',
            icon: <Zap className="w-6 h-6" />
        }
    ];

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
                            <Globe className="w-4 h-4" />
                            <span className="text-sm font-medium">AI-Powered Web Design</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                        >
                            Stunning Websites That <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--primary] to-[--accent]">
                                Convert Viewers Into Buyers
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-[--text-secondary] mb-8"
                        >
                            Gorgeous, scroll-stopping websites with animated hero sections. <br />
                            Built with the P.A.G.E.S Framework. Deployed in days.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <button className="px-8 py-4 rounded-xl bg-[--primary] text-white font-medium hover:shadow-lg hover:shadow-[--primary]/25 transition-all text-lg">
                                Build My Website
                            </button>
                            <button className="px-8 py-4 rounded-xl bg-[--bg-secondary] text-[--text-primary] font-medium hover:bg-[--border] transition-all text-lg">
                                See Examples
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* The Problem / Solution */}
            <section className="py-20 bg-[--bg-secondary]/30">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/10">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-red-500/10 text-red-500">❌</span>
                                Generic Web Design
                            </h3>
                            <ul className="space-y-4">
                                {['Template-based, looks like everyone else', 'No conversion strategy', 'Slow development (weeks/months)', 'Expensive agencies ($10K+)', 'Static, boring hero sections'].map((item, i) => (
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
                                AI Business Website
                            </h3>
                            <ul className="space-y-4">
                                {['Unique, custom design for your brand', 'P.A.G.E.S conversion framework built-in', 'Delivered in days, not months', 'Starting at $2,500', 'Animated, scroll-stopping hero sections'].map((item, i) => (
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

            {/* P.A.G.E.S Framework */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">The P.A.G.E.S Framework</h2>
                        <p className="text-[--text-secondary] text-lg max-w-2xl mx-auto">
                            Our proven 5-step system for building websites that actually convert visitors into customers.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-6">
                            {pagesFramework.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-6 p-6 rounded-2xl bg-[--bg-secondary] border border-[--border] hover:border-[--primary] transition-colors group"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[--primary] to-[--accent] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                                        {step.letter}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="text-[--primary]">{step.icon}</div>
                                            <h3 className="text-xl font-bold">{step.title}</h3>
                                        </div>
                                        <p className="text-[--text-secondary]">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className="py-20 bg-[--bg-secondary]/30">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16">What You Get</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            { title: 'Competitive Research', desc: 'Deep dive into your competitors to understand positioning.' },
                            { title: 'Animated Hero Section', desc: 'Scroll-stopping animations that capture attention.' },
                            { title: 'Conversion Copy', desc: 'Every word written to drive action and sales.' },
                            { title: 'Premium UI Components', desc: 'Magic UI and world-class component libraries.' },
                            { title: 'Mobile Responsive', desc: 'Looks stunning on every device and screen size.' },
                            { title: 'Custom Domain Deploy', desc: 'Live on your domain with Vercel deployment.' }
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[--bg-primary] border border-[--border]">
                                <div className="w-10 h-10 rounded-lg bg-[--primary]/10 text-[--primary] flex items-center justify-center mb-4">
                                    <Check className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-[--text-secondary]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12">Simple Pricing</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <PricingCard
                                title="Landing Page"
                                price="$2,500"
                                delivery="3-5 Days"
                                features={['1 Page Website', 'Animated Hero', 'Mobile Responsive', 'Basic SEO']}
                            />
                            <PricingCard
                                title="Business Site"
                                price="$5,000"
                                delivery="5-7 Days"
                                highlight
                                features={['Up to 5 Pages', 'Animated Hero', 'Contact Forms', 'Full SEO', 'CMS Integration']}
                            />
                            <PricingCard
                                title="Custom Build"
                                price="$10,000+"
                                delivery="Custom"
                                features={['Unlimited Pages', 'E-commerce Ready', 'Custom Features', 'Ongoing Support']}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-[--primary]/10 to-[--accent]/10 border border-[--primary]/20">
                        <h2 className="text-4xl font-bold mb-4">Ready to Build Your Website?</h2>
                        <p className="text-[--text-secondary] text-lg mb-8">
                            Book a free discovery call and let's discuss your vision.
                        </p>
                        <button className="px-8 py-4 rounded-xl bg-[--primary] text-white font-medium hover:shadow-lg hover:shadow-[--primary]/25 transition-all text-lg">
                            Book Discovery Call
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

function PricingCard({ title, price, delivery, features, highlight = false }: { title: string; price: string; delivery: string; features: string[]; highlight?: boolean }) {
    return (
        <div className={`p-8 rounded-2xl border ${highlight ? 'bg-[--bg-secondary] border-[--primary] ring-1 ring-[--primary]' : 'bg-[--bg-primary] border-[--border]'} flex flex-col`}>
            {highlight && (
                <div className="text-xs font-bold text-[--primary] uppercase tracking-wider mb-4">Most Popular</div>
            )}
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <div className="text-3xl font-bold mb-1">{price}</div>
            <div className="text-sm text-[--text-secondary] mb-6">{delivery} Delivery</div>

            <ul className="space-y-3 mb-8 flex-1">
                {features.map((f, i) => (
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
