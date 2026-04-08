import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="mb-6">
              <Link to="/" className="text-2xl font-bold text-white">
                LEGAL<span className="text-secondary">KREATIF</span>
              </Link>
            </div>
            <p className="text-sm leading-relaxed mb-8">
              Solusi Perizinan Usaha Anda. Kami membantu pengusaha di seluruh Indonesia untuk melegalkan bisnis mereka dengan cepat dan profesional.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Navigasi</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/#layanan" className="hover:text-white transition-colors">Layanan</Link></li>
              <li><Link to="/harga" className="hover:text-white transition-colors">Daftar Harga</Link></li>
              <li><Link to="/layanan/tracker" className="hover:text-white transition-colors">Tracker</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Member</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/login" className="hover:text-white transition-colors">Masuk Akun</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Karir</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Kontak</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                <span>Menara Palma Lantai 22 - 06A, Jl. H. R. Rasuna Said Kavling VI No.9 Blok X2, Kuningan Tim., Jakarta Selatan 12950</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                <span>+6282288060093</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                <span>cs@legalkreatif.co.id</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© 2026 Legal Kreatif. All rights reserved. Solusi Perizinan Usaha Terbaik di Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}
