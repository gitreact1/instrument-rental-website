import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DayStats {
  day: string;
  orders: number;
  revenue: number;
}

interface DailyStatsProps {
  stats: DayStats[];
}

export function DailyStats({ stats }: DailyStatsProps) {
  const maxOrders = Math.max(...stats.map(d => d.orders));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Статистика по дням недели</CardTitle>
        <CardDescription>
          Активность клиентов в течение недели
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-4">
          {stats.map((day, index) => {
            const intensity = (day.orders / maxOrders) * 100;
            
            return (
              <div key={index} className="text-center space-y-2">
                <div className="font-medium">{day.day}</div>
                <div 
                  className="w-full h-16 bg-blue-500 rounded opacity-80 flex items-end justify-center text-white text-xs font-medium"
                  style={{ height: `${Math.max(intensity, 20)}px` }}
                >
                  {day.orders}
                </div>
                <div className="text-xs text-gray-600">
                  ₽{day.revenue.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}