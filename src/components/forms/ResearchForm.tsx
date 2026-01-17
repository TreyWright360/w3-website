import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, Target, Users, Sparkles,
    ArrowRight, ArrowLeft, Check, Loader2,
    Globe, Mail, Phone, Briefcase
} from 'lucide-react';

// Form sections
const SECTIONS = [
    { id: 1, title: 'Core Identity', icon: Building2 },
    { id: 2, title: 'Target Market', icon: Target },
    { id: 3, title: 'Competition', icon: Users },
    { id: 4, title: 'AI Services', icon: Sparkles }
];

// Initial form state
const initialFormData = {
    // Section 1: Core Identity
    companyName: '',
    industry: '',
    website: '',
    services: '',
    usp: '',

    // Section 2: Target Market
    targetCustomers: '',
    challenges: '',
    dreamOutcome: '',

    // Section 3: Competition
    competitor1: '',
    competitor2: '',
    competitor3: '',
    differentiator: '',

    // Section 4: AI Services & Contact
    aiServices: [] as string[],
    email: '',
    phone: '',
    timeline: '',
    budget: ''
};

type FormData = typeof initialFormData;

interface ResearchFormProps {
    onSubmitSuccess?: (jobId: string) => void;
}

export function ResearchForm({ onSubmitSuccess }: ResearchFormProps) {
    const [currentSection, setCurrentSection] = useState(1);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const updateField = (field: keyof FormData, value: string | string[]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleAIService = (service: string) => {
        const current = formData.aiServices;
        if (current.includes(service)) {
            updateField('aiServices', current.filter(s => s !== service));
        } else {
            updateField('aiServices', [...current, service]);
        }
    };

    const canProceed = () => {
        switch (currentSection) {
            case 1:
                return formData.companyName && formData.industry && formData.services;
            case 2:
                return formData.targetCustomers;
            case 3:
                return formData.competitor1; // At least one competitor
            case 4:
                return formData.email && formData.aiServices.length > 0;
            default:
                return true;
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const payload = {
                name: formData.companyName,
                industry: formData.industry,
                website: formData.website,
                services: formData.services,
                target_customers: formData.targetCustomers,
                usp: formData.usp,
                competitors: [formData.competitor1, formData.competitor2, formData.competitor3].filter(Boolean),
                challenges: formData.challenges,
                email: formData.email,
                phone: formData.phone,
                // Additional metadata
                dream_outcome: formData.dreamOutcome,
                differentiator: formData.differentiator,
                ai_services: formData.aiServices,
                timeline: formData.timeline,
                budget: formData.budget
            };

            // POST to your Python backend
            const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

            const response = await fetch(`${API_URL}/api/research/start`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Failed to submit. Please try again.');
            }

            const result = await response.json();
            setSubmitted(true);
            onSubmitSuccess?.(result.job_id);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success screen
    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto p-8 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
                >
                    <Check className="w-10 h-10 text-green-500" />
                </motion.div>
                <h2 className="text-3xl font-bold mb-4">Research Started!</h2>
                <p className="text-[--text-secondary] mb-8">
                    We're analyzing your business and competitors. You'll receive your custom demo within 24-48 hours.
                </p>
                <div className="p-6 rounded-xl bg-[--bg-secondary] border border-[--border]">
                    <h3 className="font-semibold mb-2">What happens next?</h3>
                    <ul className="text-left text-sm space-y-2 text-[--text-secondary]">
                        <li>1. Our AI researches your industry (2-4 hours)</li>
                        <li>2. We generate your custom demo package</li>
                        <li>3. You receive: Website + Voice AI + 3 Videos</li>
                        <li>4. Schedule a call to review your demo</li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between mb-2">
                    {SECTIONS.map((section) => {
                        const Icon = section.icon;
                        const isActive = currentSection === section.id;
                        const isCompleted = currentSection > section.id;

                        return (
                            <div
                                key={section.id}
                                className={`flex items-center gap-2 text-sm transition-colors ${isActive ? 'text-[--primary]' :
                                    isCompleted ? 'text-green-500' : 'text-[--text-secondary]'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-[--primary] text-white' :
                                    isCompleted ? 'bg-green-500 text-white' : 'bg-[--bg-secondary]'
                                    }`}>
                                    {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                                </div>
                                <span className="hidden sm:inline">{section.title}</span>
                            </div>
                        );
                    })}
                </div>
                <div className="h-2 bg-[--bg-secondary] rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-[--primary] to-[--accent]"
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentSection / SECTIONS.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* Form Sections */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSection}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                >
                    {/* Section 1: Core Identity */}
                    {currentSection === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">Tell us about your business</h2>

                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Company Name *</label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[--text-secondary]" />
                                        <input
                                            type="text"
                                            value={formData.companyName}
                                            onChange={(e) => updateField('companyName', e.target.value)}
                                            placeholder="Your Company Name"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[--bg-secondary] border border-[--border] focus:border-[--primary] focus:ring-2 focus:ring-[--primary]/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Industry *</label>
                                    <select
                                        value={formData.industry}
                                        onChange={(e) => updateField('industry', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-[--bg-secondary] border border-[--border] focus:border-[--primary] outline-none"
                                    >
                                        <option value="">Select your industry</option>
                                        <option value="Healthcare">Healthcare</option>
                                        <option value="Real Estate">Real Estate</option>
                                        <option value="Legal">Legal</option>
                                        <option value="Finance">Finance</option>
                                        <option value="E-commerce">E-commerce</option>
                                        <option value="SaaS">SaaS / Technology</option>
                                        <option value="Restaurant">Restaurant / Food</option>
                                        <option value="Home Services">Home Services</option>
                                        <option value="Education">Education</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Website</label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[--text-secondary]" />
                                        <input
                                            type="url"
                                            value={formData.website}
                                            onChange={(e) => updateField('website', e.target.value)}
                                            placeholder="https://yourwebsite.com"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[--bg-secondary] border border-[--border] focus:border-[--primary] outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Main Services/Products *</label>
                                    <textarea
                                        value={formData.services}
                                        onChange={(e) => updateField('services', e.target.value)}
                                        placeholder="What do you offer? (e.g., 'We provide dental implants, teeth whitening, and general dentistry')"
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl bg-[--bg-secondary] border border-[--border] focus:border-[--primary] outline-none resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Unique Selling Proposition</label>
                                    <input
                                        type="text"
                                        value={formData.usp}
                                        onChange={(e) => updateField('usp', e.target.value)}
                                        placeholder="What makes you different from competitors?"
                                        className="w-full px-4 py-3 rounded-xl bg-[--bg-secondary] border border-[--border] focus:border-[--primary] outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 2: Target Market */}
                    {currentSection === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">Who do you serve?</h2>

                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Target Customers *</label>
                                    <textarea
                                        value={formData.targetCustomers}
                                        onChange={(e) => updateField('targetCustomers', e.target.value)}
                                        placeholder="Describe your ideal customer (e.g., 'Small business owners aged 35-55 in the Dallas area')"
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl bg-[--bg-secondary] border border-[--border] focus:border-[--primary] outline-none resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Biggest Challenges</label>
                                    <textarea
                                        value={formData.challenges}
                                        onChange={(e) => updateField('challenges', e.target.value)}
                                        placeholder="What problems do your customers face that you solve?"
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl bg-[--bg-secondary] border border-[--border] focus:border-[--primary] outline-none resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Dream Outcome</label>
                                    <input
                                        type="text"
                                        value={formData.dreamOutcome}
                                        onChange={(e) => updateField('dreamOutcome', e.target.value)}
                                        placeholder="What result do customers want? (e.g., 'A pain-free smile they're proud of')"
                                        className="w-full px-4 py-3 rounded-xl bg-[--bg-secondary] border border-[--border] focus:border-[--primary] outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 3: Competition */}
                    {currentSection === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">Know your competition</h2>
                            <p className="text-[--text-secondary]">We'll analyze these to position you better.</p>

                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Competitor 1 *</label>
                                    <input
                                        type="text"
                                        value={formData.competitor1}
                                        onChange={(e) => updateField('competitor1', e.target.value)}
                                        placeholder="Name or website URL"
                                        className="w-full px-4 py-3 rounded-xl bg-[--bg-secondary] border border-[--border] focus:border-[--primary] outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Competitor 2</label>
                                    <input
                                        type="text"
                                        value={formData.competitor2}
                                        onChange={(e) => updateField('competitor2', e.target.value)}
                                        placeholder="Name or website URL"
                                        className="w-full px-4 py-3 rounded-xl bg-[--bg-secondary] border border-[--border] focus:border-[--primary] outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Competitor 3</label>
                                    <input
                                        type="text"
                                        value={formData.competitor3}
                                        onChange={(e) => updateField('competitor3', e.target.value)}
                                        placeholder="Name or website URL"
                                        className="w-full px-4 py-3 rounded-xl bg-[--bg-secondary] border border-[--border] focus:border-[--primary] outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">What makes you better?</label>
                                    <textarea
                                        value={formData.differentiator}
                                        onChange={(e) => updateField('differentiator', e.target.value)}
                                        placeholder="Why should customers choose you over these competitors?"
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl bg-[--bg-secondary] border border-[--border] focus:border-[--primary] outline-none resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 4: AI Services & Contact */}
                    {currentSection === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">Choose your AI package</h2>

                            {/* AI Services Selection */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium mb-2">Which AI services interest you? *</label>

                                {[
                                    { id: 'voice-agent', label: 'AI Voice Agent', desc: '24/7 receptionist for your website', price: '$5K-15K' },
                                    { id: 'text-chatbot', label: 'Text Chatbot', desc: 'Social media automation', price: '$3K-8K' },
                                    { id: 'avatar-chatbot', label: 'Avatar Chatbot', desc: 'Premium video avatar', price: '$5K-12K' },
                                ].map(service => (
                                    <div
                                        key={service.id}
                                        onClick={() => toggleAIService(service.id)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.aiServices.includes(service.id)
                                            ? 'border-[--primary] bg-[--primary]/10'
                                            : 'border-[--border] hover:border-[--primary]/50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-semibold">{service.label}</h4>
                                                <p className="text-sm text-[--text-secondary]">{service.desc}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[--primary] font-medium">{service.price}</span>
                                                <div className={`w-5 h-5 rounded border-2 mt-1 ml-auto flex items-center justify-center ${formData.aiServices.includes(service.id)
                                                    ? 'border-[--primary] bg-[--primary]'
                                                    : 'border-[--border]'
                                                    }`}>
                                                    {formData.aiServices.includes(service.id) && (
                                                        <Check className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Contact Info */}
                            <div className="grid gap-4 pt-4 border-t border-[--border]">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email *</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[--text-secondary]" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => updateField('email', e.target.value)}
                                            placeholder="you@company.com"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[--bg-secondary] border border-[--border] focus:border-[--primary] outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[--text-secondary]" />
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => updateField('phone', e.target.value)}
                                            placeholder="(555) 123-4567"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[--bg-secondary] border border-[--border] focus:border-[--primary] outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Timeline</label>
                                        <select
                                            value={formData.timeline}
                                            onChange={(e) => updateField('timeline', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-[--bg-secondary] border border-[--border] focus:border-[--primary] outline-none"
                                        >
                                            <option value="">When do you need this?</option>
                                            <option value="asap">ASAP (within 2 weeks)</option>
                                            <option value="month">This month</option>
                                            <option value="quarter">This quarter</option>
                                            <option value="exploring">Just exploring</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Budget Range</label>
                                        <select
                                            value={formData.budget}
                                            onChange={(e) => updateField('budget', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-[--bg-secondary] border border-[--border] focus:border-[--primary] outline-none"
                                        >
                                            <option value="">Select budget</option>
                                            <option value="5-10k">$5,000 - $10,000</option>
                                            <option value="10-20k">$10,000 - $20,000</option>
                                            <option value="20k+">$20,000+</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Error Message */}
            {error && (
                <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">
                    {error}
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-[--border]">
                {currentSection > 1 ? (
                    <button
                        onClick={() => setCurrentSection(prev => prev - 1)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[--border] hover:bg-[--bg-secondary] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                ) : (
                    <div />
                )}

                {currentSection < SECTIONS.length ? (
                    <button
                        onClick={() => setCurrentSection(prev => prev + 1)}
                        disabled={!canProceed()}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[--primary] text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Continue
                        <ArrowRight className="w-4 h-4" />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={!canProceed() || isSubmitting}
                        className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[--primary] to-[--accent] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Starting Research...
                            </>
                        ) : (
                            <>
                                Get My Free Demo
                                <Sparkles className="w-4 h-4" />
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}

export default ResearchForm;
