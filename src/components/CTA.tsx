import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function CTA() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100"
        >
          <div className="grid md:grid-cols-2">
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Yuk, konsultasikan tentang masalah kamu
              </h3>
              <p className="text-slate-600 mb-8">
                Tim ahli kami siap membantu memberikan solusi legalitas terbaik untuk bisnis Anda. Konsultasi gratis!
              </p>
              <a
                href="https://wa.me/62895406181407"
                id="cta-whatsapp-main"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#25D366] text-white font-bold text-lg shadow-lg shadow-green-100 hover:bg-[#128C7E] transition-all group"
              >
                <MessageCircle className="mr-2 w-6 h-6" />
                Chat Admin Sekarang
              </a>
            </div>
            <div className="relative hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1600880212340-394c5a9a1830?auto=format&fit=crop&w=800&q=80"
                alt="Consultation"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
