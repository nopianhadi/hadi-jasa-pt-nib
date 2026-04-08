import { useEffect, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  FileText, 
  Clock, 
  Settings, 
  User, 
  LogOut, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Pencil, 
  Trash2, 
  X,
  Briefcase,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Service {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  features: string[];
  isPopular?: boolean;
  category: 'Badan Usaha' | 'Layanan Lainnya';
}

const INITIAL_SERVICES: Service[] = [
  {
    id: '1',
    name: 'Pembuatan PT (Standar)',
    price: 'Rp 2.900.000',
    originalPrice: 'Rp 5.000.000',
    features: ['Cek Nama PT', 'SK KEMENHUMKAM', 'Akta Pendirian', 'NIB', 'NPWP Badan'],
    isPopular: true,
    category: 'Badan Usaha'
  },
  {
    id: '2',
    name: 'Pembuatan CV',
    price: 'Rp 1.500.000',
    originalPrice: 'Rp 2.500.000',
    features: ['Akta Notaris', 'SK KEMENHUMKAM', 'NIB', 'NPWP Badan'],
    category: 'Badan Usaha'
  },
  {
    id: '3',
    name: 'PT Perorangan',
    price: 'Rp 1.000.000',
    originalPrice: 'Rp 2.000.000',
    features: ['Pernyataan Pendirian', 'Sertifikat Kemenkumham', 'NIB', 'NPWP Badan'],
    category: 'Badan Usaha'
  },
  {
    id: '4',
    name: 'Daftar Merek HKI',
    price: 'Rp 2.500.000',
    features: ['Pengecekan Merek', 'Pendaftaran Merek', 'Sertifikat HKI', 'Monitoring 1 Tahun'],
    category: 'Layanan Lainnya'
  },
  {
    id: '5',
    name: 'Virtual Office',
    price: 'Rp 3.500.000',
    features: ['Alamat Bisnis Strategis', 'Layanan Resepsionis', 'Meeting Room 4 Jam/Bulan', 'Mail Handling'],
    category: 'Layanan Lainnya'
  },
  {
    id: '6',
    name: 'TDPSE',
    price: 'Rp 1.500.000',
    features: ['Pendaftaran PSE Kominfo', 'Sertifikat PSE', 'Panduan Kepatuhan'],
    category: 'Layanan Lainnya'
  }
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('Ringkasan');
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    price: '',
    originalPrice: '',
    features: [],
    isPopular: false,
    category: 'Badan Usaha'
  });
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const openAddModal = () => {
    setEditingService(null);
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      features: [],
      isPopular: false,
      category: 'Badan Usaha'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setFormData({ ...service });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus layanan ini?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...s, ...formData } as Service : s));
    } else {
      const newService: Service = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
      } as Service;
      setServices([...services, newService]);
    }
    setIsModalOpen(false);
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: (formData.features || []).filter((_, i) => i !== index)
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const getServiceSlug = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('pt (standar)')) return 'pembuatan-pt';
    if (lowerName.includes('cv')) return 'pembuatan-cv';
    if (lowerName.includes('pt perorangan')) return 'pt-perorangan';
    if (lowerName.includes('merek')) return 'hki';
    if (lowerName.includes('virtual office')) return 'virtual-office';
    if (lowerName.includes('tdpse')) return 'tdpse';
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Ringkasan':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Izin', value: '2', color: 'bg-blue-500' },
                { label: 'Dalam Proses', value: '1', color: 'bg-amber-500' },
                { label: 'Selesai', value: '1', color: 'bg-green-500' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <h4 className="text-3xl font-bold text-slate-900">{stat.value}</h4>
                    <div className={`w-2 h-8 rounded-full ${stat.color}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50">
                <h3 className="text-xl font-bold text-slate-900">Progres Perizinan Terbaru</h3>
              </div>
              <div className="p-8">
                <div className="space-y-8">
                  {[
                    { 
                      title: 'Pendirian PT Maju Bersama', 
                      status: 'Dalam Proses', 
                      step: 'Verifikasi Dokumen', 
                      date: '7 Apr 2026',
                      icon: Clock,
                      color: 'text-amber-500',
                      bg: 'bg-amber-50'
                    },
                    { 
                      title: 'Pendaftaran Merek "LegalYu"', 
                      status: 'Selesai', 
                      step: 'Sertifikat Terbit', 
                      date: '4 Apr 2026',
                      icon: CheckCircle,
                      color: 'text-green-500',
                      bg: 'bg-green-50'
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-6">
                      <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} flex-shrink-0`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
                          <h4 className="font-bold text-slate-900">{item.title}</h4>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-bold px-2 py-1 rounded-md ${item.bg} ${item.color}`}>
                            {item.status}
                          </span>
                          <span className="text-sm text-slate-500">{item.step}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-8 rounded-[40px] border border-primary/10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Butuh Bantuan?</h3>
                <p className="text-slate-600">Tim ahli kami siap membantu Anda menyelesaikan kendala perizinan bisnis Anda kapan saja.</p>
              </div>
              <button className="px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all">
                Hubungi Konsultan
              </button>
            </div>
          </div>
        );
      case 'Kelola Layanan':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Kelola Layanan</h2>
                <p className="text-slate-500">Tambah, edit, atau hapus paket layanan Anda</p>
              </div>
              <button 
                onClick={openAddModal}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all"
              >
                <Plus className="w-5 h-5" />
                Tambah Layanan
              </button>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {['Badan Usaha', 'Layanan Lainnya'].map(cat => (
                <div key={cat} className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest">{cat}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.filter(s => s.category === cat).map(service => (
                      <div key={service.id} className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 relative group">
                        {service.isPopular && (
                          <span className="absolute -top-3 left-6 px-4 py-1 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                            Paling Populer
                          </span>
                        )}
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-bold text-slate-900 text-lg leading-tight">{service.name}</h4>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => openEditModal(service)}
                              className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(service.id)}
                              className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="mb-6">
                          <div className="text-2xl font-bold text-primary">{service.price}</div>
                          {service.originalPrice && (
                            <div className="text-sm text-slate-400 line-through">{service.originalPrice}</div>
                          )}
                        </div>
                        <ul className="space-y-3 mb-8">
                          {service.features.map((f, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>

                        <div className="space-y-3">
                          <button 
                            onClick={() => openEditModal(service)}
                            className="w-full flex items-center justify-center py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all text-sm"
                          >
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit Layanan
                          </button>
                          <button 
                            onClick={() => navigate(`/layanan/${getServiceSlug(service.name)}`)}
                            className="w-full flex items-center justify-center py-3 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-all text-sm"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Lihat Detail
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Dokumen Saya':
        return (
          <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50">
              <h3 className="text-xl font-bold text-slate-900">Dokumen Perizinan</h3>
              <p className="text-sm text-slate-500">Daftar dokumen yang telah selesai atau sedang diproses</p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'Akta Pendirian PT.pdf', size: '1.2 MB', date: '4 Apr 2026', type: 'PDF' },
                  { name: 'SK Kemenkumham.pdf', size: '850 KB', date: '4 Apr 2026', type: 'PDF' },
                  { name: 'NIB Maju Bersama.pdf', size: '2.1 MB', date: '5 Apr 2026', type: 'PDF' },
                  { name: 'Sertifikat Merek.pdf', size: '3.4 MB', date: '6 Apr 2026', type: 'PDF' },
                ].map((doc, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-primary/30 hover:bg-slate-50 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 truncate">{doc.name}</h4>
                      <p className="text-xs text-slate-500">{doc.size} • {doc.date}</p>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'Riwayat Progres':
        return (
          <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50">
              <h3 className="text-xl font-bold text-slate-900">Riwayat Aktivitas</h3>
              <p className="text-sm text-slate-500">Lacak setiap langkah proses perizinan Anda</p>
            </div>
            <div className="p-8">
              <div className="space-y-8 relative before:absolute before:inset-0 before:left-[23px] before:w-0.5 before:bg-slate-100">
                {[
                  { title: 'Sertifikat Merek Terbit', desc: 'Pendaftaran Merek "LegalYu" telah selesai.', date: '6 Apr 2026, 14:20', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
                  { title: 'NIB Berhasil Diterbitkan', desc: 'Nomor Induk Berusaha untuk PT Maju Bersama telah aktif.', date: '5 Apr 2026, 09:15', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
                  { title: 'Verifikasi Dokumen', desc: 'Dokumen pendirian PT sedang dalam tahap verifikasi oleh tim ahli.', date: '4 Apr 2026, 16:45', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
                  { title: 'Pembayaran Diterima', desc: 'Pembayaran untuk paket Pendirian PT telah dikonfirmasi.', date: '4 Apr 2026, 10:30', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
                ].map((item, i) => (
                  <div key={i} className="relative flex gap-6">
                    <div className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center ${item.color} z-10 border-4 border-white`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-600 mb-1">{item.desc}</p>
                      <span className="text-xs font-medium text-slate-400">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'Pengaturan':
        return (
          <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50">
              <h3 className="text-xl font-bold text-slate-900">Pengaturan Profil</h3>
              <p className="text-sm text-slate-500">Kelola informasi akun dan preferensi Anda</p>
            </div>
            <div className="p-8">
              <form className="max-w-xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                    <input 
                      type="text" 
                      defaultValue={user?.user_metadata?.full_name}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      disabled
                      defaultValue={user?.email}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-100 text-slate-500 cursor-not-allowed"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nomor WhatsApp</label>
                  <input 
                    type="tel" 
                    placeholder="08123456789"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="pt-4">
                  <button type="button" className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all">
                    Simpan Perubahan
                  </button>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-4">Ganti Kata Sandi</h4>
                  <div className="space-y-4">
                    <input 
                      type="password" 
                      placeholder="Kata sandi saat ini"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-primary outline-none transition-all"
                    />
                    <input 
                      type="password" 
                      placeholder="Kata sandi baru"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-primary outline-none transition-all"
                    />
                    <button type="button" className="px-8 py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-all">
                      Update Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-2">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900 truncate">
                    {user?.user_metadata?.full_name || 'User'}
                  </h3>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Keluar
              </button>
            </div>

            <nav className="space-y-1">
              {[
                { name: 'Ringkasan', icon: LayoutDashboard },
                { name: 'Kelola Layanan', icon: Briefcase },
                { name: 'Dokumen Saya', icon: FileText },
                { name: 'Riwayat Progres', icon: Clock },
                { name: 'Pengaturan', icon: Settings },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                    activeTab === item.name 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'text-slate-600 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-slate-900">
                  {editingService ? 'Edit Layanan' : 'Tambah Layanan Baru'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>
              <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nama Layanan</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-primary outline-none transition-all"
                      placeholder="Contoh: Pembuatan PT"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value as any})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-primary outline-none transition-all"
                    >
                      <option value="Badan Usaha">Badan Usaha</option>
                      <option value="Layanan Lainnya">Layanan Lainnya</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Harga Promo</label>
                    <input 
                      type="text" 
                      required
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-primary outline-none transition-all"
                      placeholder="Rp 2.900.000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Harga Asli (Coret)</label>
                    <input 
                      type="text" 
                      value={formData.originalPrice}
                      onChange={e => setFormData({...formData, originalPrice: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-primary outline-none transition-all"
                      placeholder="Rp 5.000.000"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="isPopular"
                    checked={formData.isPopular}
                    onChange={e => setFormData({...formData, isPopular: e.target.checked})}
                    className="w-5 h-5 rounded-lg border-slate-200 text-primary focus:ring-primary" 
                  />
                  <label htmlFor="isPopular" className="text-sm font-bold text-slate-700">Tandai sebagai Paling Populer</label>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Fitur / Keunggulan</label>
                  <div className="flex gap-2 mb-4">
                    <input 
                      type="text" 
                      value={featureInput}
                      onChange={e => setFeatureInput(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-primary outline-none transition-all"
                      placeholder="Tambah fitur..."
                    />
                    <button 
                      type="button"
                      onClick={addFeature}
                      className="p-3 bg-primary text-white rounded-xl hover:bg-blue-600 transition-all"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.features?.map((f, i) => (
                      <span key={i} className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-bold rounded-full">
                        {f}
                        <button type="button" onClick={() => removeFeature(i)} className="hover:text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 border-2 border-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all"
                  >
                    Simpan Layanan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
