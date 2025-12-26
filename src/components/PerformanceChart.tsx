
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {useQuery} from "@tanstack/react-query";
import investmentApi, {DashboardData, PerformanceResponse} from "@/lib/investmentApi.ts";

const PerformanceChart = () => {
  const { user } = useAuth();
  const [showComparison, setShowComparison] = useState(false);

  const { data: graph, isLoading, error, refetch } = useQuery<PerformanceResponse>({
    queryKey: ['/api/graph'],
    queryFn: () => investmentApi.getGraph(),
    staleTime: 30000,
    retry: 2,
  });


  const {
    initial_investment = 0,
    months = [],
  } = graph ?? {};

  // Valor base do investimento
  const investimentoInicial = initial_investment;
  
  // Rentabilidades mensais dos diferentes investimentos - sempre 2% para Club8 no dashboard interno
  const club8Mensal = 2.0;
  const cdbMensal = 0.95;
  const lcaMensal = 0.90;
  const poupancaMensal = 0.70;
  const tesouroDiretoMensal = 1.10;

  // Dados para os próximos 12 meses (incluindo projeções)
  const meses = [
    'Jan/24', 'Fev/24', 'Mar/24', 'Abr/24', 'Mai/24', 'Jun/24', // Dados reais
    'Jul/24', 'Ago/24', 'Set/24', 'Out/24', 'Nov/24', 'Dez/24'  // Projeções
  ];

  // Calculando valores acumulados
  const performanceData = months;
  /*const performanceData = meses.map((mes, index) => {
    const isProjection = index >= 6;
    const monthCount = index + 1;
    
    return {
      mes,
      club8: investimentoInicial + (investimentoInicial * club8Mensal * monthCount / 100),
      cdb: investimentoInicial + (investimentoInicial * cdbMensal * monthCount / 100),
      lca: investimentoInicial + (investimentoInicial * lcaMensal * monthCount / 100),
      poupanca: investimentoInicial + (investimentoInicial * poupancaMensal * monthCount / 100),
      tesouroDireto: investimentoInicial + (investimentoInicial * tesouroDiretoMensal * monthCount / 100),
      isProjection
    };
  });*/

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR')}`;
  };

  // Componente customizado para as barras com diferentes estilos
  const CustomBar = (props: any) => {
    const { fill, payload, ...rest } = props;
    const isProjection = payload?.isProjection;
    
    return (
      <Bar
        {...rest}
        fill={isProjection ? fill + '80' : fill} // Adiciona transparência para projeções
        strokeDasharray={isProjection ? "5,5" : "0,0"} // Tracejado para projeções
        stroke={isProjection ? fill : 'none'}
        strokeWidth={isProjection ? 1 : 0}
      />
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h3 className="text-xl font-bold text-club8-dark flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-club8-turquoise" />
          Evolução do Patrimônio Acumulado
        </h3>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={showComparison ? "default" : "outline"}
            onClick={() => setShowComparison(!showComparison)}
            size="sm"
            className={showComparison ? "bg-club8-turquoise text-club8-dark" : ""}
          >
            {showComparison ? 'Ocultar' : 'Mostrar'} Comparativos
          </Button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis 
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
              label={{ 
                value: 'Valor (R$)', 
                angle: -90, 
                position: 'insideLeft' 
              }} 
            />
            <Tooltip 
              formatter={(value) => [formatCurrency(Number(value)), '']} 
            />
            <Legend />
            
            <Bar 
              dataKey="club8" 
              name="Club8"
              fill="#00d4aa"
              shape={(props: any) => {
                const isProjection = props.payload?.isProjection;
                return (
                  <rect
                    {...props}
                    fill={isProjection ? '#00d4aa80' : '#00d4aa'}
                    stroke={isProjection ? '#00d4aa' : 'none'}
                    strokeWidth={isProjection ? 2 : 0}
                    strokeDasharray={isProjection ? "5,5" : "0,0"}
                  />
                );
              }}
            />
            
            {showComparison && (
              <>
                <Bar 
                  dataKey="cdb" 
                  name="CDB"
                  fill="#8884d8"
                  shape={(props: any) => {
                    const isProjection = props.payload?.isProjection;
                    return (
                      <rect
                        {...props}
                        fill={isProjection ? '#8884d880' : '#8884d8'}
                        stroke={isProjection ? '#8884d8' : 'none'}
                        strokeWidth={isProjection ? 2 : 0}
                        strokeDasharray={isProjection ? "5,5" : "0,0"}
                      />
                    );
                  }}
                />
                <Bar 
                  dataKey="lca" 
                  name="LCA"
                  fill="#82ca9d"
                  shape={(props: any) => {
                    const isProjection = props.payload?.isProjection;
                    return (
                      <rect
                        {...props}
                        fill={isProjection ? '#82ca9d80' : '#82ca9d'}
                        stroke={isProjection ? '#82ca9d' : 'none'}
                        strokeWidth={isProjection ? 2 : 0}
                        strokeDasharray={isProjection ? "5,5" : "0,0"}
                      />
                    );
                  }}
                />
                <Bar 
                  dataKey="tesouroDireto" 
                  name="Tesouro Direto"
                  fill="#ff7c7c"
                  shape={(props: any) => {
                    const isProjection = props.payload?.isProjection;
                    return (
                      <rect
                        {...props}
                        fill={isProjection ? '#ff7c7c80' : '#ff7c7c'}
                        stroke={isProjection ? '#ff7c7c' : 'none'}
                        strokeWidth={isProjection ? 2 : 0}
                        strokeDasharray={isProjection ? "5,5" : "0,0"}
                      />
                    );
                  }}
                />
                <Bar 
                  dataKey="poupanca" 
                  name="Poupança"
                  fill="#ffc658"
                  shape={(props: any) => {
                    const isProjection = props.payload?.isProjection;
                    return (
                      <rect
                        {...props}
                        fill={isProjection ? '#ffc65880' : '#ffc658'}
                        stroke={isProjection ? '#ffc658' : 'none'}
                        strokeWidth={isProjection ? 2 : 0}
                        strokeDasharray={isProjection ? "5,5" : "0,0"}
                      />
                    );
                  }}
                />
              </>
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          <span className="inline-block w-3 h-3 bg-club8-turquoise rounded mr-2"></span>
          Meses sólidos são dados reais, meses com transparência são projeções
        </p>
      </div>
    </Card>
  );
};

export default PerformanceChart;
