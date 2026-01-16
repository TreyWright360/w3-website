import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Phone, MessageSquare, Mail, Search, Calendar, BookOpen, BarChart3, Video, Users } from 'lucide-react';

const demos = [
    {
        id: 'lead-magnets',
        title: 'AI Lead Magnets',
        description: 'Convert 40% of traffic with intelligent, interactive assets.',
        icon: Zap,
        color: 'text-amber-400',
        path: '/demos/lead-magnets'
    },
    {
        id: 'mass-outreach',
        title: 'Mass Phone Outreach',
        description: '10,000 calls in 10 minutes with <500ms latency.',
        icon: Phone,
        color: 'text-green-400',
        path: '/demos/mass-outreach'
    },
    {
        id: 'phone-support',
        title: '24/7 Phone Support',
        description: 'Never miss a lead at 2AM. The AI Receptionist is always on.',
        icon: Phone,
        color: 'text-blue-400',
        path: '/demos/phone-support'
    },
    {
        id: 'text-support',
        title: 'Text Support Agents',
        description: 'Instant resolution for customer queries, 24/7.',
        icon: MessageSquare,
        color: 'text-purple-400',
        path: '/demos/text-support'
    },
    {
        id: 'personalized-outreach',
        title: 'Signal-Based Outreach',
        description: 'Stop spamming. Start connecting with hyper-personalized emails.',
        icon: Mail,
        color: 'text-indigo-400',
        path: '/demos/personalized-outreach'
    },
    {
        id: 'information-retrieval',
        title: 'Enterprise RAG',
        description: 'Stop the "Hide and Seek". Instant answers from your company data.',
        icon: Search,
        color: 'text-cyan-400',
        path: '/demos/information-retrieval'
    },
    {
        id: 'appointment-setting',
        title: 'Appointment Setting',
        description: 'AI "Tetris" for your calendar. Reclaim 10+ hours a week.',
        icon: Calendar,
        color: 'text-rose-400',
        path: '/demos/appointment-setting'
    },
    {
        id: 'productized-info',
        title: 'Instant Course Creator',
        description: 'Turn your brain into a product in minutes, not months.',
        icon: BookOpen,
        color: 'text-orange-400',
        path: '/demos/productized-info'
    },
    {
        id: 'sales-analysis',
        title: 'Sales Call Analysis',
        description: 'Unlock the "Black Box" of your unreviewed sales calls.',
        icon: BarChart3,
        color: 'text-teal-400',
        path: '/demos/sales-analysis'
    },
    {
        id: 'content-repurposing',
        title: 'Content Repurposing',
        description: 'Turn one video into 20 viral clips. Context-aware, not random.',
        icon: Video,
        color: 'text-fuchsia-400',
        path: '/demos/content-repurposing'
    },
    {
        id: 'recruitment',
        title: 'Automated Recruitment',
        description: 'Stop ghosting candidates. Instant interviews for everyone.',
        icon: Users,
        color: 'text-sky-400',
        path: '/demos/recruitment'
    }
];

export function DemoHub() {
    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6"
                >
                    Industry Applications
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-[--text-secondary] max-w-3xl mx-auto"
                >
                    Explore 11 production-ready AI systems designed to solve specific business problems.
                    See the research, the arbitrage, and the solution.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {demos.map((demo, index) => (
                    <motion.div
                        key={demo.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Link to={demo.path} className="group block h-full">
                            <div className="h-full bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6 hover:border-[--primary] transition-colors duration-300 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <demo.icon className="w-24 h-24" />
                                </div>

                                <div className={`w-12 h-12 rounded-lg bg-[--bg-tertiary] flex items-center justify-center mb-6 ${demo.color}`}>
                                    <demo.icon className="w-6 h-6" />
                                </div>

                                <h3 className="text-xl font-bold mb-3 group-hover:text-[--primary] transition-colors">
                                    {demo.title}
                                </h3>

                                <p className="text-[--text-secondary] mb-6 line-clamp-3">
                                    {demo.description}
                                </p>

                                <div className="flex items-center text-sm font-medium text-[--primary] mt-auto">
                                    View Demo <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
