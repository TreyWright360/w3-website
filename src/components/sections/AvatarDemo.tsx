import { Play, Mic, Video } from 'lucide-react';

export function AvatarDemo() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[--primary] rounded-full mix-blend-multiply filter blur-[150px] opacity-10 animate-pulse" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Meet <span className="gradient-text">Kai.</span>
        </h2>
        <p className="text-[--text-secondary] text-lg max-w-2xl mx-auto mb-12">
           The world's first streaming video concierge. He can demo products, guide website visitors, and close deals face-to-face.
        </p>

        <div className="max-w-3xl mx-auto relative rounded-3xl overflow-hidden border border-[--border-default] shadow-2xl bg-black aspect-video group cursor-pointer">
             {/* Placeholder for HeyGen Streaming API */}
             <div className="absolute inset-0 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2680&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:opacity-40 transition-opacity duration-500">
             </div>

             <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                     <Play className="w-8 h-8 text-white fill-white ml-1" />
                 </div>
                 <p className="mt-4 font-medium text-lg tracking-wide">Start Interactive Session</p>
             </div>

             <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 p-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 translate-y-20 group-hover:translate-y-0 transition-transform duration-300">
                 <div className="p-3 bg-[--primary]/20 rounded-full">
                     <Mic className="w-5 h-5 text-[--primary]" />
                 </div>
                 <input 
                    type="text" 
                    placeholder="Ask Kai anything..." 
                    className="flex-1 bg-transparent border-none text-white placeholder-white/50 focus:outline-none"
                    disabled
                 />
                 <div className="flex gap-2">
                     <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                         <Video className="w-4 h-4 text-red-500" />
                     </div>
                 </div>
             </div>
        </div>
        
        <p className="mt-6 text-sm text-[--text-secondary] opacity-60">
            Powered by Gemini 2.0 Flash & HeyGen Streaming API
        </p>
      </div>
    </section>
  );
}
