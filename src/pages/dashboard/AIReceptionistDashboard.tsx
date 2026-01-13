import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Calculator, Check, Phone, DollarSign, TrendingUp, Users } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Industry {
    name: string;
    callsPerDay: number;
    conversion: number;
    avgTransaction: number;
    upsells: string[];
    painPoints: string[];
    script: string;
}

const industries: Record<string, Industry> = {
    dentist: {
        name: '🦷 Dentist',
        callsPerDay: 30,
        conversion: 50,
        avgTransaction: 100,
        upsells: ['Fillings', 'Root canals', 'Whitening', 'Veneers', 'Extractions'],
        painPoints: ['After 5pm → No one answering', 'Weekends → No one answering', 'Lunch hours → Staff too busy'],
        script: 'Patients call after work. If you\'re closed, they call your competitor.'
    },
    chiropractor: {
        name: '💆 Chiropractor',
        callsPerDay: 25,
        conversion: 60,
        avgTransaction: 75,
        upsells: ['Adjustment packages', 'Massage therapy', 'Supplements', 'X-rays'],
        painPoints: ['Emergency back pain calls after hours', 'New patient inquiries', 'Appointment rescheduling'],
        script: 'People hurt their back lifting boxes after work. They need you NOW, not tomorrow.'
    },
    plumber: {
        name: '🔧 Plumber',
        callsPerDay: 15,
        conversion: 40,
        avgTransaction: 200,
        upsells: ['Water heater replacement', 'Pipe repairs', 'Emergency rates', 'Drain cleaning'],
        painPoints: ['Emergency calls (burst pipes)', 'After-hours service requests', 'Weekend emergencies'],
        script: 'Pipes burst at 2am. If you\'re not answering, they call the next plumber in Google.'
    },
    medspa: {
        name: '💅 Med Spa',
        callsPerDay: 20,
        conversion: 35,
        avgTransaction: 150,
        upsells: ['Botox', 'Fillers', 'Laser treatments', 'Skincare packages'],
        painPoints: ['Consultation booking during work hours', 'Treatment inquiries', 'Package sales'],
        script: 'Clients want to book consultations after work. If you miss the call, they book with someone else.'
    },
    realtor: {
        name: '🏠 Realtor',
        callsPerDay: 40,
        conversion: 5,
        avgTransaction: 8000,
        upsells: ['Buyer referrals', 'Seller leads', 'Investment properties'],
        painPoints: ['Property showing requests', 'Buyer qualification', 'Weekend open house inquiries'],
        script: 'Homebuyers call at night researching properties. First agent to respond gets the client.'
    },
    hvac: {
        name: '❄️ HVAC',
        callsPerDay: 20,
        conversion: 45,
        avgTransaction: 180,
        upsells: ['AC replacement', 'Furnace installation', 'Maintenance contracts'],
        painPoints: ['Emergency AC repairs in summer', 'Heater failures in winter', 'After-hours emergencies'],
        script: 'AC breaks at 8pm in July. Whoever answers first gets a $5K replacement job.'
    },
    lawyer: {
        name: '⚖️ Law Firm',
        callsPerDay: 18,
        conversion: 30,
        avgTransaction: 250,
        upsells: ['Retainer fees', 'Court representation', 'Contract review'],
        painPoints: ['Urgent legal matters', 'Case consultations', 'Emergency filings'],
        script: 'Legal emergencies don\'t happen 9-5. Be available when clients need you most.'
    },
    restaurant: {
        name: '🍽️ Restaurant',
        callsPerDay: 35,
        conversion: 70,
        avgTransaction: 60,
        upsells: ['Catering orders', 'Event bookings', 'Gift cards'],
        painPoints: ['Reservation requests', 'Catering inquiries', 'Takeout orders'],
        script: 'Customers call to make reservations at 7pm. If no one answers, they go elsewhere.'
    },
    autorepair: {
        name: '🚗 Auto Repair',
        callsPerDay: 22,
        conversion: 50,
        avgTransaction: 175,
        upsells: ['Full service packages', 'Tire replacements', 'Transmission work'],
        painPoints: ['Breakdown emergencies', 'Appointment scheduling', 'Quote requests'],
        script: 'Car breaks down after work. They need it fixed ASAP. Answer the phone, get the job.'
    },
    vet: {
        name: '🐾 Veterinarian',
        callsPerDay: 25,
        conversion: 55,
        avgTransaction: 120,
        upsells: ['Emergency visits', 'Surgery', 'Dental cleanings', 'Vaccinations'],
        painPoints: ['Pet emergencies after hours', 'Appointment booking', 'Urgent care needs'],
        script: 'Pets get sick at night. Panicked owners call. Be there to answer.'
    }
};

const AIReceptionistDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'roi' | 'mrr' | 'sales' | 'industries'>('roi');

    // ROI State
    const [selectedIndustry, setSelectedIndustry] = useState<string>('custom');
    const [callsPerDay, setCallsPerDay] = useState<number>(30);
    const [conversionRate, setConversionRate] = useState<number>(50);
    const [avgTransaction, setAvgTransaction] = useState<number>(100);
    const [monthlyPrice, setMonthlyPrice] = useState<number>(497);

    // ROI Calculations
    const callsPerMonth = callsPerDay * 30;
    const newCustomers = Math.floor(callsPerMonth * (conversionRate / 100));
    const addedRevenue = newCustomers * avgTransaction;
    const roiMultiple = monthlyPrice > 0 ? Math.floor(addedRevenue / monthlyPrice) : 0;

    // MRR State
    const [currentClients, setCurrentClients] = useState<number>(0);
    const [avgPrice, setAvgPrice] = useState<number>(497);
    const [churnRate, setChurnRate] = useState<number>(5);
    const [newClientsMRR, setNewClientsMRR] = useState<number>(0);

    // MRR Calculations
    const currentMRR = currentClients * avgPrice;
    const churnedClients = Math.floor(currentClients * (churnRate / 100));
    const projectedClients = currentClients - churnedClients + newClientsMRR;
    const projectedMRR = projectedClients * avgPrice;
    const arr = currentMRR * 12;
    const goalMRR = 43000;
    const progressPercent = Math.min((currentMRR / goalMRR) * 100, 100);

    // Sales Pipeline State
    const [fbPosts, setFbPosts] = useState<number>(10);
    const [callsPerPost, setCallsPerPost] = useState<number>(0.7);
    const [bookingRate, setBookingRate] = useState<number>(100);
    const [showRate, setShowRate] = useState<number>(70);
    const [salesCloseRate, setSalesCloseRate] = useState<number>(41);

    // Sales Pipeline Calculations
    const demoCallsPerDay = fbPosts * callsPerPost;
    const demoCalls = Math.floor(demoCallsPerDay * 30);
    const appointments = Math.floor(demoCalls * (bookingRate / 100));
    const showedAppts = Math.floor(appointments * (showRate / 100));
    const newSales = Math.floor(showedAppts * (salesCloseRate / 100));
    const newPipelineMRR = newSales * 497;

    // Industry Tab State
    const [selectedIndustryDetail, setSelectedIndustryDetail] = useState<string | null>(null);

    const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedIndustry(value);
        if (value !== 'custom' && industries[value]) {
            setCallsPerDay(industries[value].callsPerDay);
            setConversionRate(industries[value].conversion);
            setAvgTransaction(industries[value].avgTransaction);
        }
    };

    const chartData = {
        labels: ['Current MRR', 'Projected Next Month', 'Goal ($43K)'],
        datasets: [
            {
                label: 'Revenue ($)',
                data: [currentMRR, projectedMRR, goalMRR],
                backgroundColor: ['rgba(33, 53, 85, 0.8)', 'rgba(62, 88, 121, 0.8)', 'rgba(216, 196, 182, 0.5)'],
                borderColor: ['rgba(33, 53, 85, 1)', 'rgba(62, 88, 121, 1)', 'rgba(216, 196, 182, 1)'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="min-h-screen p-4 md:p-8 font-sans text-gray-900 bg-gradient-to-br from-[#213555] to-[#3E5879]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-xl border border-white/20">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 flex items-center gap-4">
                        🤖 AI Receptionist Agency Dashboard
                    </h1>
                    <p className="text-xl text-gray-700">
                        Calculate your path to <span className="font-bold text-[#213555]">$43,000/month</span> in recurring revenue
                    </p>
                </div>

                {/* Quick Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatCard label="Target MRR" value="$43,000" subtext="Month 1 Goal" />
                    <StatCard label="Clients Needed" value="87" subtext="@ $497/month" />
                    <StatCard label="Close Rate" value="41%" subtext="Target Performance" />
                    <StatCard label="Booked Calls" value="210" subtext="Per Month Needed" />
                </div>

                {/* Tabs */}
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl mb-8 shadow-xl overflow-hidden">
                    <div className="flex flex-wrap border-b border-gray-200">
                        <TabButton
                            active={activeTab === 'roi'}
                            onClick={() => setActiveTab('roi')}
                            icon={<Calculator className="w-5 h-5" />}
                            label="ROI Calculator"
                        />
                        <TabButton
                            active={activeTab === 'mrr'}
                            onClick={() => setActiveTab('mrr')}
                            icon={<TrendingUp className="w-5 h-5" />}
                            label="MRR Tracker"
                        />
                        <TabButton
                            active={activeTab === 'sales'}
                            onClick={() => setActiveTab('sales')}
                            icon={<Phone className="w-5 h-5" />}
                            label="Sales Pipeline"
                        />
                        <TabButton
                            active={activeTab === 'industries'}
                            onClick={() => setActiveTab('industries')}
                            icon={<Users className="w-5 h-5" />}
                            label="Industry Templates"
                        />
                    </div>

                    <div className="p-8">
                        {activeTab === 'roi' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-3xl font-bold mb-6 text-gray-900">Industry-Specific ROI Calculator</h2>
                                <p className="text-gray-700 mb-8">Use this exact framework on sales calls to close 41% of prospects</p>

                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-gray-700">Select Industry</label>
                                            <select
                                                value={selectedIndustry}
                                                onChange={handleIndustryChange}
                                                className="w-full p-3 border-2 border-[#D8C4B6] rounded-lg focus:outline-none focus:border-[#3E5879] transition-colors"
                                            >
                                                <option value="custom">Custom Industry</option>
                                                {Object.entries(industries).map(([key, ind]) => (
                                                    <option key={key} value={key}>{ind.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <InputGroup label="Extra Calls Per Day (if 24/7)" value={callsPerDay} onChange={setCallsPerDay} />
                                        <InputGroup label="Conversion Rate (%)" value={conversionRate} onChange={setConversionRate} max={100} />
                                        <InputGroup label="Average Transaction ($)" value={avgTransaction} onChange={setAvgTransaction} />
                                        <InputGroup label="Your Monthly Price ($)" value={monthlyPrice} onChange={setMonthlyPrice} />
                                    </div>

                                    <div className="bg-gradient-to-br from-[#213555] to-[#3E5879] text-white p-8 rounded-2xl shadow-lg">
                                        <h3 className="text-2xl font-bold mb-6">ROI Calculation</h3>
                                        <div className="space-y-6">
                                            <ResultRow label="Calls per Month" value={callsPerMonth.toLocaleString()} />
                                            <ResultRow label="New Customers" value={newCustomers.toLocaleString()} />
                                            <div className="border-t border-white/20 pt-4">
                                                <ResultRow label="Added Monthly Revenue" value={`$${addedRevenue.toLocaleString()}`} large highlight="#D8C4B6" />
                                            </div>
                                            <div className="border-t border-white/20 pt-4">
                                                <ResultRow label="ROI Multiple" value={`${roiMultiple}x`} large highlight="#F5EFE7" />
                                                <div className="text-sm mt-2 text-gray-300">
                                                    Client pays <span className="font-bold text-white">${monthlyPrice.toLocaleString()}</span>,
                                                    makes <span className="font-bold text-white">${addedRevenue.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#F5EFE7] p-6 rounded-xl mb-6 border border-[#D8C4B6]">
                                    <h4 className="font-bold text-lg mb-3 text-gray-900 flex items-center gap-2">
                                        🎯 The Closing Script
                                    </h4>
                                    <div className="space-y-3 text-gray-800">
                                        <p><strong>You:</strong> "So if you could keep your phone lines open 24/7, you'd get about <span className="font-bold text-[#213555]">{callsPerDay}</span> extra calls per day, right?"</p>
                                        <p><strong>Them:</strong> "Yes, probably."</p>
                                        <p><strong>You:</strong> "And you said about <span className="font-bold text-[#213555]">{conversionRate}%</span> of those calls turn into paying customers?"</p>
                                        <p><strong>Them:</strong> "At least half, yes."</p>
                                        <p><strong>You:</strong> "So that's <span className="font-bold text-[#213555]">{newCustomers.toLocaleString()}</span> new customers per month. And if they each spend at least $<span className="font-bold text-[#213555]">{avgTransaction}</span>, that's <span className="font-bold text-[#213555]">${addedRevenue.toLocaleString()}</span> in added revenue every month."</p>
                                        <p><strong>Them:</strong> "I guess so..."</p>
                                        <p className="p-3 bg-white/50 rounded-lg border-l-4 border-[#213555]">
                                            <strong>You (THE CLOSE):</strong> "Would you not pay me $<span className="font-bold text-[#213555]">{monthlyPrice}</span> per month to make an extra $<span className="font-bold text-[#213555]">${addedRevenue.toLocaleString()}</span> every single month? That's a <span className="font-bold text-[#213555]">{roiMultiple}x</span> return on investment."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'mrr' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-3xl font-bold mb-6 text-gray-900">Monthly Recurring Revenue Tracker</h2>
                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    <div className="space-y-6">
                                        <InputGroup label="Current Clients" value={currentClients} onChange={setCurrentClients} />
                                        <InputGroup label="Average Price per Client ($)" value={avgPrice} onChange={setAvgPrice} />
                                        <InputGroup label="Monthly Churn Rate (%)" value={churnRate} onChange={setChurnRate} max={100} />
                                        <InputGroup label="New Clients This Month" value={newClientsMRR} onChange={setNewClientsMRR} />
                                    </div>

                                    <div className="space-y-4">
                                        <StatCard label="Current MRR" value={`$${currentMRR.toLocaleString()}`} />
                                        <StatCard label="Projected Next Month" value={`$${projectedMRR.toLocaleString()}`} />
                                        <StatCard label="Annual Run Rate (ARR)" value={`$${arr.toLocaleString()}`} />
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl mb-6 shadow-sm border border-gray-100">
                                    <h4 className="font-bold text-lg mb-4">Progress to $43K/Month Goal</h4>
                                    <div className="w-full bg-[#D8C4B6] h-4 rounded-full overflow-hidden mb-2">
                                        <div
                                            className="bg-gradient-to-r from-[#213555] to-[#3E5879] h-full transition-all duration-1000 ease-out"
                                            style={{ width: `${progressPercent}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600 font-medium">
                                        <span>${currentMRR.toLocaleString()} of $43,000</span>
                                        <span>{progressPercent.toFixed(1)}%</span>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
                                    <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                                </div>
                            </div>
                        )}

                        {activeTab === 'sales' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-3xl font-bold mb-6 text-gray-900">Sales Pipeline Calculator</h2>
                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    <div className="space-y-6">
                                        <InputGroup label="FB Group Posts per Day" value={fbPosts} onChange={setFbPosts} />
                                        <InputGroup label="Demo AI Calls per Post" value={callsPerPost} onChange={setCallsPerPost} step={0.1} />
                                        <InputGroup label="Booking Rate (%)" value={bookingRate} onChange={setBookingRate} max={100} />
                                        <InputGroup label="Show Rate (%)" value={showRate} onChange={setShowRate} max={100} />
                                        <InputGroup label="Sales Close Rate (%)" value={salesCloseRate} onChange={setSalesCloseRate} max={100} />
                                    </div>

                                    <div className="space-y-4">
                                        <StatCard label="📱 Demo Calls per Month" value={demoCalls.toLocaleString()} />
                                        <StatCard label="📅 Booked Appointments" value={appointments.toLocaleString()} />
                                        <StatCard label="✅ Showed Appointments" value={showedAppts.toLocaleString()} />
                                        <StatCard label="💰 New Clients Closed" value={newSales.toLocaleString()} />
                                        <div className="p-6 rounded-xl bg-gradient-to-br from-[#213555] to-[#3E5879] text-white shadow-lg transform hover:scale-[1.02] transition-transform">
                                            <div className="text-sm opacity-80 mb-1">💵 New MRR This Month</div>
                                            <div className="text-4xl font-bold">${newPipelineMRR.toLocaleString()}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#F5EFE7] p-6 rounded-xl border border-[#D8C4B6]">
                                    <h4 className="font-bold text-lg mb-3">🎯 Action Items to Hit Goal</h4>
                                    <ul className="space-y-3">
                                        <ActionItem text={`Post in ${fbPosts} Facebook groups per day (${fbPosts * 30} posts/month)`} />
                                        <ActionItem text={`Expect ~${(demoCallsPerDay).toFixed(1)} demo AI calls per day`} />
                                        <ActionItem text={`Target: ${appointments} booked calls per month`} />
                                        <ActionItem text={`Close at ${salesCloseRate}% = ${newSales} new clients = $${newPipelineMRR.toLocaleString()} MRR`} />
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeTab === 'industries' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-3xl font-bold mb-6 text-gray-900">Industry-Specific Templates</h2>
                                <div className="grid md:grid-cols-3 gap-6 mb-8">
                                    {Object.entries(industries).map(([key, ind]) => (
                                        <div
                                            key={key}
                                            onClick={() => setSelectedIndustryDetail(key === selectedIndustryDetail ? null : key)}
                                            className={`
                                p-6 rounded-xl cursor-pointer transition-all duration-300 border-2
                                ${selectedIndustryDetail === key
                                                    ? 'border-[#213555] bg-[#F5EFE7] shadow-md transform -translate-y-1'
                                                    : 'border-transparent bg-white hover:border-[#3E5879] hover:shadow-lg hover:-translate-y-1'
                                                }
                            `}
                                        >
                                            <div className="text-4xl mb-3">{ind.name.split(' ')[0]}</div>
                                            <div className="font-bold text-lg text-gray-900">{ind.name.substring(2)}</div>
                                            <div className="text-sm text-gray-600 mt-2">
                                                {ind.callsPerDay} calls/day | {ind.conversion}% conversion
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {selectedIndustryDetail && (
                                    <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#213555] animate-in fade-in zoom-in-95 duration-300">
                                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                            {industries[selectedIndustryDetail].name}
                                            <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Template Details</span>
                                        </h3>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div>
                                                <h4 className="font-bold mb-3 text-[#213555] flex items-center gap-2">
                                                    <TrendingUp className="w-5 h-5" /> ROI Assumptions
                                                </h4>
                                                <ul className="space-y-2 text-gray-700 bg-gray-50 p-4 rounded-lg">
                                                    <li>• Extra calls per day: <strong>{industries[selectedIndustryDetail].callsPerDay}</strong></li>
                                                    <li>• Calls per month: <strong>{industries[selectedIndustryDetail].callsPerDay * 30}</strong></li>
                                                    <li>• Conversion rate: <strong>{industries[selectedIndustryDetail].conversion}%</strong></li>
                                                    <li>• Avg transaction: <strong>${industries[selectedIndustryDetail].avgTransaction}</strong></li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-bold mb-3 text-[#213555] flex items-center gap-2">
                                                    <DollarSign className="w-5 h-5" /> Upsell Opportunities
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {industries[selectedIndustryDetail].upsells.map((u, i) => (
                                                        <span key={i} className="bg-[#E5E9F0] text-[#3E5879] px-3 py-1 rounded-full text-sm font-medium">
                                                            {u}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 bg-[#F5EFE7] p-6 rounded-xl border border-[#D8C4B6]">
                                            <h4 className="font-bold mb-2 text-[#213555] flex items-center gap-2">
                                                🎯 Closing Line
                                            </h4>
                                            <p className="text-gray-800 italic text-lg">"{industries[selectedIndustryDetail].script}"</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Subcomponents for cleaner code
const StatCard = ({ label, value, subtext }: { label: string; value: string; subtext?: string }) => (
    <div className="bg-gradient-to-br from-[#F5EFE7] to-[#D8C4B6] rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
        <div className="text-sm text-gray-600 mb-1 font-medium">{label}</div>
        <div className="text-3xl font-bold text-[#213555]">{value}</div>
        {subtext && <div className="text-xs text-gray-500 mt-1">{subtext}</div>}
    </div>
);

const TabButton = ({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon: React.ReactNode }) => (
    <button
        onClick={onClick}
        className={`
            flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-all duration-200
            ${active
                ? 'border-b-4 border-[#213555] text-[#213555] bg-gray-50'
                : 'border-b-4 border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }
        `}
    >
        {icon}
        {label}
    </button>
);

const InputGroup = ({ label, value, onChange, max, step }: { label: string; value: number; onChange: (val: number) => void; max?: number; step?: number }) => (
    <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">{label}</label>
        <div className="relative">
            <input
                type="number"
                value={value}
                min="0"
                max={max}
                step={step || 1}
                onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                className="w-full p-3 border-2 border-[#D8C4B6] rounded-lg focus:outline-none focus:border-[#3E5879] transition-colors font-mono text-lg"
            />
        </div>
    </div>
);

const ResultRow = ({ label, value, large, highlight }: { label: string; value: string; large?: boolean; highlight?: string }) => (
    <div>
        <div className="text-sm opacity-80">{label}</div>
        <div className={`${large ? 'text-4xl' : 'text-3xl'} font-bold`} style={{ color: highlight }}>{value}</div>
    </div>
);

const ActionItem = ({ text }: { text: string }) => (
    <li className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
        <div className="bg-green-100 text-green-700 p-1 rounded-full">
            <Check className="w-4 h-4" />
        </div>
        <span className="text-gray-700 font-medium">{text}</span>
    </li>
);

export default AIReceptionistDashboard;
