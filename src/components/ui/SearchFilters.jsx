import { Input } from './Input';
import { Select } from './Select';

export function SearchFilters({ searchTerm, onSearchChange, selectedCategory, onCategoryChange, categories }) {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <Input
        type="text"
        placeholder="Поиск по названию..."
        className="flex-1"
        value={searchTerm}
        onChange={onSearchChange}
      />

      <Select
        value={selectedCategory}
        onChange={onCategoryChange}
        className="min-w-[200px]"
      >
        <option value="">Все категории</option>
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </Select>
    </div>
  );
}