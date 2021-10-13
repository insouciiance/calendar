using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using calendar_backend.Models;
using calendar_backend.Models.DbContexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace calendar_backend.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly UsersDbContext _users;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountController(UsersDbContext users, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _users = users;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody]RegisterCredentials credentials)
        {
            var user = new ApplicationUser()
            {
                UserName = credentials.Username,
                Email = credentials.Email,
                DateRegistered = DateTime.Now
            };

            var result = await _userManager.CreateAsync(user, credentials.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new { errorsList = result.Errors });
            }

            await _signInManager.SignInAsync(user, false);

            return new JsonResult(new
            {
                token = new
                {
                    value = CreateToken(user),
                    expires = DateTime.UtcNow.AddDays(2)
                },
                user = new
                {
                    id = user.Id,
                    username = user.UserName,
                    email = user.Email,
                    dateRegistered = user.DateRegistered
                }
            });
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody]LoginCredentials credentials)
        {
            var user = _users.Users.FirstOrDefault(x => x.UserName == credentials.Username);

            if (user == null)
            {
                return BadRequest(new { errorsList = new[] { new { code = "IncorrectUsernameOrPassword", description = "Username or password are incorrect" } } });
            }

            var result = await _signInManager.PasswordSignInAsync(user, credentials.Password, false, false);

            if (!result.Succeeded)
            {
                return BadRequest(new { errorsList = new[] { new { code = "IncorrectUsernameOrPassword", description = "Username or password are incorrect" } } });
            }

            return new JsonResult(new
            {
                token = new
                {
                    value = CreateToken(user),
                    expires = DateTime.UtcNow.AddDays(2)
                },
                user = new
                {
                    id = user.Id,
                    username = user.UserName,
                    email = user.Email,
                    dateRegistered = user.DateRegistered
                }
            });
        }

        [Route("logout")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();

            return Ok();
        }

        [Route("getuser")]
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserFromToken()
        {
            string userId = HttpContext.User.Claims.First().Value;

            ApplicationUser user = await _users.Users.FindAsync(userId);

            return new JsonResult(new
            {
                id = user.Id,
                username = user.UserName,
                email = user.Email,
                dateRegistered = user.DateRegistered
            });
        }

        string CreateToken(ApplicationUser user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id)
            };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret phrase"));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(
                signingCredentials: signingCredentials,
                claims: claims,
                expires: DateTime.Now.AddDays(2)
            );
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}