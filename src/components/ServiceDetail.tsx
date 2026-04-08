import { useEffect, useState } from 'react';
import { Check, MessageCircle, Shield, Award, Headphones, Star, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';

interface ServiceDetailProps {
  title: string;
  onBack: () => void;
  showBackButton?: boolean;
}

const serviceData: Record<string, any> = {
  'Pembuatan PT': {
    tagline: '#AntiRibet',
    subtitle: 'Melayani di Seluruh Indonesia. Termurah dan Tercepat (3 Hari Jadi).',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    reasons: [
      { id: 1, title: 'Perlindungan Hukum dan Keuangan', desc: 'Membentuk badan usaha memberikan pemisahan antara aset bisnis and aset pribadi. Dengan ini, Anda melindungi keuangan pribadi Anda dari potensi risiko atau tuntutan hukum terhadap bisnis.' },
      { id: 2, title: 'Kredibilitas yang Lebih Tinggi', desc: 'Bisnis dengan legalitas PT terlihat lebih profesional dan terpercaya di mata klien, vendor, dan mitra bisnis.' },
      { id: 3, title: 'Akses ke Modal', desc: 'PT memudahkan Anda untuk mendapatkan pendanaan dari bank atau investor karena struktur kepemilikan saham yang jelas.' },
      { id: 4, title: 'Kepemilikan dan Pengelolaan yang Jelas', desc: 'Pembagian saham dan peran pengurus (Direksi/Komisaris) diatur secara formal dalam akta pendirian.' },
      { id: 5, title: 'Kemudahan dalam Transaksi Bisnis', desc: 'Memiliki NPWP badan dan NIB memudahkan proses kontrak kerja sama dan tender dengan perusahaan besar atau pemerintah.' },
    ],
    packages: [
      { 
        name: 'STANDAR', 
        price: '2.900.000', 
        originalPrice: '5.000.000', 
        time: '3 Hari Kerja', 
        features: [
          'Cek dan Pesan Nama PT', 'SK KEMENHUMKAM', 'Akta Pendirian', 'Dokumen Fisik', 
          'NPWP & SKT Pajak Badan', 'Akun OSS & Gmail', 'NIB', 'Sertifikat Standar (KBLI Tertentu)', 
          'Pernyataan UMK Terkait Tata Ruang', 'SPPL (Resiko Rendah)', 'Bonus Pembukaan Rekening Perusahaan'
        ] 
      },
      { 
        name: 'PREMIUM', 
        price: '3.900.000', 
        originalPrice: '7.000.000', 
        time: '6 - 10 Hari kerja', 
        features: [
          'Semua Fitur Standar', 'Company Profile (Maks.8 Halaman)', 'Desain Kop Surat Ms. Word', 
          'Desain Kartu Nama', 'Bonus Desain Logo Perusahaan'
        ],
        recommended: true
      },
      { 
        name: 'PRO', 
        price: '4.400.000', 
        originalPrice: '8.000.000', 
        time: '3 Hari Kerja', 
        features: [
          'Semua Fitur Premium', 'Bonus Template Lapor Keuangan', 'Bonus Template Perjanjian Kerjasama'
        ],
        recommended: true
      },
      { 
        name: 'ENTERPRISE', 
        price: '4.900.000', 
        originalPrice: '9.000.000', 
        time: '3 Hari Kerja', 
        features: [
          'Semua Fitur PRO', 'Konsultasi Bisnis Eksklusif', 'Pendampingan Laporan LKPM', 'Full Support 1 Tahun'
        ] 
      },
    ]
  },
  'Pembuatan CV': {
    tagline: '#ProsesCepat',
    subtitle: 'Solusi pendirian CV untuk UMKM dengan proses yang sangat ringkas.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    reasons: [
      { id: 1, title: 'Biaya Lebih Murah', desc: 'Biaya pendirian CV jauh lebih terjangkau dibandingkan PT.' },
      { id: 2, title: 'Nama Lebih Fleksibel', desc: 'Bisa menggunakan 1 kata saja untuk nama perusahaan.' },
      { id: 3, title: 'Pengambilan Keputusan Cepat', desc: 'Struktur organisasi lebih sederhana memudahkan operasional.' },
    ],
    packages: [
      { name: 'CV BASIC', price: '1.500.000', originalPrice: '2.500.000', time: '3 Hari Kerja', features: ['Akta Notaris', 'SK KEMENHUMKAM', 'NIB', 'NPWP Badan'] },
      { name: 'CV COMPLETE', price: '2.500.000', originalPrice: '4.000.000', time: '3 Hari Kerja', features: ['Semua Fitur Basic', 'Stempel Perusahaan', 'Company Profile'], recommended: true },
    ]
  },
};

const Skeleton = () => (
  <div className="animate-pulse space-y-8">
    <div className="bg-slate-50 border-b border-slate-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-4">
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
            <div className="h-12 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            <div className="flex gap-4">
              <div className="h-10 bg-slate-200 rounded-full w-32"></div>
              <div className="h-10 bg-slate-200 rounded-full w-32"></div>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="h-[400px] bg-slate-200 rounded-3xl w-full"></div>
          </div>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-slate-100 rounded-2xl"></div>
        ))}
      </div>
    </div>
  </div>
);

