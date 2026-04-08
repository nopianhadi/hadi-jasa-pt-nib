import { motion } from 'motion/react';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-1/2 h-1/2 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-1/2 h-1/2 bg-orange-50 rounded-full blur-3xl -z-10 opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-primary text-sm font-semibold mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
              Legal Service Terpercaya
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              LegalYu, Solusi Terbaik <span className="text-primary">Pengurusan Perizinan</span> Usahamu
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg">
              Kami siap membantu kamu dalam pengurusan Perizinan Usaha dengan Proses Mudah, Aman, dan Menyenangkan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-900 transition-all group">
                Selengkapnya
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center space-x-4 px-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                      src={`https://i.pravatar.cc/150?u=${i}`}
                      alt="User avatar"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold text-slate-900">2000+ Klien</p>
                  <p className="text-slate-500 text-xs">Telah mempercayakan kami</p>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="flex items-center text-slate-600 text-sm">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                Proses 6 Jam Selesai*
              </div>
              <div className="flex items-center text-slate-600 text-sm">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                Garansi Pelayanan
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
                alt="Legal team working"
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-xl shadow-xl max-w-[200px]"
            >
              <div className="flex items-center mb-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-orange-500" />
                </div>
                <span className="ml-3 font-bold text-slate-900">Verified</span>
              </div>
              <p className="text-xs text-slate-500">Izin usaha resmi & terdaftar di sistem OSS.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
