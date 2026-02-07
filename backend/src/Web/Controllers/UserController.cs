using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Web.Models;
using Models.Requests;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Enums;
using System.Security.Claims;


namespace Web.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{

    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;

    }


    [HttpPost("create")]
    public async Task<ActionResult<UserDto>> CreateUser([FromBody] CreateUserRequest request)
    {
        var newUser = await _userService.CreateUserAsync(request.Email
         , request.Password
         , request.Name
         , request.BirthDate);

        return CreatedAtAction(nameof(GetUserInfo), new { Id = newUser.Id }, UserDto.Create(newUser));
    }


    [HttpGet("userInfo")]
    [Authorize(Roles = nameof(UserType.Admin))]
    public async Task<ActionResult<UserDto>> GetUserInfo([FromQuery] int userId)
    {

        var user = await _userService.GetUserInfoAsync(userId);

        return UserDto.Create(user);
    }

    [HttpGet("completeUserInfo")]
    [Authorize]
    public async Task<ActionResult<UserWithRelationsDto>> GetCompleteUserInfo()
    {
        var claimValue = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrWhiteSpace(claimValue))
            return Unauthorized();

        int userId = int.Parse(claimValue);

        var user = await _userService.GetUserInfoWithJoinsAsync(userId);

        return UserWithRelationsDto.Create(user);
    }

    [HttpGet("allUsersInfo")]
    [Authorize(Roles = nameof(UserType.Admin))]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsersInfo()
    {
        var list = await _userService.GetAllUsersInfoAsync();
        return UserDto.Create(list);
    }

    [HttpPut("update")]
    [Authorize]
    public async Task<ActionResult<UserDto>> UpdateUser([FromBody] UpdateUserRequest request)
    {
        var claimValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(claimValue))
            return Unauthorized();

        int requesterId = int.Parse(claimValue);

        bool isAdmin = User.IsInRole(nameof(UserType.Admin));

        int targetUserId = request.TargetUserId ?? requesterId;

        var updatedUser = await _userService.UpdateUserAsync(
            requesterId,
            targetUserId,
            isAdmin,
            request.Email,
            request.Name,
            request.BirthDate,
            request.UserType
        );

        return Ok(UserDto.Create(updatedUser));
    }


    [HttpPut("changePassword")]
    [Authorize]
    public async Task<IActionResult> ChangePassword([FromBody] UpdateUserPasswordRequest request)
    {

        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        await _userService.ChangePasswordAsync(userId, request.CurrentPassword, request.NewPassword);

        return Ok(new { message = "Contraseña actualizada correctamente." });
    }

    [HttpPut("updateName")]
    [Authorize]
    public async Task<ActionResult<UserDto>> UpdateUserName([FromBody] UpdateUserNameRequest request)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var updatedUser = await _userService.UpdateUserNameAsync(userId, request.Name);
        return Ok(UserDto.Create(updatedUser));
    }

    [HttpDelete("delete")]
    [Authorize]
    public async Task<IActionResult> DeleteUser([FromBody] int? targetUserId)
    {
        var claimValue = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrWhiteSpace(claimValue))
            return Unauthorized();

        int requesterId = int.Parse(claimValue);

        bool isAdmin = User.IsInRole(nameof(UserType.Admin));

        int userIdToDelete = targetUserId ?? requesterId;

        await _userService.DeleteUserAsync(
        requesterId,
        userIdToDelete,
        isAdmin
        );
        return NoContent();
    }
}