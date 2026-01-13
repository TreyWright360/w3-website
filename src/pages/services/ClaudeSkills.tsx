import { Bot, Check, Cpu, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export function ClaudeSkills() {
    return (
        <div className="pt-24 pb-16">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[--accent]/10 border border-[--accent]/20 text-[--accent] mb-6"
                        >
                            <Bot className="w-4 h-4" />
                            <span className="text-sm font-medium">For Development Teams</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                        >
                            Stop Building Demo Code. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--accent] to-[--primary]">
                                Build Production Systems.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-[--text-secondary] mb-8"
                        >
                            We install 7 expert skills that inject engineering best practices into every line of code your AI generates.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* The Solution */}
            <section className="py-20 bg-[--bg-secondary]/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-16">The 7 Skills We Install</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { title: "Frontend Design", desc: "Professional UI principles, modern design patterns, fixing the 'purple design of doom'." },
                                { title: "Component Architecture", desc: "Systematic feature planning and implementation blueprints. Reduces bugs by 80%." },
                                { title: "Error Handling", desc: "Bulletproof error management, circuit breakers, and context-rich errors." },
                                { title: "Skill Creator", desc: "Build custom skills for YOUR workflows. Codify your team's expertise." },
                                { title: "Prompt Engineering", desc: "Optimize LLM API calls for consistency and lower costs." },
                                { title: "API Design Principles", desc: "Clean REST APIs, scalable architecture, and industry best practices." },
                                { title: "Postgres Table Design", desc: "Database optimization, proper indexing, and scalable schema design." }
                            ].map((skill, i) => (
                                <div key={i} className="p-6 rounded-xl bg-[--bg-primary] border border-[--border] flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[--accent]/10 text-[--accent] flex items-center justify-center flex-shrink-0 font-bold">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-2">{skill.title}</h3>
                                        <p className="text-sm text-[--text-secondary]">{skill.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ROI */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Return on Investment</h2>
                            <p className="text-lg text-[--text-secondary] mb-8">
                                Transform your team's output from "plausible" to "production-ready" instantly.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-lg bg-[--bg-secondary]">
                                        <Terminal className="w-6 h-6 text-[--text-secondary]" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-[--text-secondary]">Development Speed</div>
                                        <div className="text-2xl font-bold text-[--primary]">10x Faster</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-lg bg-[--bg-secondary]">
                                        <Cpu className="w-6 h-6 text-[--text-secondary]" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-[--text-secondary]">Bug Reduction</div>
                                        <div className="text-2xl font-bold text-[--green]">80% Fewer Bugs</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-2xl bg-gradient-to-br from-[--bg-secondary] to-[--bg-primary] border border-[--border]">
                            <h3 className="text-2xl font-bold mb-2">Investment</h3>
                            <div className="text-4xl font-bold text-[--accent] mb-2">$2,500</div>
                            <div className="text-sm text-[--text-secondary] mb-6">One-time setup fee</div>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-[--accent]" />
                                    All 7 Skills Installed
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-[--accent]" />
                                    3-5 Custom Skills
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-[--accent]" />
                                    Team Training Session
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-[--accent]" />
                                    30 Days Support
                                </li>
                            </ul>

                            <button className="w-full py-3 rounded-xl bg-[--accent] text-white font-medium hover:shadow-lg hover:shadow-[--accent]/25 transition-all">
                                Book Implementation Call
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
