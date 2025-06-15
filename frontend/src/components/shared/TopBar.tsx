import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft } from 'lucide-react'; // Optional: use an icon library

interface TopbarProps {
  title: string;
  showBack?: boolean;
}

export default function Topbar({ title, showBack = false }: TopbarProps) {
  const { user, onLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="w-full bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          {showBack && (
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-1 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md transition"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
          )}
          <h1 className="text-xl font-semibold tracking-wide">Courier App</h1>
          <span className="text-sm sm:text-base opacity-80 truncate max-w-[160px] sm:max-w-xs">
            | {title}
          </span>
        </div>
        {user && (
          <button
            onClick={handleLogout}
            className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
