
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import InvestorDashboard from '@/components/InvestorDashboard';

const Dashboard = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  /*useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);*/

  if (isLoading) {
    return (
      <div className="min-h-screen bg-club8-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-club8-turquoise mx-auto mb-4"></div>
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  /*if (!isAuthenticated) {
    return null;
  }*/

  return <InvestorDashboard />;
};

export default Dashboard;
