import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FinancialKPIs } from '@/components/admin/analytics/FinancialKPIs';
import { RevenueChart } from '@/components/admin/analytics/RevenueChart';
import { DailyStats } from '@/components/admin/analytics/DailyStats';
import { CategoryRevenue } from '@/components/admin/analytics/CategoryRevenue';
import { TopTools } from '@/components/admin/analytics/TopTools';
import Icon from '@/components/ui/icon';

const AdminAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const revenueData = [
    { month: 'Янв', revenue: 245000, orders: 89, tools: 156 },
    { month: 'Фев', revenue: 298000, orders: 112, tools: 189 },
    { month: 'Мар', revenue: 356000, orders: 134, tools: 223 },
    { month: 'Апр', revenue: 412000, orders: 156, tools: 267 },
    { month: 'Май', revenue: 478000, orders: 178, tools: 298 },
    { month: 'Июн', revenue: 523000, orders: 195, tools: 334 },
    { month: 'Июл', revenue: 587000, orders: 218, tools: 378 }
  ];

  const topTools = [
    { name: 'Перфоратор Bosch GSH 16-28', rents: 156, revenue: 234400, rating: 4.8 },
    { name: 'Болгарка DeWalt DWE402', rents: 142, revenue: 198600, rating: 4.9 },
    { name: 'Дрель аккумуляторная Bosch GSR 18V', rents: 134, revenue: 167800, rating: 4.7 },
    { name: 'Миксер строительный Metabo RWE 1100', rents: 98, revenue: 127400, rating: 4.6 },
    { name: 'Отбойный молоток Makita HM1317C', rents: 87, revenue: 156750, rating: 4.8 }
  ];

  const categoryStats = [
    { name: 'Электроинструмент', share: 65, revenue: 1245000, orders: 423 },
    { name: 'Измерительные приборы', share: 15, revenue: 287000, orders: 98 },
    { name: 'Садовая техника', share: 12, revenue: 230000, orders: 76 },
    { name: 'Строительное оборудование', share: 8, revenue: 153000, orders: 54 }
  ];

  const customerSegments = [
    { segment: 'Частные лица', count: 1247, share: 58, avgOrder: 2340 },
    { segment: 'Строительные компании', count: 456, share: 32, avgOrder: 5670 },
    { segment: 'Ремонтные бригады', count: 234, share: 10, avgOrder: 3450 }
  ];

  const financialKPIs = [
    { name: 'Общая выручка', value: '₽2,847,500', change: '+12.5%', positive: true },
    { name: 'Средний чек', value: '₽3,245', change: '+8.2%', positive: true },
    { name: 'Коэффициент использования', value: '78%', change: '+15.3%', positive: true },
    { name: 'Прибыль с инструмента', value: '₽12,180', change: '+22.1%', positive: true }
  ];

  const dailyStats = [
    { day: 'Пн', orders: 23, revenue: 67800 },
    { day: 'Вт', orders: 34, revenue: 89200 },
    { day: 'Ср', orders: 41, revenue: 123400 },
    { day: 'Чт', orders: 38, revenue: 112300 },
    { day: 'Пт', orders: 45, revenue: 134500 },
    { day: 'Сб', orders: 52, revenue: 156700 },
    { day: 'Вс', orders: 28, revenue: 78900 }
  ];

  const currentMonth = revenueData[revenueData.length - 1];
  const previousMonth = revenueData[revenueData.length - 2];
  const growthRate = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Аналитика и отчёты</h1>
          <p className="text-gray-600">Подробная статистика по доходам и использованию</p>
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Неделя</SelectItem>
            <SelectItem value="month">Месяц</SelectItem>
            <SelectItem value="quarter">Квартал</SelectItem>
            <SelectItem value="year">Год</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="revenue">Доходы</TabsTrigger>
          <TabsTrigger value="tools">Инструменты</TabsTrigger>
          <TabsTrigger value="customers">Клиенты</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <FinancialKPIs kpis={financialKPIs} />

          <RevenueChart data={revenueData} growthRate={growthRate} />

          <DailyStats stats={dailyStats} />
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CategoryRevenue categories={categoryStats} />
            <TopTools tools={topTools} />
          </div>
        </TabsContent>

        {/* Tools Tab */}
        <TabsContent value="tools" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Анализ использования инструментов</CardTitle>
              <CardDescription>
                Подробная статистика по каждому инструменту
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Инструмент</TableHead>
                    <TableHead>Аренды</TableHead>
                    <TableHead>Доход</TableHead>
                    <TableHead>Загрузка</TableHead>
                    <TableHead>Рейтинг</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topTools.map((tool, index) => {
                    const utilizationRate = Math.min((tool.rents / 200) * 100, 100);
                    
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{tool.name}</TableCell>
                        <TableCell>{tool.rents}</TableCell>
                        <TableCell>₽{tool.revenue.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Progress value={utilizationRate} className="h-2" />
                            <span className="text-xs text-gray-600">{utilizationRate.toFixed(1)}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                            <span>{tool.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={utilizationRate > 70 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                          >
                            {utilizationRate > 70 ? 'Высокая' : 'Средняя'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Segments */}
            <Card>
              <CardHeader>
                <CardTitle>Сегменты клиентов</CardTitle>
                <CardDescription>
                  Распределение клиентской базы
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {customerSegments.map((segment, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{segment.segment}</span>
                      <span className="text-sm text-gray-600">{segment.share}%</span>
                    </div>
                    <Progress value={segment.share} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{segment.count} клиентов</span>
                      <span>Средний чек: ₽{segment.avgOrder.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Customer Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Метрики клиентов</CardTitle>
                <CardDescription>
                  Ключевые показатели работы с клиентами
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">1,937</div>
                    <div className="text-sm text-gray-600">Всего клиентов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">156</div>
                    <div className="text-sm text-gray-600">Новых за месяц</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">67%</div>
                    <div className="text-sm text-gray-600">Возвращаются</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">4.2</div>
                    <div className="text-sm text-gray-600">Аренд на клиента</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalytics;