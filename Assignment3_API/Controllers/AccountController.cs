using Assignment3_Backend.Models;
using Assignment3_Backend.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Assignment3_Backend.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<AppUser> _userManager;

        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        //[HttpGet("user")]
        //[Authorize]
        //public async Task<ActionResult<UserViewModel>> GetCurrentUser()
        //{

        //    var user = await _userManager.GetUserAsync(User);

        //    return new UserViewModel
        //    {
        //        emailaddress = user.Email,
        //        Token = _tokenService.CreateToken(user),

        //    };
        //}


        [HttpPost("register")]
        public async Task<ActionResult<UserViewModel>> Register(RegisterVM registerVM)
        {
            var userchecker = await _userManager.FindByEmailAsync(registerVM.emailaddress);

            if (userchecker != null)
            {
                return BadRequest("This email has been detected on our system.");
            }
            var user = new AppUser { Email = registerVM.emailaddress, UserName = registerVM.emailaddress };

            var result = await _userManager.CreateAsync(user, registerVM.password);

            if (!result.Succeeded) return BadRequest();

            return new UserViewModel
            {
                emailaddress = registerVM.emailaddress,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserViewModel>> Login(RegisterVM loginvm)
        {
            var user = await _userManager.FindByEmailAsync(loginvm.emailaddress);

            if (user == null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginvm.password, false);

            if (!result.Succeeded) return Unauthorized();

            return new UserViewModel
            {
                emailaddress = user.Email,
                Token = _tokenService.CreateToken(user),
            };
        }

    }
}
