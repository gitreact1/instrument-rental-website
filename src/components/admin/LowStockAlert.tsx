import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface LowStockTool {
  name: string;
  stock: number;
  critical: boolean;
}

interface LowStockAlertProps {
  tools: LowStockTool[];
}

export function LowStockAlert({ tools }: LowStockAlertProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon name="AlertTriangle" size={20} className="mr-2 text-orange-600" />
          Низкие запасы
        </CardTitle>
        <CardDescription>
          Инструменты с низким количеством на складе
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tools.map((tool, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm">{tool.name}</p>
                <p className="text-xs text-muted-foreground">На складе: {tool.stock} шт.</p>
              </div>
              <Badge 
                variant={tool.critical ? "destructive" : "secondary"}
                className="text-xs"
              >
                {tool.critical ? 'Критично' : 'Низкий'}
              </Badge>
            </div>
          ))}
        </div>
        <Separator className="my-4" />
        <Button variant="outline" className="w-full">
          <Icon name="Package" size={16} className="mr-2" />
          Управление складом
        </Button>
      </CardContent>
    </Card>
  );
}