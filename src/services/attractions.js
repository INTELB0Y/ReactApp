import { api } from '../lib/axios';

export const attractionsApi = {
  getAll: async ({ page = 1, limit = 5, search = '', category = '' } = {}) => {
    try {
      const params = new URLSearchParams();
      
      // Ну пагинация типо
      params.append('page', String(page));
      params.append('limit', String(limit));
      
      // Поиск по названию
      if (search) {
        params.append('search', search);
      }
      
      // Тут короче фильтр
      if (category) {
        // Если вдруг нужно меняем значения чтоб они совпадали с мок апе
        const categoryMap = {
          'Historical': 'HistoricalPlace',
          'Observation': 'Observation',
          'ShopMall': 'ShopMall',
          'Monument': 'Monument'
        };
        
        const mappedCategory = categoryMap[category] || category;
        params.append('category', mappedCategory);
      }

      const { data } = await api.get(`/Attractions`, { params });
      

      const items = Array.isArray(data) ? data : [];
      

      const processedItems = items.map(item => {

        const categoryMap = {
          'HistoricalPlace': 'Historical',
          'Observation': 'Observation',
          'ShopMall': 'ShopMall',
          'Monument': 'Monument'
        };

        return {
          id: String(item.id || ''),
          name: String(item.name || 'Без названия'),
          shortDescription: String(item.shortDescription || ''),
          image: String(item.image || ''),
          category: categoryMap[item.category] || item.category || '',
          description: String(item.description || ''),
          history: String(item.history || ''),
          facts: Array.isArray(item.facts) ? item.facts.map(String) : []
        };
      });

      return {
        items: processedItems,
        hasMore: processedItems.length >= limit
      };
    } catch (error) {
      console.error('Error fetching attractions:', error);
      throw new Error('Failed to fetch attractions');
    }
  },

  getById: async (id) => {
    try {
      if (!id) {
        throw new Error('Attraction ID is required');
      }

      const { data } = await api.get(`/Attractions/${id}`);
      
      if (!data) {
        throw new Error('Attraction not found');
      }
      const categoryMap = {
        'HistoricalPlace': 'Historical',
        'Observation': 'Observation',
        'ShopMall': 'ShopMall',
        'Monument': 'Monument'
      };

      return {
        id: String(data.id || id),
        name: String(data.name || 'Без названия'),
        description: String(data.description || ''),
        image: String(data.image || ''),
        category: categoryMap[data.category] || data.category || '',
        history: String(data.history || ''),
        facts: Array.isArray(data.facts) ? data.facts.map(String) : []
      };
    } catch (error) {
      console.error('Error fetching attraction details:', error);
      throw new Error('Failed to fetch attraction details');
    }
  },
};