import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TopTool {
  name: string;
  rents: number;
  revenue: number;
  rating: number;
}

interface TopToolsProps {
  tools: TopTool[];
}

export function TopTools({ tools }: TopToolsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Топ инструментов по доходам</CardTitle>
        <CardDescription>
          Самые прибыльные позиции каталога
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tools.map((tool, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm">{tool.name}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-gray-600">{tool.rents} аренд</span>
                  <span className="text-xs">★ {tool.rating}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">₽{tool.revenue.toLocaleString()}</p>
                <Badge variant="secondary" className="text-xs">
                  #{index + 1}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}