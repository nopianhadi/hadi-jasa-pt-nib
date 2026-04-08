import { Search, Loader2 } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';

export default function TrackingSection() {
  const [resi, setResi] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!resi) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <section id="tracker" className="py-20 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h3 className="text-white text-3xl md:text-4xl font-bold mb-6">
            Pantau Progress Perizinan dengan Fitur <br />
            <span className="text-secondary">Lacak Perizinan</span>
          </h3>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Fitur Lacak Perizinan berfungsi untuk memantau proses pembuatan izin usaha kamu. 
            cukup memasukkan nomor resi, kamu sudah bisa melacak proses pembuatan izin usahamu hingga selesai #AntiRibet!
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-2"
        >
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={resi}
              onChange={(e) => setResi(e.target.value)}
              placeholder="Masukkan nomor resi perizinan Anda..."
              className="block w-full pl-12 pr-4 py-4 border-transparent focus:ring-0 text-slate-900 placeholder-slate-400 text-lg rounded-xl"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-secondary hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center min-w-[160px]"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              'Lacak Sekarang'
            )}
          </button>
        </motion.div>
        
        <div className="mt-8 flex justify-center space-x-8 text-blue-100 text-sm font-medium">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2" />
            Real-time Update
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2" />
            Aman & Terpercaya
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2" />
            24/7 Akses
          </div>
        </div>
      </div>
    </section>
  );
}
