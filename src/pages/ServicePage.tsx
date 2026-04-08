import { useParams } from 'react-router-dom';
import ServiceDetail from '../components/ServiceDetail';

export default function ServicePage() {
  const { id } = useParams<{ id: string }>();
  
  // Map URL ID back to title
  const serviceMap: Record<string, string> = {
    'pembuatan-pt': 'Pembuatan PT',
    'pembuatan-cv': 'Pembuatan CV',
    'pt-perorangan': 'Pembuatan PT Perorangan',
    'pt-pma': 'Pembuatan PT PMA',
    'yayasan': 'Pendirian Yayasan',
    'nib': 'Pembuatan NIB',
    'tdpse': 'TDPSE',
    'hki': 'Daftar Merek HKI',
    'virtual-office': 'Virtual Office',
    'tracker': 'Tracker',
    'kbli': 'Cek KBLI',
  };

  const title = serviceMap[id || ''] || 'Layanan Legal';

  return (
    <div className="pt-16">
      <ServiceDetail title={title} onBack={() => {}} showBackButton={false} />
    </div>
  );
}
