using Microsoft.AspNetCore.Mvc;
using Core.Services;
using Microsoft.AspNetCore.Authorization;
using Web.Models;
using Models.Requests;

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
    public ActionResult<UserDto> CreateUser([FromBody] CreateUserRequest request)
    {
        var newUser = _userService.CreateUser(request.Email
         , request.Password
         , request.Name
         , request.BirthDate
         , request.UserType);

        return CreatedAtAction(nameof(GetUserInfo), new { Id = newUser.Id }, UserDto.Create(newUser));
    }


    [HttpGet("userInfo")]
    public ActionResult<UserDto> GetUserInfo([FromQuery] int id)
    {
        var user = _userService.GetUserInfo(id);

        return UserDto.Create(user);
    }

    [HttpGet("completeUserInfo")]
    public ActionResult<UserDto> GetCompleteUserInfo([FromQuery] int id)
    {
        var user = _userService.GetUserInfoWithJoins(id);

        return UserDto.Create(user);
    }

    [HttpGet("allUsersInfo")]
    public ActionResult<List<UserDto>> GetAllUsersInfo()
    {
        var list = _userService.GetAllUsersInfo();
        return UserDto.Create(list);
    }

    [HttpPut("update")]
    public ActionResult<UserDto> UpdateUser([FromBody] UpdateUserRequest request)
    {
        var updatedUser = _userService.UpdateUser(
        request.Id,
        request.Email,
        request.Name,
        request.BirthDate,
        request.UserType
        );

        if (updatedUser == null)
            return NotFound($"User with ID {request.Id} not found.");

        return Ok(UserDto.Create(updatedUser));
    }

    [HttpDelete("delete")]
    public IActionResult DeleteUser([FromQuery] int id)
    {
        _userService.DeleteUser(id);
        return NoContent();
    }
}