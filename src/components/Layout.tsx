import React, { useState, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Activity
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Revendas', path: '/revendas' },
    { icon: Settings, label: 'Administradores', path: '/administradores' },
    { icon: FileText, label: 'Logs', path: '/logs' },
    { icon: User, label: 'Perfil', path: '/perfil' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-6 bg-blue-600 text-white">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-8 w-auto"
            />
            <h1 className="text-xl font-bold">Painel Administrativo</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                location.pathname === item.path ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {admin?.nome.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{admin?.nome}</p>
                <p className="text-xs text-gray-500">{admin?.nivel_acesso}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-600 transition-colors"
              title="Sair"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Activity size={20} className="text-green-500" />
                <span className="text-sm text-gray-600">Sistema Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};