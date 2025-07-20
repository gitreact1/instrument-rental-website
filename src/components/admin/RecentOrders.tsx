import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Order {
  id: string;
  customer: string;
  tools: string;
  amount: string;
  status: string;
  date: string;
}

interface RecentOrdersProps {
  orders: Order[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Недавние заказы</CardTitle>
        <CardDescription>
          Последние заказы в системе
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.tools}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">{order.amount}</p>
                <div className="mt-1">
                  <Badge variant={order.status === 'active' ? 'default' : 'secondary'}>
                    {order.status === 'active' ? 'Активный' : 
                     order.status === 'completed' ? 'Завершён' : 'Ожидает'}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Separator className="my-4" />
        <Button variant="outline" className="w-full">
          <Icon name="ArrowRight" size={16} className="mr-2" />
          Посмотреть все заказы
        </Button>
      </CardContent>
    </Card>
  );
}