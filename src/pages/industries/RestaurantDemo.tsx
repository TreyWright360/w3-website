import { IndustryPageTemplate } from '../../components/industries/IndustryPageTemplate';
import { PhoneOff, TrendingUp, MessageSquare, ShieldCheck } from 'lucide-react';

export function RestaurantDemo() {
    return (
        <IndustryPageTemplate
            title="Stop Losing $5,000/Month on Missed Calls"
            subtitle="Your hostess is overwhelmed. The phone is ringing. 43% of callers hang up. We fix this instantly with AI that acts like your best employee."
            painPoints={[
                {
                    title: "The Dinner Rush Black Hole",
                    description: "Between 6 PM and 8 PM, your staff is seating guests and running food. They physically cannot answer the phone. That's 20+ missed covers a night.",
                    stat: "43% Missed Calls"
                },
                {
                    title: "The 'Hold' Time Kille",
                    description: "Average hold time on Friday night is 4 minutes. 60% of callers hang up after 90 seconds and call your competitor.",
                    stat: "$200/Day Lost"
                },
                {
                    title: "Zero Upsells",
                    description: "Stressed staff process orders quickly. They forget to ask 'Do you want garlic bread?' our AI asks every single time.",
                    stat: "15% Lower Tickets"
                }
            ]}
            solutionFeatures={[
                {
                    icon: PhoneOff,
                    title: "Instant Zero-Hold Answering",
                    description: "The AI answers immediately, 24/7. Even if 10 people call at once. No more busy signals."
                },
                {
                    icon: TrendingUp,
                    title: "Smart Upselling Engine",
                    description: "Programmable upselling. 'Would you like to add a bottle of wine to that reservation?' Increases check average by 18%."
                },
                {
                    icon: MessageSquare,
                    title: "SMS Text-Back Integration",
                    description: "Caller wants a menu? The AI texts it to them instantly. Caller wants to book online? Link sent."
                },
                {
                    icon: ShieldCheck,
                    title: "Reservation Integration",
                    description: "Connects directly to OpenTable, Resy, or Toast. No double bookings. No manual entry."
                }
            ]}
            demoConfig={{
                agentName: "Elena",
                audioSrc: "/assets/audio/restaurant_demo.mp3"
            }}
            roiStats={[
                { value: "$6,200", label: "Monthly Revenue Recaptured" },
                { value: "0", label: "Missed Calls" },
                { value: "18%", label: "Increase in Ticket Size" }
            ]}
        />
    );
}
