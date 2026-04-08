import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube, MessageCircle, Send, Loader2 } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Contact Info */}
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block"
            >
              Hubungi Kami
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-slate-900 mb-8"
            >
              Ada Pertanyaan? <br /> <span className="text-primary">Kami Siap Membantu</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 mb-12 max-w-lg"
            >
              Tim ahli kami siap memberikan konsultasi gratis untuk kebutuhan legalitas usaha Anda. Hubungi kami melalui saluran berikut.
            </motion.p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Alamat Kantor</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Jl. Raya Legalitas No. 123, <br />
                    Kec. Kreatif, Kota Jakarta Selatan, <br />
                    DKI Jakarta 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-secondary group-hover:text-white transition-all">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Telepon & WhatsApp</h3>
                  <p className="text-slate-600 leading-relaxed">
                    +62 895 4061 81407 <br />
                    +62 21 1234 5678
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 group-hover:text-white transition-all">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Email</h3>
                  <p className="text-slate-600 leading-relaxed">
                    halo@legalyu.id <br />
                    support@legalyu.id
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Ikuti Kami</h4>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-50 p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-xl"
          >
            {submitted ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Pesan Terkirim!</h2>
                <p className="text-slate-600 mb-8">Terima kasih telah menghubungi kami. Tim kami akan segera merespons pesan Anda dalam waktu 1x24 jam.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-primary font-bold hover:underline"
                >
                  Kirim pesan lainnya
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Kirim Pesan</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                        placeholder="Masukkan nama Anda"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                      <input 
                        type="email" 
                        required
                        className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                        placeholder="email@perusahaan.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Layanan yang Dibutuhkan</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all">
                      <option>Pilih Layanan</option>
                      <option>Pembuatan PT</option>
                      <option>Pembuatan CV</option>
                      <option>Daftar Merek HKI</option>
                      <option>Virtual Office</option>
                      <option>Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Pesan Anda</label>
                    <textarea 
                      rows={4}
                      required
                      className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                      placeholder="Tuliskan detail pertanyaan Anda di sini..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        Kirim Pesan Sekarang
                        <Send className="ml-3 w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-32 rounded-[40px] overflow-hidden h-[500px] bg-slate-100 relative border border-slate-200 shadow-inner">
          <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-400">
            <MapPin className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-xl font-bold opacity-20 tracking-widest uppercase">Google Maps Location</p>
          </div>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.2413554167!2d106.789155!3d-6.229728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1712212345678!5m2!1sid!2sid" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale contrast-125 opacity-80"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
