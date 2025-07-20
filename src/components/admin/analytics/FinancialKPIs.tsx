import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface KPI {
  name: string;
  value: string;
  change: string;
  positive: boolean;
}

interface FinancialKPIsProps {
  kpis: KPI[];
}

export function FinancialKPIs({ kpis }: FinancialKPIsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {kpi.name}
            </CardTitle>
            <Icon 
              name={kpi.positive ? 'TrendingUp' : 'TrendingDown'} 
              size={16} 
              className={kpi.positive ? 'text-green-600' : 'text-red-600'} 
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className={`text-xs mt-1 ${kpi.positive ? 'text-green-600' : 'text-red-600'}`}>
              {kpi.change} с прошлого периода
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}