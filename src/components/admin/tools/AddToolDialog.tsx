import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NewTool {
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: string;
  description: string;
  power: string;
  weight: string;
  features: string;
  inStock: string;
}

interface AddToolDialogProps {
  isOpen: boolean;
  onClose: () => void;
  newTool: NewTool;
  setNewTool: (tool: NewTool) => void;
  onSubmit: () => void;
  categories: string[];
  brands: string[];
}

export function AddToolDialog({ 
  isOpen, 
  onClose, 
  newTool, 
  setNewTool, 
  onSubmit, 
  categories, 
  brands 
}: AddToolDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Добавить новый инструмент</DialogTitle>
          <DialogDescription>
            Заполните информацию о новом инструменте для каталога
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Название инструмента</Label>
            <Input
              id="name"
              value={newTool.name}
              onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
              placeholder="Перфоратор Bosch..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">Бренд</Label>
            <Select value={newTool.brand} onValueChange={(value) => setNewTool({ ...newTool, brand: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите бренд" />
              </SelectTrigger>
              <SelectContent>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Категория</Label>
            <Select value={newTool.category} onValueChange={(value) => setNewTool({ ...newTool, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subcategory">Подкатегория</Label>
            <Input
              id="subcategory"
              value={newTool.subcategory}
              onChange={(e) => setNewTool({ ...newTool, subcategory: e.target.value })}
              placeholder="Перфораторы, Дрели..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Цена за день (₽)</Label>
            <Input
              id="price"
              type="number"
              value={newTool.price}
              onChange={(e) => setNewTool({ ...newTool, price: e.target.value })}
              placeholder="1200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inStock">Количество на складе</Label>
            <Input
              id="inStock"
              type="number"
              value={newTool.inStock}
              onChange={(e) => setNewTool({ ...newTool, inStock: e.target.value })}
              placeholder="5"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="power">Мощность</Label>
            <Input
              id="power"
              value={newTool.power}
              onChange={(e) => setNewTool({ ...newTool, power: e.target.value })}
              placeholder="1500W"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Вес</Label>
            <Input
              id="weight"
              value={newTool.weight}
              onChange={(e) => setNewTool({ ...newTool, weight: e.target.value })}
              placeholder="5.8кг"
            />
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={newTool.description}
              onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
              placeholder="Подробное описание инструмента..."
              rows={3}
            />
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="features">Особенности (через запятую)</Label>
            <Input
              id="features"
              value={newTool.features}
              onChange={(e) => setNewTool({ ...newTool, features: e.target.value })}
              placeholder="SDS-Max, Антивибрация, Регулировка оборотов"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={onSubmit} className="bg-blue-600 hover:bg-blue-700">
            Добавить инструмент
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}