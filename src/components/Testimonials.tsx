import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  {
    name: 'Ahmad Abdul Aziz',
    time: '2 bulan lalu',
    content: 'Pelayanan sangat cepat, admin cepat tanggap bikin PT di LEGAL KREATIF hitungan jam gak nunggu lama. Sukses buat LEGAL KREATIF',
    rating: 5,
  },
  {
    name: 'Annisa Seffiliya',
    time: '8 bulan lalu',
    content: 'Super helpful, bisa mejelaskan dengan baik. Ga nyangka bisa secepat ini dan sesimpel ini bikin PT; hanya semalam jadi. Recommended. 👏 👏',
    rating: 5,
  },
  {
    name: 'Aspirin area',
    time: '4 bulan lalu',
    content: 'Sangat responsif.. jawabnya bukan hitungan jam tapi detik.. udah kayak chat ama pasangan aja.. cepet banget balesnya.. recommended !!!',
    rating: 5,
  },
  {
    name: 'Auto klin Salon mobil',
    time: '6 bulan lalu',
    content: 'Thankyou Legal Kreatif, ngurus disini ngga pake ribet dan ngga pake lama. Ngga pake hitungan hari, berkas² beres semua. Sukses terus.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-primary tracking-wider uppercase mb-3">Testimoni</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Kata Mereka Mengenai Kami
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-slate-600 font-medium">5.0 rating dari 108 ulasan Google</span>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" 
              alt="Google Logo" 
              className="h-8 opacity-50"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary font-bold">
                  {item.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-500">{item.time}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="relative flex-grow">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-slate-50 opacity-50" />
                <p className="text-sm text-slate-600 leading-relaxed relative z-10">
                  {item.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="text-primary font-bold hover:underline">
            Lihat semua ulasan di Google
          </button>
        </div>
      </div>
    </section>
  );
}
