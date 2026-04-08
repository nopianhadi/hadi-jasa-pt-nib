import { Check, MessageCircle, Zap, Shield, Award } from 'lucide-react';
import { motion } from 'motion/react';

const pricingCategories = [
  {
    title: 'Badan Usaha',
    packages: [
      {
        name: 'Pembuatan PT (Standar)',
        price: '2.900.000',
        originalPrice: '5.000.000',
        features: ['Cek Nama PT', 'SK KEMENHUMKAM', 'Akta Pendirian', 'NIB', 'NPWP Badan'],
        recommended: true
      },
      {
        name: 'Pembuatan CV',
        price: '1.500.000',
        originalPrice: '2.500.000',
        features: ['Akta Notaris', 'SK KEMENHUMKAM', 'NIB', 'NPWP Badan']
      },
      {
        name: 'PT Perorangan',
        price: '1.000.000',
        originalPrice: '2.000.000',
        features: ['Pernyataan Pendirian', 'Sertifikat Kemenkumham', 'NIB', 'NPWP Badan']
      }
    ]
  },
  {
    title: 'Layanan Lainnya',
    packages: [
      {
        name: 'Daftar Merek HKI',
        price: '2.500.000',
        features: ['Pengecekan Merek', 'Pendaftaran Merek', 'Sertifikat HKI', 'Monitoring 1 Tahun']
      },
      {
        name: 'Virtual Office',
        price: '3.500.000',
        features: ['Alamat Bisnis Strategis', 'Layanan Resepsionis', 'Meeting Room 4 Jam/Bulan', 'Mail Handling']
      },
      {
        name: 'TDPSE',
        price: '1.500.000',
        features: ['Pendaftaran PSE Kominfo', 'Sertifikat PSE', 'Panduan Kepatuhan']
      }
    ]
  }
];

export default function Pricing() {
  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block"
          >
            Daftar Harga
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-slate-900 mb-6"
          >
            Investasi Terbaik untuk <br /> <span className="text-primary">Legalitas Bisnis Anda</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Pilih paket layanan yang sesuai dengan skala dan kebutuhan bisnis Anda. Transparan, tanpa biaya tersembunyi.
          </motion.p>
        </div>

        {pricingCategories.map((category, catIdx) => (
          <div key={category.title} className="mb-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-10 flex items-center">
              <span className="w-8 h-1 bg-primary mr-4 rounded-full"></span>
              {category.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.packages.map((pkg, i) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative bg-white rounded-3xl p-8 shadow-sm border-2 transition-all hover:shadow-xl ${pkg.recommended ? 'border-primary' : 'border-transparent'}`}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest flex items-center">
                      <Zap className="w-3 h-3 mr-1 fill-current" />
                      Paling Populer
                    </div>
                  )}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{pkg.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-slate-900">Rp {pkg.price}</span>
                    </div>
                    {pkg.originalPrice && (
                      <p className="text-sm text-slate-400 line-through">Rp {pkg.originalPrice}</p>
                    )}
                  </div>

                  <ul className="space-y-4 mb-10">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://wa.me/6282288060093"
                    className={`w-full flex items-center justify-center py-4 rounded-xl font-bold text-sm transition-all ${pkg.recommended ? 'bg-primary text-white shadow-lg shadow-blue-100' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Pesan Sekarang
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Comparison CTA */}
        <section className="bg-slate-900 rounded-[40px] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 translate-x-1/4" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Butuh Penawaran Khusus?</h2>
              <p className="text-slate-400 text-lg mb-8">
                Kami melayani kebutuhan korporasi besar dengan volume tinggi. Hubungi tim sales kami untuk mendapatkan harga spesial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Garansi 100%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Tim Berpengalaman</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <a 
                href="https://wa.me/6282288060093"
                className="bg-primary hover:bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/20 flex items-center"
              >
                Hubungi Sales Kami
                <MessageCircle className="ml-3 w-6 h-6" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
