import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Success - redirect to home or dashboard
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat masuk. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-20">
        <div className="absolute top-0 right-0 w-full h-full bg-primary/10 -skew-x-12 translate-x-1/4" />
        <div className="relative z-10 text-white max-w-lg">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link to="/" className="text-3xl font-bold tracking-tighter flex items-center mb-12">
              LEGAL<span className="text-secondary">KREATIF</span>
            </Link>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Kelola Legalitas Bisnis Anda <br /> <span className="text-primary">Dalam Satu Genggaman</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Masuk ke dashboard untuk memantau progres perizinan, mengunduh dokumen, dan berkonsultasi dengan tim ahli kami secara eksklusif.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              'Pantau Progres Real-time',
              'Akses Dokumen Digital 24/7',
              'Konsultasi Prioritas',
              'Notifikasi Pembaruan Izin'
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="flex items-center gap-4"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-slate-300 font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-20">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-12 text-center">
            <Link to="/" className="text-2xl font-bold tracking-tighter inline-flex items-center">
              LEGAL<span className="text-secondary">KREATIF</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100"
          >
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Selamat Datang</h2>
              <p className="text-slate-500">Masuk ke akun Legal Kreatif Anda</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-slate-700">Kata Sandi</label>
                  <a href="#" className="text-xs font-bold text-primary hover:underline">Lupa Sandi?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-14 pr-14 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="remember" className="w-5 h-5 rounded-lg border-slate-200 text-primary focus:ring-primary" />
                <label htmlFor="remember" className="text-sm text-slate-600 font-medium">Ingat saya</label>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  'Masuk Sekarang'
                )}
              </button>
            </form>

            <div className="mt-10 pt-10 border-t border-slate-100">
              <p className="text-center text-slate-500 text-sm">
                Belum punya akun? <br />
                <Link to="/signup" className="text-primary font-bold hover:underline">Daftar Sekarang & Konsultasi Gratis</Link>
              </p>
            </div>
          </motion.div>

          <div className="mt-8 text-center">
            <Link to="/" className="inline-flex items-center text-slate-400 hover:text-slate-600 transition-colors font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