export default function ServiceDetail({ title, onBack, showBackButton = true }: ServiceDetailProps) {
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState<any>(null);

  useEffect(() => {
    async function fetchServiceData() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('title', title)
          .maybeSingle();

        if (error) {
          console.error('Error fetching from Supabase:', error);
        } else if (data) {
          setFetchedData(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        // Add a small delay for the skeleton effect
        setTimeout(() => setLoading(false), 800);
      }
    }

    fetchServiceData();
  }, [title]);

  const data = fetchedData || serviceData[title] || {
    tagline: '#LegalYu',
    subtitle: `Layanan profesional untuk ${title}. Hubungi kami untuk detail lebih lanjut.`,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80',
    reasons: [
      { id: 1, title: 'Proses Profesional', desc: 'Kami menangani setiap dokumen dengan ketelitian tinggi.' },
      { id: 2, title: 'Keamanan Data', desc: 'Data Anda aman dan terlindungi bersama kami.' },
    ],
    packages: [
      { name: 'PAKET HEMAT', price: 'Hubungi Kami', originalPrice: '-', time: 'Sesuai Kebutuhan', features: ['Konsultasi Gratis', 'Pengurusan Dokumen', 'Support 24/7'] }
    ]
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      {showBackButton && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={onBack}
            className="inline-flex items-center text-primary font-bold hover:underline mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </button>
        </div>
      )}

      {loading ? (
        <Skeleton />
      ) : (
        <>
          {/* Header Detail */}
          <section className="pb-20 bg-slate-50 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">{data.tagline}</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{title}</h2>
                  <p className="text-lg text-slate-600 mb-8">
                    {data.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-2" />
                      <span className="text-sm font-bold">Terpercaya</span>
                    </div>
                    <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                      <Shield className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm font-bold">Garansi Layanan</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <img 
                    src={data.image} 
                    alt={title} 
                    className="rounded-3xl shadow-2xl w-full h-auto object-cover max-h-[400px]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Kelebihan */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-3xl font-bold text-center text-slate-900 mb-16">
                Kelebihan {title} di LegalYu
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: 'Konsultasi Gratis Pra & Pasca', icon: Headphones, color: 'bg-blue-50 text-blue-600' },
                  { title: 'Berpengalaman', icon: Award, color: 'bg-orange-50 text-orange-600' },
                  { title: 'Garansi Layanan', icon: Shield, color: 'bg-green-50 text-green-600' },
                ].map((item, i) => (
                  <div key={i} className="text-center p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                    <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mx-auto mb-6`}>
                      <item.icon className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">{item.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Alasan Penting */}
          <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 translate-x-1/4" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-12">
                    Kenapa Memilih Layanan Kami?
                  </h3>
                  <div className="space-y-6">
                    {data.reasons.map((reason: any) => (
                      <div key={reason.id} className="flex gap-6 group">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center font-bold text-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                          {reason.id}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">{reason.title}</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">{reason.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
                  <p className="text-lg text-slate-300 leading-relaxed italic">
                    "Kami berkomitmen memberikan kemudahan bagi setiap pengusaha untuk melegalkan bisnis mereka tanpa ribet. Keamanan dan kepuasan Anda adalah prioritas utama kami."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Media Coverage */}
          <section className="py-12 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Lebih dari 5+ media telah meliput kami</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
                <div className="text-xl font-black text-slate-900">METRO<span className="text-primary">TV</span></div>
                <div className="text-xl font-black text-slate-900">KOMPAS</div>
                <div className="text-xl font-black text-slate-900">DETIK<span className="text-primary">COM</span></div>
                <div className="text-xl font-black text-slate-900">TRIBUN</div>
                <div className="text-xl font-black text-slate-900">KUMPARAN</div>
              </div>
            </div>
          </section>

          {/* Pricing Packages */}
          <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Paket {title}</h3>
                <p className="text-slate-600">Pilih paket yang paling sesuai dengan kebutuhan bisnis Anda</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                {data.packages.map((pkg: any, i: number) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative bg-white rounded-3xl p-8 shadow-sm border-2 transition-all hover:shadow-xl ${pkg.recommended ? 'border-primary' : 'border-transparent'}`}
                  >
                    {pkg.recommended && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                        Recommended
                      </div>
                    )}
                    <div className="mb-8">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{pkg.name}</h4>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-slate-900">Rp {pkg.price}</span>
                      </div>
                      {pkg.originalPrice !== '-' && <p className="text-xs text-slate-400 line-through">Rp {pkg.originalPrice}</p>}
                      <div className="mt-4 inline-block px-3 py-1 bg-blue-50 text-primary text-[10px] font-bold rounded-full">
                        {pkg.time}
                      </div>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {pkg.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-xs text-slate-600">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="https://wa.me/62895406181407"
                      className={`w-full flex items-center justify-center py-4 rounded-xl font-bold text-sm transition-all ${pkg.recommended ? 'bg-primary text-white shadow-lg shadow-blue-100' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Konsultasikan Sekarang
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
