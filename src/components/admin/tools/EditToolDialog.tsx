import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Tool {
  id: number;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  image: string;
  available: boolean;
  rating: number;
  reviews: number;
  description: string;
  power: string;
  weight: string;
  features: string[];
  inStock: number;
  totalRented: number;
  revenue: number;
  lastRented: string;
}

interface EditToolDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tool: Tool | null;
  setTool: (tool: Tool) => void;
  onSubmit: () => void;
}

export function EditToolDialog({ isOpen, onClose, tool, setTool, onSubmit }: EditToolDialogProps) {
  if (!tool) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Редактировать инструмент</DialogTitle>
          <DialogDescription>
            Изменение информации об инструменте
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Название инструмента</Label>
            <Input
              id="edit-name"
              value={tool.name}
              onChange={(e) => setTool({ ...tool, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-price">Цена за день (₽)</Label>
            <Input
              id="edit-price"
              type="number"
              value={tool.price}
              onChange={(e) => setTool({ ...tool, price: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-stock">Количество на складе</Label>
            <Input
              id="edit-stock"
              type="number"
              value={tool.inStock}
              onChange={(e) => setTool({ ...tool, inStock: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-power">Мощность</Label>
            <Input
              id="edit-power"
              value={tool.power}
              onChange={(e) => setTool({ ...tool, power: e.target.value })}
            />
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="edit-description">Описание</Label>
            <Textarea
              id="edit-description"
              value={tool.description}
              onChange={(e) => setTool({ ...tool, description: e.target.value })}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={onSubmit} className="bg-blue-600 hover:bg-blue-700">
            Сохранить изменения
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}