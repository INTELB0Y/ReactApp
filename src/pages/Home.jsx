function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Добро пожаловать во Владивосток!</h1>
      <div className="prose lg:prose-xl mx-auto">
        <p className="text-lg mb-6">
          Владивосток - жемчужина Дальнего Востока России, город-порт, расположенный на берегу Японского моря.
          Это место, где Россия встречается с Азией, где современность гармонично сочетается с историей.
        </p>
        <p className="text-lg mb-6">
          Основанный в 1860 году как военный пост, сегодня Владивосток является крупным культурным,
          экономическим и туристическим центром региона. Город славится своей уникальной архитектурой,
          живописными мостами и богатым культурным наследием.
        </p>
        
        <div className="my-8 rounded-lg overflow-hidden shadow-lg">
        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad8d90744bf2b6325de3d02de06f4ec3f06b9a15fee4a93797960876a00755607&amp;source=constructor" 
        width="896" 
        height="404" 
        frameborder="0"></iframe>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold">Что посмотреть?</h2>
          <ul className="list-disc pl-6">
            <li>Знаменитый мост на остров Русский</li>
            <li>Историческая набережная Цесаревича</li>
            <li>Видовые площадки города</li>
            <li>Владивостокская крепость</li>
            <li>Приморский океанариум</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Ну хтмл и хтмл, чё бубнеть то?

export default Home;