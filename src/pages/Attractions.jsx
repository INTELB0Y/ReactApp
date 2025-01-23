import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { attractionsApi } from '../services/attractions';
import { useDebounce } from '../hooks/useDebounce';
import { Loader } from '../components/ui/Loader';
import { SearchFilters } from '../components/ui/SearchFilters';

// Тут мы страничку делаем
const ITEMS_PER_PAGE = 5;
const categories = [
  { label: 'Смотровая площадка', value: 'Observation' },
  { label: 'ТЦ', value: 'ShopMall' },
  { label: 'Памятник', value: 'Monument' },
  { label: 'Историческое место', value: 'Historycal' },
  { label: 'Парк', value: 'Park' }
];


function Attractions() {
  const [currentPage, setCurrentPage] = useState(1); // открытая страница (ну типо какая по счёту идёт)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const debouncedSearch = useDebounce(searchTerm);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['attractions', currentPage, debouncedSearch, selectedCategory],
    queryFn: () => attractionsApi.getAll({
      page: currentPage, // Какая страница отображается
      limit: ITEMS_PER_PAGE, // Скок карточек на ней
      search: debouncedSearch, // Поиск
      category: selectedCategory, //Фильтр
    }),
    keepPreviousData: true,
    retry: false,
  });

  const attractions = data?.items ?? [];
  const hasMore = data?.hasMore ?? false;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Смена категории, и отображение странички с включёным филтром

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  // Крутящийся лоадер

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    // Ошибки и типо того

    if (isError) {
      return (
        <div className="text-center text-red-600 py-4">
          Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже.
        </div>
      );
    }

    if (attractions.length === 0) {
      return (
        <div className="text-center text-gray-600 py-4">
          По вашему запросу ничего не найдено
        </div>
      );
    }
    
    // Сама страница

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((attraction) => (
            <Link
              key={attraction.id}
              to={`/attraction/${attraction.id}`}
              className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={attraction.image}
                alt={attraction.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Нет+изображения';
                }}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{attraction.name}</h2>
                <p className="text-gray-600">{attraction.shortDescription}</p>
                <span className="inline-block mt-2 text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  {categories.find(cat => cat.value === attraction.category)?.label || attraction.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
          

        <div className="mt-8 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
          >
            Назад
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={!hasMore || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
          >
            Вперёд
          </button>
        </div>
      </>
    );
  };

  // Чуть выше шедевропагинация

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Достопримечательности Владивостока
      </h1>

      <SearchFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categories={categories}
      />

      {renderContent()}
    </div>
  );
}

export default Attractions;