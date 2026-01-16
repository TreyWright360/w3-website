import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ComparisonRow {
    feature: string;
    oldWay: string;
    newWay: string;
}

interface DemoPageTemplateProps {
    title: string;
    subtitle: string;
    heroCta: string;
    comparisonTable: {
        headers: [string, string, string];
        rows: ComparisonRow[];
    };
    onCtaClick?: () => void;
    children: React.ReactNode;
}

export function DemoPageTemplate({
    title,
    subtitle,
    heroCta,
    comparisonTable,
    onCtaClick,
    children
}: DemoPageTemplateProps) {
    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6"
                >
                    {title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl md:text-2xl text-[--text-secondary] max-w-4xl mx-auto mb-8"
                >
                    {subtitle}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <button
                        onClick={onCtaClick}
                        className="inline-flex items-center px-8 py-4 bg-[--primary] text-white rounded-full font-bold text-lg hover:bg-[--primary-dark] transition-colors shadow-lg shadow-[--primary]/20"
                    >
                        {heroCta}
                    </button>
                </motion.div>
            </div>

            {/* Interactive Mockup Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mb-24 bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden relative"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                {children}
            </motion.div>

            {/* Comparison Table */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto"
            >
                <h2 className="text-3xl font-bold text-center mb-12">The Arbitrage</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[--border-primary]">
                                <th className="py-4 px-6 text-[--text-secondary] font-medium">{comparisonTable.headers[0]}</th>
                                <th className="py-4 px-6 text-red-400 font-bold bg-red-500/5">{comparisonTable.headers[1]}</th>
                                <th className="py-4 px-6 text-green-400 font-bold bg-green-500/5">{comparisonTable.headers[2]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonTable.rows.map((row, index) => (
                                <tr key={index} className="border-b border-[--border-primary] hover:bg-[--bg-secondary] transition-colors">
                                    <td className="py-4 px-6 font-medium text-[--text-primary]">{row.feature}</td>
                                    <td className="py-4 px-6 text-[--text-secondary] bg-red-500/5 flex items-start gap-2">
                                        <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                        {row.oldWay}
                                    </td>
                                    <td className="py-4 px-6 text-[--text-primary] font-bold bg-green-500/5 items-start gap-2">
                                        <div className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                            {row.newWay}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
