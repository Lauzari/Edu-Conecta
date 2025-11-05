using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Web.Models;
using Models.Requests;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Enums;

namespace Web.Controllers;

[ApiController]
[Route("[controller]")]
// [Authorize] --> Cuando agreguemos Autenticación/Autorización
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
    [Authorize]
    public async Task<ActionResult<UserDto>> GetUserInfo([FromQuery] int id)
    {
        var user = await _userService.GetUserInfoAsync(id);

        return UserDto.Create(user);
    }

    [HttpGet("completeUserInfo")]
    [Authorize]
    public async Task<ActionResult<UserWithRelationsDto>> GetCompleteUserInfo([FromQuery] int id)
    {
        var user = await _userService.GetUserInfoWithJoinsAsync(id);

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
        var updatedUser = await _userService.UpdateUserAsync(
        request.Id,
        request.Email,
        request.Name,
        request.BirthDate,
        request.UserType
        );
        return Ok(UserDto.Create(updatedUser));
    }

    //AGREGAR MÁS SEGURIDAD (VERIFICACIÓN DE ID)
    [HttpDelete("delete")]
    [Authorize]
    public async Task<IActionResult> DeleteUser([FromQuery] int id)
    {
        await _userService.DeleteUserAsync(id);
        return NoContent();
    }
}