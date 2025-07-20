import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToolsTable } from '@/components/admin/tools/ToolsTable';
import { AddToolDialog } from '@/components/admin/tools/AddToolDialog';
import { EditToolDialog } from '@/components/admin/tools/EditToolDialog';
import Icon from '@/components/ui/icon';

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

const AdminToolsManagement = () => {
  const [tools, setTools] = useState<Tool[]>([
    {
      id: 1,
      name: 'Перфоратор Bosch GSH 16-28',
      brand: 'Bosch',
      category: 'Электроинструмент',
      subcategory: 'Перфораторы',
      price: 1200,
      image: '/img/5e130715-b755-4ab5-82af-c9e448995766.jpg',
      available: true,
      rating: 4.8,
      reviews: 124,
      description: 'Профессиональный перфоратор для сверления и долбления бетона',
      power: '1500W',
      weight: '5.8кг',
      features: ['SDS-Max', 'Антивибрация', 'Регулировка оборотов'],
      inStock: 5,
      totalRented: 89,
      revenue: 156800,
      lastRented: '2024-07-15'
    },
    {
      id: 2,
      name: 'Болгарка DeWalt DWE402',
      brand: 'DeWalt',
      category: 'Электроинструмент',
      subcategory: 'Болгарки',
      price: 800,
      image: '/img/5e130715-b755-4ab5-82af-c9e448995766.jpg',
      available: true,
      rating: 4.9,
      reviews: 89,
      description: 'Угловая шлифовальная машина 125мм с защитным кожухом',
      power: '1010W',
      weight: '2.2кг',
      features: ['Плавный пуск', 'Защита от перегрузки', 'Быстрая замена диска'],
      inStock: 8,
      totalRented: 156,
      revenue: 234400,
      lastRented: '2024-07-18'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [newTool, setNewTool] = useState({
    name: '',
    brand: '',
    category: '',
    subcategory: '',
    price: '',
    description: '',
    power: '',
    weight: '',
    features: '',
    inStock: ''
  });

  const categories = ['Электроинструмент', 'Измерительные приборы', 'Садовая техника', 'Строительное оборудование'];
  const brands = ['Bosch', 'DeWalt', 'Makita', 'Metabo', 'Milwaukee', 'Ryobi'];

  const filteredTools = useMemo(() => {
    let filtered = tools;

    if (searchQuery) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    return filtered;
  }, [tools, searchQuery, selectedCategory]);

  const handleAddTool = () => {
    const id = Math.max(...tools.map(t => t.id)) + 1;
    const tool: Tool = {
      id,
      name: newTool.name,
      brand: newTool.brand,
      category: newTool.category,
      subcategory: newTool.subcategory,
      price: Number(newTool.price),
      image: '/img/5e130715-b755-4ab5-82af-c9e448995766.jpg',
      available: true,
      rating: 0,
      reviews: 0,
      description: newTool.description,
      power: newTool.power,
      weight: newTool.weight,
      features: newTool.features.split(',').map(f => f.trim()),
      inStock: Number(newTool.inStock),
      totalRented: 0,
      revenue: 0,
      lastRented: ''
    };

    setTools([...tools, tool]);
    setIsAddDialogOpen(false);
    setNewTool({
      name: '',
      brand: '',
      category: '',
      subcategory: '',
      price: '',
      description: '',
      power: '',
      weight: '',
      features: '',
      inStock: ''
    });
  };

  const handleEditTool = (tool: Tool) => {
    setEditingTool(tool);
    setIsEditDialogOpen(true);
  };

  const handleUpdateTool = () => {
    if (!editingTool) return;

    setTools(tools.map(tool => 
      tool.id === editingTool.id ? editingTool : tool
    ));
    setIsEditDialogOpen(false);
    setEditingTool(null);
  };

  const handleDeleteTool = (id: number) => {
    setTools(tools.filter(tool => tool.id !== id));
  };

  const toggleAvailability = (id: number) => {
    setTools(tools.map(tool =>
      tool.id === id ? { ...tool, available: !tool.available } : tool
    ));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Управление инструментами</h1>
          <p className="text-gray-600">Полный контроль над каталогом инструментов</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить инструмент
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Фильтры и поиск</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Поиск по названию, бренду или категории..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Все категории" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tools Table */}
      <ToolsTable 
        tools={filteredTools}
        onEditTool={handleEditTool}
        onDeleteTool={handleDeleteTool}
        onToggleAvailability={toggleAvailability}
      />

      {/* Dialogs */}
      <AddToolDialog 
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        newTool={newTool}
        setNewTool={setNewTool}
        onSubmit={handleAddTool}
        categories={categories}
        brands={brands}
      />

      <EditToolDialog 
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        tool={editingTool}
        setTool={setEditingTool}
        onSubmit={handleUpdateTool}
      />
    </div>
  );
};

export default AdminToolsManagement;