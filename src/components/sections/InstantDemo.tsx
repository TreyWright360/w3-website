import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Check, ChevronRight } from 'lucide-react'

interface Industry {
  id: string
  name: string
  icon: string
  emoji: string
  color: string
  audioUrl: string
  duration: string
  features: string[]
  description: string
}

interface InstantDemoProps {
  headline?: string
  subheadline?: string
  industries?: Industry[]
  cta?: {
    headline: string
    description: string
    buttonText: string
  }
  onRequestDemo?: (data: { name: string; phone: string; email: string; businessName: string }) => void
}

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    glow: 'shadow-orange-500/20',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    glow: 'shadow-cyan-500/20',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/20',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    glow: 'shadow-blue-500/20',
  },
  pink: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30',
    text: 'text-pink-400',
    glow: 'shadow-pink-500/20',
  },
  yellow: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    text: 'text-yellow-400',
    glow: 'shadow-yellow-500/20',
  },
}

const defaultIndustries: Industry[] = [
    {
      id: 'restaurant',
      name: 'Restaurants',
      icon: 'UtensilsCrossed',
      emoji: '🍕',
      color: 'orange',
      audioUrl: '/audio/demo-restaurant.mp3',
      duration: '0:45',
      description: 'See how W3 Retain handles dinner rush reservations and to-go orders simultaneously.',
      features: ['Missed Call Text-Back', 'Smart Order Taking', 'Reservations', 'Reviews'],
    },
    {
      id: 'dental',
      name: 'Dental Offices',
      icon: 'Stethoscope',
      emoji: '🦷',
      color: 'cyan',
      audioUrl: '/audio/demo-dental.mp3',
      duration: '1:12',
      description: 'Handle emergency triage, insurance questions, and appointment scheduling 24/7.',
      features: ['Appointment Scheduling', 'Insurance Q&A', 'New Patient Intake', 'Emergency Triage'],
    },
    {
      id: 'realestate',
      name: 'Real Estate',
      icon: 'Home',
      emoji: '🏠',
      color: 'emerald',
      audioUrl: '/audio/demo-realestate.mp3',
      duration: '0:58',
      description: 'Qualify buyer leads, schedule showings, and sync data to your CRM instantly.',
      features: ['Lead Qualification', 'Showing Scheduler', 'Property Info', 'CRM Integration'],
    },
    {
      id: 'hvac',
      name: 'HVAC Services',
      icon: 'Thermometer',
      emoji: '❄️',
      color: 'blue',
      audioUrl: '/audio/demo-hvac.mp3',
      duration: '1:05',
      description: 'Dispatch technicians, quote routine maintenance, and verify service areas automatically.',
      features: ['Emergency Dispatch', 'Service Scheduling', 'Area Verification', 'Quote Requests'],
    },
    {
      id: 'salon',
      name: 'Salons & Spas',
      icon: 'Scissors',
      emoji: '💇‍♀️',
      color: 'pink',
      audioUrl: '/audio/demo-salon.mp3',
      duration: '0:52',
      description: 'Manage stylist calendars, complex service bookings, and rebooking reminders.',
      features: ['Appointment Booking', 'Service Menu', 'Stylist Availability', 'Rebooking'],
    },
    {
      id: 'auto',
      name: 'Auto Repair',
      icon: 'Wrench',
      emoji: '🔧',
      color: 'yellow',
      audioUrl: '/audio/demo-autorepair.mp3',
      duration: '0:48',
      description: 'Schedule diagnostics, provide status updates, and quote standard services.',
      features: ['Service Scheduling', 'Diagnostic Intake', 'Quotes', 'Status Updates'],
    },
]

