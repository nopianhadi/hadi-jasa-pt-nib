import { motion } from 'motion/react';

export default function Clients() {
  // Mock client logos using placeholders
  const clientLogos = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-slate-500 font-medium">
            Lebih dari <span className="text-primary font-bold">2000++</span> perusahaan puas dengan layanan kami
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex space-x-12 items-center whitespace-nowrap"
          >
            {[...clientLogos, ...clientLogos].map((id, index) => (
              <div key={index} className="flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                <div className="h-12 w-32 bg-slate-100 rounded flex items-center justify-center font-bold text-slate-400 text-xs uppercase tracking-widest">
                  Client Logo {id}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
