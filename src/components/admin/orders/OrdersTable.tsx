import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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

interface OrdersTableProps {
  orders: Order[];
  onOrderSelect: (order: Order) => void;
  onStatusUpdate: (orderId: string, status: Order['status']) => void;
}

export function OrdersTable({ orders, onOrderSelect, onStatusUpdate }: OrdersTableProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { text: 'Ожидает', color: 'bg-yellow-100 text-yellow-800' },
      confirmed: { text: 'Подтверждён', color: 'bg-blue-100 text-blue-800' },
      active: { text: 'Активный', color: 'bg-green-100 text-green-800' },
      completed: { text: 'Завершён', color: 'bg-gray-100 text-gray-800' },
      cancelled: { text: 'Отменён', color: 'bg-red-100 text-red-800' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.color}>{config.text}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const calculateDaysLeft = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Список заказов ({orders.length})</CardTitle>
        <CardDescription>
          Все заказы с возможностью управления статусами
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Заказ</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Инструменты</TableHead>
                <TableHead>Период</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => {
                const daysLeft = calculateDaysLeft(order.endDate);
                
                return (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-600">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-gray-600">{order.customerPhone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.tools.length} инструмент(ов)</p>
                        <p className="text-sm text-gray-600">
                          {order.tools[0]?.name}
                          {order.tools.length > 1 && ` +${order.tools.length - 1}`}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">
                          {formatDate(order.startDate)} - {formatDate(order.endDate)}
                        </p>
                        {order.status === 'active' && (
                          <p className="text-xs text-gray-600">
                            {daysLeft > 0 ? `Осталось ${daysLeft} дн.` : 'Просрочен'}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-bold">₽{order.totalAmount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">
                          Залог: ₽{order.deposit.toLocaleString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(order.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onOrderSelect(order)}
                        >
                          <Icon name="Eye" size={14} />
                        </Button>
                        
                        {order.status === 'pending' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onStatusUpdate(order.id, 'confirmed')}
                            className="text-blue-600"
                          >
                            <Icon name="Check" size={14} />
                          </Button>
                        )}
                        
                        {order.status === 'confirmed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onStatusUpdate(order.id, 'active')}
                            className="text-green-600"
                          >
                            <Icon name="Play" size={14} />
                          </Button>
                        )}
                        
                        {order.status === 'active' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onStatusUpdate(order.id, 'completed')}
                            className="text-gray-600"
                          >
                            <Icon name="Square" size={14} />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}