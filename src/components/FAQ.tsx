import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: 'Bagaimana Ketentuan Penggunaan Nama PT?',
    answer: 'Penggunaan nama PT harus terdiri dari minimal 3 kata dalam bahasa Indonesia, tidak boleh menggunakan angka atau karakter khusus, dan harus unik (belum digunakan oleh PT lain).',
  },
  {
    question: 'Kenapa Nama PT ada 2 Nama?',
    answer: 'Biasanya merujuk pada Nama Resmi (sesuai Akta) dan Nama Dagang/Brand. Namun secara legalitas yang didaftarkan adalah nama resmi yang terdiri dari 3 kata.',
  },
  {
    question: 'Apa Saja Syarat Mendirikan PT?',
    answer: 'Syarat utama meliputi: Minimal 2 pendiri (pemegang saham), KTP & NPWP pengurus, alamat kantor yang jelas, dan penentuan modal dasar serta susunan pengurus (Direktur & Komisaris).',
  },
  {
    question: 'Berapa modal minimal dan maksimal untuk pendirian PT?',
    answer: 'Berdasarkan UU Cipta Kerja, modal minimal ditentukan berdasarkan kesepakatan para pendiri. Namun untuk klasifikasi tertentu (seperti PMA), ada ketentuan modal minimal khusus (misal 10 Milyar untuk PMA).',
  },
  {
    question: 'Saya Memiliki Perusahaan Beroperasional di Daerah, Tetapi Saya Berhari-hari Berbisnis Di Jakarta, Bisakan Saya Memiliki Rekening Perusahaan di Jakarta?',
    answer: 'Bisa. Rekening perusahaan dapat dibuka di cabang bank mana saja di Indonesia selama dokumen legalitas (NIB, Akta, SK) sudah lengkap dan valid.',
  },
  {
    question: 'Apa Perbedaan PT Dan CV?',
    answer: 'PT adalah badan hukum dengan pemisahan aset pribadi dan perusahaan, sedangkan CV bukan badan hukum (aset pribadi dan perusahaan bisa bercampur dalam hal tanggung jawab hukum). PT minimal 3 kata, CV bisa 1 kata.',
  },
  {
    question: 'Bolehkah Suami Istri Mendirikan PT?',
    answer: 'Boleh, namun jika tidak ada perjanjian pisah harta, maka dianggap sebagai satu subjek hukum. Disarankan ada pihak ketiga atau memiliki perjanjian pisah harta agar syarat minimal 2 orang terpenuhi.',
  },
  {
    question: 'Berapakah Minimal Pengurus PT?',
    answer: 'Minimal terdiri dari 1 orang Direktur dan 1 orang Komisaris.',
  },
  {
    question: 'Bagaimana Kententuan Penggunaan Nama CV?',
    answer: 'Nama CV lebih fleksibel dibandingkan PT, bisa menggunakan 1 kata saja dan tidak ada kewajiban menggunakan bahasa Indonesia secara ketat.',
  },
  {
    question: 'Kenapa Ada Yang Memilih CV Daripada PT?',
    answer: 'Biasanya karena prosesnya lebih simpel, biaya lebih murah, dan tidak ada ketentuan modal minimal yang ketat seperti pada PT klasifikasi tertentu.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-primary tracking-wider uppercase mb-3">FAQ</h2>
          <h3 className="text-3xl font-bold text-slate-900">Frequently Asked Question</h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-800">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
