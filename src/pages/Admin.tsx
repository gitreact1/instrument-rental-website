import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { AdminSidebar, AdminLayout } from '@/components/AdminSidebar';
import { ThemeProvider, useTheme } from '@/hooks/useTheme';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { RecentOrders } from '@/components/admin/RecentOrders';
import { LowStockAlert } from '@/components/admin/LowStockAlert';
import { QuickActions } from '@/components/admin/QuickActions';

const AdminPanelContent = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { isDarkMode, toggleTheme } = useTheme();

  const stats = [
    {
      title: 'Общая выручка',
      value: '₽2,847,500',
      change: '+12.5%',
      icon: 'TrendingUp',
      color: 'text-green-600'
    },
    {
      title: 'Активные заказы',
      value: '47',
      change: '+8.2%',
      icon: 'ShoppingCart',
      color: 'text-blue-600'
    },
    {
      title: 'Инструменты в аренде',
      value: '234',
      change: '+15.3%',
      icon: 'Wrench',
      color: 'text-orange-600'
    },
    {
      title: 'Новые клиенты',
      value: '89',
      change: '+22.1%',
      icon: 'Users',
      color: 'text-purple-600'
    }
  ];

  const recentOrders = [
    {
      id: '#7842',
      customer: 'Алексей Петров',
      tools: 'Перфоратор Bosch + Болгарка DeWalt',
      amount: '₽2,800',
      status: 'active',
      date: '2 дня назад'
    },
    {
      id: '#7841',
      customer: 'Мария Иванова',
      tools: 'Дрель аккумуляторная Bosch',
      amount: '₽900',
      status: 'completed',
      date: '3 дня назад'
    },
    {
      id: '#7840',
      customer: 'Сергей Сидоров',
      tools: 'Отбойный молоток Makita',
      amount: '₽5,000',
      status: 'pending',
      date: '5 дней назад'
    }
  ];

  const lowStockTools = [
    { name: 'Миксер строительный Metabo', stock: 1, critical: true },
    { name: 'Болгарка DeWalt 180мм', stock: 2, critical: false },
    { name: 'Перфоратор Milwaukee M18', stock: 1, critical: true },
    { name: 'Дрель ударная Makita', stock: 3, critical: false }
  ];

  const renderDashboard = () => (
    <div className="p-6 space-y-6">
      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders orders={recentOrders} />
        <LowStockAlert tools={lowStockTools} />
      </div>

      <QuickActions onSectionChange={setActiveSection} />
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'tools':
        return (
          <div className="p-6 text-center">
            <p className="text-muted-foreground mb-4">Переходим к полнофункциональному управлению инструментами</p>
            <Button onClick={() => window.location.href = '/admin/tools'}>
              Открыть управление инструментами
            </Button>
          </div>
        );
      case 'orders':
        return (
          <div className="p-6 text-center">
            <p className="text-muted-foreground mb-4">Переходим к управлению заказами</p>
            <Button onClick={() => window.location.href = '/admin/orders'}>
              Открыть управление заказами
            </Button>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-6 text-center">
            <p className="text-muted-foreground mb-4">Переходим к детальной аналитике</p>
            <Button onClick={() => window.location.href = '/admin/analytics'}>
              Открыть аналитику
            </Button>
          </div>
        );
      case 'customers':
        return (
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Управление клиентами</CardTitle>
                <CardDescription>Информация о клиентах и их активности</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Раздел в разработке...</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Настройки системы</CardTitle>
                <CardDescription>Конфигурация и параметры приложения</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Тёмная тема</h4>
                      <p className="text-sm text-muted-foreground">Переключение между светлой и тёмной темой</p>
                    </div>
                    <Button variant="outline" onClick={toggleTheme}>
                      <Icon name={isDarkMode ? "Sun" : "Moon"} className="h-4 w-4 mr-2" />
                      {isDarkMode ? 'Светлая' : 'Тёмная'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <AdminLayout>
      <AdminSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isDarkMode={isDarkMode}
        onThemeToggle={toggleTheme}
      />
      <div className="flex-1">
        {renderContent()}
      </div>
    </AdminLayout>
  );
};

const AdminPanel = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="admin-theme">
      <AdminPanelContent />
    </ThemeProvider>
  );
};

export default AdminPanel;