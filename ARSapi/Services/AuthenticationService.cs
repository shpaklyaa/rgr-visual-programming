public class AuthenticationService
{
    private readonly UserRepository _userRepository;

    public AuthenticationService(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<bool> Authenticate(string email, string password)
    {
        var user = await _userRepository.GetUserByEmail(email);
        if (user == null) return false;

        // Проверка пароля (используйте хеширование в реальном проекте)
        return user.PasswordHash == password;
    }

    public async Task CreateUser(string name, string email, string password, string role)
    {
        var user = new User
        {
            Name = name,
            Email = email,
            PasswordHash = password, // Используйте хеширование в реальном проекте
            Role = role
        };

        await _userRepository.AddUser(user);
    }
}