export function InstantDemo({
  headline = "Hear the Difference",
  subheadline = "Select your industry to hear how W3 agents handle real customer conversations.",
  industries = defaultIndustries,
  cta,
  onRequestDemo,
}: InstantDemoProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const selectedData = industries.find((i) => i.id === selectedIndustry)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0)
      })
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0)
      })
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false)
        setCurrentTime(0)
      })
    }
  }, [selectedIndustry])

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleIndustryClick = (id: string) => {
    if (selectedIndustry === id) {
      setSelectedIndustry(null)
      setIsPlaying(false)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    } else {
      setSelectedIndustry(id)
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {headline}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">{subheadline}</p>
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {industries.map((industry) => {
            const colors = colorMap[industry.color] || colorMap.blue
            const isSelected = selectedIndustry === industry.id

            return (
              <button
                key={industry.id}
                onClick={() => handleIndustryClick(industry.id)}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 text-left ${
                  isSelected
                    ? `${colors.bg} ${colors.border} shadow-lg ${colors.glow}`
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isSelected ? colors.bg : 'bg-slate-800'
                    }`}
                  >
                    <span className="text-2xl">{industry.emoji}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{industry.name}</h3>
                    <p className="text-sm text-slate-500">{industry.duration} demo</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-400 mb-4">{industry.description}</p>

                {/* Features */}
                <ul className="space-y-1.5">
                  {industry.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Check
                        className={`w-4 h-4 ${isSelected ? colors.text : 'text-slate-600'}`}
                        strokeWidth={2.5}
                      />
                      <span className={isSelected ? 'text-slate-200' : 'text-slate-500'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Expand indicator */}
                <div
                  className={`absolute top-6 right-6 transition-transform duration-300 ${
                    isSelected ? 'rotate-90' : ''
                  }`}
                >
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </div>
              </button>
            )
          })}
        </div>

        {/* Audio Player */}
        {selectedData && (
          <div
            className={`rounded-2xl border p-6 mb-8 transition-all duration-500 ${
              colorMap[selectedData.color]?.bg || 'bg-slate-900/50'
            } ${colorMap[selectedData.color]?.border || 'border-slate-800'}`}
          >
            <audio ref={audioRef} src={selectedData.audioUrl} preload="metadata" />

            <div className="flex items-center gap-4">
              {/* Play/Pause Button */}
              <button
                onClick={handlePlayPause}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isPlaying
                    ? 'bg-white text-slate-900'
                    : `${colorMap[selectedData.color]?.bg || 'bg-indigo-500/20'} text-white hover:scale-105`
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" fill="currentColor" />
                ) : (
                  <Play className="w-6 h-6 ml-1" fill="currentColor" />
                )}
              </button>

              {/* Waveform / Progress */}
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                  <span>{selectedData.name} Demo Call</span>
                  <span>
                    {formatTime(currentTime)} / {formatTime(duration || 0)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full transition-all duration-100 ${
                      colorMap[selectedData.color]?.text.replace('text-', 'bg-') ||
                      'bg-indigo-500'
                    }`}
                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                {/* Waveform visualization (static representation) */}
                <div className="flex items-center justify-center gap-0.5 mt-3 h-8">
                  {Array.from({ length: 50 }).map((_, i) => {
                    const height = Math.sin(i * 0.3) * 50 + Math.random() * 30 + 20
                    const isActive = (i / 50) * 100 < (currentTime / (duration || 1)) * 100
                    return (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all duration-75 ${
                          isActive
                            ? colorMap[selectedData.color]?.text.replace('text-', 'bg-') ||
                              'bg-indigo-500'
                            : 'bg-slate-700'
                        } ${isPlaying && isActive ? 'animate-pulse' : ''}`}
                        style={{ height: `${height}%` }}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        {cta && (
          <div className="text-center bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-2">{cta.headline}</h3>
            <p className="text-slate-400 mb-6">{cta.description}</p>
            <button
              onClick={() =>
                onRequestDemo?.({
                  name: '',
                  phone: '',
                  email: '',
                  businessName: '',
                })
              }
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-violet-600 transition-all hover:scale-105 shadow-lg shadow-indigo-500/25"
            >
              {cta.buttonText}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
