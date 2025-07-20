import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface QuickActionsProps {
  onSectionChange: (section: string) => void;
}

export function QuickActions({ onSectionChange }: QuickActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Быстрые действия</CardTitle>
        <CardDescription>
          Часто используемые функции администратора
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex-col space-y-2"
            onClick={() => onSectionChange('tools')}
          >
            <Icon name="Plus" size={24} />
            <span className="text-sm">Добавить инструмент</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex-col space-y-2"
            onClick={() => onSectionChange('orders')}
          >
            <Icon name="FileText" size={24} />
            <span className="text-sm">Новый заказ</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Icon name="Users" size={24} />
            <span className="text-sm">Клиенты</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Icon name="Settings" size={24} />
            <span className="text-sm">Настройки</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}