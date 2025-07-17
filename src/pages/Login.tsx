import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Lock, User } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, senha);
      addNotification({
        type: 'success',
        title: 'Login realizado com sucesso!',
        message: 'Bem-vindo ao painel administrativo.'
      });
      navigate('/dashboard');
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Erro no login',
        message: error.message || 'Credenciais inválidas.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Painel Administrativo</h1>
          <p className="text-gray-600">Faça login para acessar o painel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
              className="pl-10"
            />
            <User className="absolute left-3 top-9 text-gray-400" size={16} />
          </div>

          <div className="relative">
            <Input
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
              className="pl-10"
            />
            <Lock className="absolute left-3 top-9 text-gray-400" size={16} />
          </div>

          <Button
            type="submit"
            disabled={loading || !email || !senha}
            className="w-full"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Sistema Online</span>
          </div>
        </div>
      </Card>
    </div>
  );
};