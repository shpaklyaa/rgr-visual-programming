Финальный проект по предмету Визуальное программирование и человеко-машинное взаимодействие. СибГУТИ 2 курс 2 семестр.\
\
\
Структура react-приложения:\
\
src/\
│\
├── components/\
│   ├── ArticleList.js              # Список статей\
│   ├── ReviewList.js              # Список рецензий\
│   ├── UserForm.js                # Форма редактирования профиля\
│   ├── SubmitArticleForm.js       # Форма отправки статьи\
│   ├── WriteReviewForm.js         # Форма написания рецензии\
│   └── Navbar.js                  # Навигационная панель\
│\
├── pages/\
│   ├── AuthorDashboard.js          # Личный кабинет автора\
│   ├── ReviewerDashboard.js       # Личный кабинет рецензента\
│   ├── AdminDashboard.js           # Личный кабинет администратора\
│   ├── Login.js                   # Страница входа\
│   └── Register.js                # Страница регистрации\
│\
├── services/\
│   ├── apiService.js              # Обертка для работы с API\
│   └── authService.js             # Управление аутентификацией\
│\
├── context/\
│   ├── AuthContext.js            # Контекст аутентификации\
│   └── ArticlesContext.js         # Контекст статей\
│\
├── App.js                        # Основное приложение\
└── index.js                      # Точка входа\
\
\
Структура бэкэнд части приложения:\
\
src/\
│\
├── Program.cs                        # Точка входа приложения\
├── Startup.cs                        # Настройка приложения\
├── Models/                          # Модели данных\
│   ├── User.cs                      # Модель пользователя\
│   ├── Article.cs                   # Модель статьи\
│   ├── Review.cs                    # Модель рецензии\
│\
├── Repositories/                    # Репозитории для работы с базой данных\
│   ├── UserRepository.cs            # Репозиторий пользователей\
│   ├── ArticleRepository.cs         # Репозиторий статей\
│   ├── ReviewRepository.cs          # Репозиторий рецензий\
│\
├── Services/                        # Сервисы бизнес-логики\
│   ├── AuthenticationService.cs      # Сервис аутентификации\
│   ├── ArticleService.cs            # Сервис управления статьями\
│   ├── ReviewService.cs             # Сервис управления рецензиями\
│\
├── Data/                            # Конфигурация базы данных\
│   ├── ApplicationDbContext.cs     # Контекст базы данных\
│   └── Migrations/                  # Миграции Entity Framework\
│\
└── Logging/                         # Логирование (опционально)\