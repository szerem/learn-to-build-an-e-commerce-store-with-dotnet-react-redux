using System;
using System.Linq;
using System.Threading.Tasks;
using API.Constants;
using API.Data;
using API.Dtos;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
    public class AccountController : BaseApiController
    {

        private readonly StoreContext _context;
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public TokenService TokenService => _tokenService;

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login([FromBody] LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user is null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();

            var userBasket = await RetriveBasket(loginDto.Username);
            var anonBasket = await RetriveBasket(Request.Cookies[Keys.BuyerId]);

            if (anonBasket != null)
            {
                if (userBasket != null) _context.Baskets.Remove(userBasket);
                anonBasket.BuyerId = user.UserName;
                Response.Cookies.Delete(Keys.BuyerId);
                await _context.SaveChangesAsync();
            }

            var basket = (anonBasket ?? userBasket)?.MapBasketToDto();
            var token = await _tokenService.GenerateToken(user);
            return new UserDto
            {
                Email = user.Email,
                Token = token,
                Basket = basket,
            };
        }


        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User { UserName = registerDto.Username, Email = registerDto.Email };
            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");
            return StatusCode(201);
        }




        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var userBasket = await RetriveBasket(User.Identity.Name);
            var token = await _tokenService.GenerateToken(user);
            return new UserDto
            {
                Email = user.Email,
                Token = token,
                Basket = userBasket?.MapBasketToDto(),
            };
        }

        [Authorize]
        [HttpGet("savedAddress")]
        public async Task<ActionResult<UserAddress>> GetSavedAddress()
        {
            return await _userManager.Users
            .Where(x => x.UserName == User.Identity.Name)
            .Select(user => user.Address)
            .FirstOrDefaultAsync();
        }

        private async Task<Basket> RetriveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete(Keys.BuyerId);
                return null;
            }

            return await _context.Baskets
             .Include(i => i.Items)
             .ThenInclude(p => p.Product)
             .FirstOrDefaultAsync(item => item.BuyerId == buyerId);
        }

    }
}
