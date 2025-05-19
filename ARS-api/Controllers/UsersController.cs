using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ARSapi.Services;
using System.Security.Claims;

namespace ARSapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _userService.GetUsersAsync();
        return Ok(users);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserDto request)
    {
        var (success, user, errorMessage) = await _userService.CreateUserAsync(request);

        if (!success)
        {
            return BadRequest(errorMessage ?? "Failed to create user.");
        }
        return Ok(new { message = "User created successfully", userId = user?.Id, user });
    }

    [HttpPut("{id}/block")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ToggleBlockUser(int id)
    {
        var (success, message, errorMessage) = await _userService.ToggleBlockUserAsync(id);
        if (!success)
        {
            if (errorMessage == "User not found")
                return NotFound(errorMessage);
            return BadRequest(errorMessage ?? "Operation failed.");
        }
        return Ok(new { message });
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var (success, errorMessage) = await _userService.DeleteUserAsync(id);
        if (!success)
        {
            if (errorMessage == "User not found")
                return NotFound(errorMessage);
            return BadRequest(errorMessage ?? "Failed to delete user.");
        }
        return Ok(new { message = "User deleted successfully" });
    }

    [HttpGet("profile")]
    [Authorize]
    public async Task<IActionResult> GetProfile()
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
        var user = await _userService.GetUserByIdAsync(userId);
        if (user == null)
            return NotFound("User not found");
        return Ok(user);
    }
}