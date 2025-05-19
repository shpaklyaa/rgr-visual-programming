Финальный проект по предмету Визуальное программирование и человеко-машинное взаимодействие. СибГУТИ 2 курс 2 семестр.\
\
\
Структура react-приложения:\
\
src/\
│\
├── components/\
│ ├── Navbar.jsx\
│ ├── ProfileTab.jsx\
│ └── ProtectedRoute.jsx\
│\
├── pages/\
│ ├── admin/AdminDashboard.jsx\
│ ├── author/AuthorDashboard.jsx\
│ ├── reviewer/AdminDashboard.jsx\
│ ├── Login.jsx\
│ └── Register.jsx\
│\
├── App.js\
└── index.js\
\
\
Структура бэкэнд части приложения:\
\
src/\
│\
├── Program.cs\
├── Controllers/\
│ ├── ArticlesController.cs\
│ ├── AuthController.cs\
│ ├── ReviewsController.cs\
│ └── UsersController.cs\
│\
├── Data/\
│ └── ApplicationDbContext.cs\
│\
├── Models/\
│ ├── Article.cs\
│ ├── Review.cs\
│ └── User.cs\
│\
├── Repositories/\
│ ├── ArticleRepository.cs\
│ ├── IArticleRepository.cs\
│ ├── IRepository.cs\
│ ├── IReviewRepository.cs\
│ ├── IUserRepository.cs\
│ ├── Repository.cs\
│ ├── ReviewRepository.cs\
│ └── UserRepository.cs\
│\
├── Services/\
│ ├── ArticleService.cs\
│ ├── AuthService.cs\
│ ├── IArticleService.cs\
│ ├── IAuthService.cs\
│ ├── IReviewService.cs\
│ ├── IUserService.cs\
│ ├── ReviewService.cs\
│ └── UserService.cs\