import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { attractionsApi } from '../services/attractions';
import { Loader } from '../components/ui/Loader';

// ИДЁТ РЕМОНТ, ВХОД ВОСПРЕЩЁН

function AttractionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: attraction, isLoading, isError } = useQuery({
    queryKey: ['attraction', id],
    queryFn: () => attractionsApi.getById(id),
    enabled: !!id,
    retry: false,
    onError: () => {
      navigate('/attractions');
    }
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !attraction) {
    return (
      <div className="text-center text-red-600 py-4">
        Произошла ошибка при загрузке данных
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{attraction.name}</h1>
      <img
        src={attraction.image}
        alt={attraction.name}
        className="w-full h-96 object-cover rounded-lg mb-6"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/800x600?text=Нет+изображения';
        }}
      />
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded">
            {attraction.category}
          </span>
        </div>
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Описание</h2>
          <p className="text-gray-700 mb-6">{attraction.description}</p>

          <h2 className="text-2xl font-semibold mb-4">История</h2>
          <p className="text-gray-700 mb-6">{attraction.history}</p>

          {attraction.facts && attraction.facts.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Интересные факты</h2>
              <ul className="list-disc pl-6">
                {attraction.facts.map((fact, index) => (
                  <li key={`fact-${index}`} className="text-gray-700 mb-2">
                    {fact}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AttractionDetails;