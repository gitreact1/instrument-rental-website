import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OrdersStats } from '@/components/admin/orders/OrdersStats';
import { OrdersTable } from '@/components/admin/orders/OrdersTable';
import { OrderDetailsDialog } from '@/components/admin/orders/OrderDetailsDialog';
import Icon from '@/components/ui/icon';

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  tools: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    days: number;
  }>;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  totalAmount: number;
  deposit: number;
  notes: string;
  createdAt: string;
}

const AdminOrdersManagement = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-7842',
      customerName: 'Алексей Петров',
      customerPhone: '+7 (999) 123-45-67',
      customerEmail: 'alexey@example.com',
      tools: [
        { id: 1, name: 'Перфоратор Bosch GSH 16-28', price: 1200, quantity: 1, days: 3 },
        { id: 2, name: 'Болгарка DeWalt DWE402', price: 800, quantity: 1, days: 3 }
      ],
      startDate: '2024-07-20',
      endDate: '2024-07-23',
      status: 'active',
      totalAmount: 6000,
      deposit: 3000,
      notes: 'Клиент опытный, все инструменты в порядке',
      createdAt: '2024-07-18'
    },
    {
      id: 'ORD-7841',
      customerName: 'Мария Иванова',
      customerPhone: '+7 (999) 234-56-78',
      customerEmail: 'maria@example.com',
      tools: [
        { id: 5, name: 'Дрель аккумуляторная Bosch GSR 18V', price: 450, quantity: 2, days: 5 }
      ],
      startDate: '2024-07-15',
      endDate: '2024-07-20',
      status: 'completed',
      totalAmount: 4500,
      deposit: 2250,
      notes: 'Постоянный клиент, возврат в срок',
      createdAt: '2024-07-12'
    },
    {
      id: 'ORD-7840',
      customerName: 'Сергей Сидоров',
      customerPhone: '+7 (999) 345-67-89',
      customerEmail: 'sergey@example.com',
      tools: [
        { id: 3, name: 'Отбойный молоток Makita HM1317C', price: 2500, quantity: 1, days: 2 }
      ],
      startDate: '2024-07-22',
      endDate: '2024-07-24',
      status: 'confirmed',
      totalAmount: 5000,
      deposit: 2500,
      notes: 'Требуется инструктаж по безопасности',
      createdAt: '2024-07-17'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerPhone.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    active: orders.filter(o => o.status === 'active').length,
    completed: orders.filter(o => o.status === 'completed').length,
    revenue: orders.reduce((sum, order) => sum + order.totalAmount, 0)
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Управление заказами</h1>
          <p className="text-gray-600">Контроль всех заказов и бронирований</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Icon name="Plus" size={16} className="mr-2" />
          Создать заказ
        </Button>
      </div>

      {/* Statistics Cards */}
      <OrdersStats stats={orderStats} />

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Поиск по номеру заказа, имени клиента или телефону..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Все статусы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="pending">Ожидает</SelectItem>
                <SelectItem value="confirmed">Подтверждён</SelectItem>
                <SelectItem value="active">Активный</SelectItem>
                <SelectItem value="completed">Завершён</SelectItem>
                <SelectItem value="cancelled">Отменён</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <OrdersTable 
        orders={filteredOrders}
        onOrderSelect={(order) => {
          setSelectedOrder(order);
          setIsDetailsOpen(true);
        }}
        onStatusUpdate={updateOrderStatus}
      />

      {/* Order Details Dialog */}
      <OrderDetailsDialog 
        order={selectedOrder}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
};

export default AdminOrdersManagement;