import { IndustryPageTemplate } from '../../components/industries/IndustryPageTemplate';
import { Siren, FileCheck, CalendarClock, Activity } from 'lucide-react';

export function DentalDemo() {
    return (
        <IndustryPageTemplate
            title="Missed Calls Cost You $1,000 Each"
            subtitle="Your front desk is drowning in insurance verification. Phones are ringing. You're losing $150k/year in new patient lifetime value. We fix it."
            painPoints={[
                {
                    title: "Insurance Verification Fatigue",
                    description: "Staff spend 4 hours/day on hold with insurance. While they wait, the phone rings for new patients. They can't answer both.",
                    stat: "30% Missed Calls"
                },
                {
                    title: "The Triage Gap",
                    description: "An untrained receptionist might schedule a severe abscess for next week. That's a medical risk and a lost patient.",
                    stat: "$1,500 Risk"
                },
                {
                    title: "After-Hours Emergencies",
                    description: "You hate 2 AM calls. But if you don't answer, that emergency patient goes to the corporate chain down the street.",
                    stat: "65% Lost Revenue"
                }
            ]}
            solutionFeatures={[
                {
                    icon: Siren,
                    title: "Clinical Triage Scripts",
                    description: "AI asks: 'Is there swelling? On a scale of 1-10?' It knows the difference between a chipped tooth and an abscess."
                },
                {
                    icon: FileCheck,
                    title: "Pre-Call Insurance Capture",
                    description: "AI collects Member ID & Group Number during the call. Your staff gets a clean transcript to verify offline."
                },
                {
                    icon: CalendarClock,
                    title: "24/7 Emergency Line",
                    description: "Filters calls. True emergency? Patches to Dr. cell. Non-urgent? Schedules for 8 AM. Sleep soundly."
                },
                {
                    icon: Activity,
                    title: "New Patient Intake",
                    description: "Captures demographics and primary complaint instantly. Syncs to your dashboard."
                }
            ]}
            demoConfig={{
                agentName: "Sarah",
                audioSrc: "/assets/audio/dental_demo.mp3"
            }}
            roiStats={[
                { value: "$12,500", label: "Recovered New Patient Revenue" },
                { value: "100%", label: "Emergency Call Capture" },
                { value: "0", label: "Minutes on Hold" }
            ]}
        />
    );
}
