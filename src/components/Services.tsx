import { Search, Building2, MapPin, Briefcase, FileText, Globe, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'pembuatan-pt',
    title: 'Pembuatan PT',
    description: 'Didirikan minimal 2 orang, ada pembagian saham, penamaan minimal 3 kata, modal min. 50juta.',
    icon: Building2,
    color: 'border-blue-100 hover:border-primary',
    tag: 'Badan Usaha'
  },
  {
    id: 'pembuatan-cv',
    title: 'Pembuatan CV',
    description: 'Didirikan oleh 2 orang, nama bisa 1 kata.',
    icon: Building2,
    color: 'border-orange-100 hover:border-secondary',
    tag: 'Badan Usaha'
  },
  {
    id: 'pt-perorangan',
    title: 'Pembuatan PT Perorangan',
    description: 'Didirikan 1 orang, penamaan 3 kata.',
    icon: Building2,
    color: 'border-green-100 hover:border-green-500',
    tag: 'Badan Usaha'
  },
  {
    id: 'pt-pma',
    title: 'Pembuatan PT PMA',
    description: 'Salah satu orang asing, didirikan oleh minimal 2 orang, penamaan minimal 3 kata, modal 10Milyar.',
    icon: Globe,
    color: 'border-purple-100 hover:border-purple-500',
    tag: 'Badan Usaha'
  },
  {
    id: 'yayasan',
    title: 'Pendirian Yayasan',
    description: 'Didirikan 5 orang, penamaan 3 kata.',
    icon: Building2,
    color: 'border-red-100 hover:border-red-500',
    tag: 'Badan Usaha'
  },
  {
    id: 'nib',
    title: 'Pembuatan NIB',
    description: 'Minimal 1 orang, tidak perlu modal.',
    icon: FileText,
    color: 'border-cyan-100 hover:border-cyan-500',
    tag: 'Badan Usaha'
  },
  {
    id: 'tracker',
    title: 'Tracker',
    description: 'Cek proses pembuatan legalitas Anda disini.',
    icon: Search,
    color: 'border-slate-100 hover:border-slate-400',
    tag: 'Utility'
  },
  {
    id: 'kbli',
    title: 'Cek KBLI',
    description: 'Cek bidang usaha anda sesuai KBLI disini.',
    icon: Briefcase,
    color: 'border-slate-100 hover:border-slate-400',
    tag: 'Utility'
  },
  {
    id: 'tdpse',
    title: 'TDPSE',
    description: 'Memiliki PT/CV & website.',
    icon: Globe,
    color: 'border-blue-100 hover:border-primary',
    tag: 'Layanan'
  },
  {
    id: 'hki',
    title: 'Daftar Merek HKI',
    description: 'Pendaftaran merek usaha anda, syarat hanya logo, KTP dan tandatangan.',
    icon: Shield,
    color: 'border-orange-100 hover:border-secondary',
    tag: 'Layanan'
  },
  {
    id: 'virtual-office',
    title: 'Virtual Office',
    description: 'Penyedia virtual Office sebagai pengganti kantor fisik bagi anda yang belum punya kantor.',
    icon: MapPin,
    color: 'border-green-100 hover:border-green-500',
    tag: 'Layanan'
  },
];

export default function Services() {
  return (
    <section id="layanan" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-primary tracking-wider uppercase mb-3">Layanan Kami</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
            Pilih layanan sesuai yang Anda butuhkan
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to={`/layanan/${service.id}`}
              className="block h-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`group p-8 rounded-2xl border-2 bg-white transition-all duration-300 ${service.color} hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col h-full`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <service.icon className="w-6 h-6 text-slate-700" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-slate-100 rounded text-slate-500">
                    {service.tag}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                <span className="text-sm font-bold text-primary inline-flex items-center group-hover:translate-x-2 transition-transform">
                  {service.tag === 'Badan Usaha' ? 'Lihat selengkapnya' : 'Lihat paket'}
                  <FileText className="ml-2 w-4 h-4" />
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
