import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const articles = [
  {
    title: 'Jasa Legalitas PMA untuk Investor: Memulai Bisnis Anda dengan Mudah',
    excerpt: 'Mendirikan perusahaan di Indonesia membutuhkan lebih dari sekadar modal. Proses legalitas menjadi salah satu aspek terpenting...',
    date: '19 Juni 2025',
    image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e787?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Apa Itu Legalitas Yayasan dan Fungsinya? Kunci Keberhasilan Organisasi',
    excerpt: 'Legalitas yayasan memberikan status hukum yang memungkinkan yayasan menjalankan berbagai kegiatan sosial dengan landasan yang jelas...',
    date: '19 Juni 2025',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Mengapa Jasa Perizinan Usaha Bidang Kesehatan Sangat Dibutuhkan?',
    excerpt: 'Setiap tahun, sektor kesehatan di Indonesia semakin berkembang pesat. Namun ada satu masalah yang sering menghambat: perizinan...',
    date: '19 Juni 2025',
    image: 'https://images.unsplash.com/photo-1505751172107-5739a00723a5?auto=format&fit=crop&w=600&q=80',
  },
];

export default function Articles() {
  return (
    <section id="artikel" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-sm font-bold text-primary tracking-wider uppercase mb-3">Artikel</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
              Selalu update dengan berita mengenai legalitas
            </h3>
          </div>
          <button className="hidden md:flex items-center text-primary font-bold hover:underline">
            Lihat Semua Artikel
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {article.date}
                </div>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <span className="text-sm font-bold text-primary inline-flex items-center">
                Baca Selengkapnya
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 md:hidden">
          <button className="w-full py-4 border-2 border-primary text-primary font-bold rounded-xl">
            Lihat Semua Artikel
          </button>
        </div>
      </div>
    </section>
  );
}
