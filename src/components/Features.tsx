import { ShieldCheck, Award, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    title: 'Garansi Pelayanan',
    description: 'Kami memberikan garansi pelayanan terbaik dari tim serta data pribadi klien akan terlindungi dari penyalahgunaan.',
    icon: ShieldCheck,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Berpengalaman',
    description: 'Tim kami merupakan praktisi berpengalaman dan profesional dalam bidang legalitas usaha serta hukum.',
    icon: Award,
    color: 'bg-orange-50 text-orange-600',
  },
  {
    title: 'Chat Responsif',
    description: 'Customer Service kami terlatih untuk merespon cepat dan menjawab pertanyaan serta masalah klien dengan baik.',
    icon: MessageSquare,
    color: 'bg-green-50 text-green-600',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-primary tracking-wider uppercase mb-3">Kelebihan</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
            Alasan kenapa Anda harus memilih Legal Kreatif?
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h4>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-primary rounded-3xl text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <h4 className="text-2xl md:text-3xl font-bold mb-4">
            “ Pendirian Perusahaan Selesai Hanya Dalam Waktu 6 jam, Pertama Di Indonesia “
          </h4>
          <p className="text-blue-200 text-sm">*Syarat dan Ketentuan Berlaku</p>
        </motion.div>
      </div>
    </section>
  );
}
