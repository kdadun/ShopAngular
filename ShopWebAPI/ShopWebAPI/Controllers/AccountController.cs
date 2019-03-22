using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using ShopWebAPI.Models;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
namespace ShopWebAPI.Controllers
{
    public class AccountController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();

        [Route("api/User/Register")]
        [HttpPost]
        [AllowAnonymous]
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        public IdentityResult Register([FromBody] AccountModel model)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);
            var user = new ApplicationUser() { UserName = model.UserName, Email = model.Email };
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Address = " ";
            user.Telephone = " ";
            user.Image = " ";
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 3
            };
            IdentityResult result = manager.Create(user, model.Password);
            manager.AddToRoles(user.Id,"user");
            return result;
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("api/TakeUserName/{username}")]
        public async Task<IHttpActionResult> TakeUserName(string username)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);

            var result = await userStore.FindByNameAsync(username);


            //return (result.Result == null) ? Ok(false) : Ok(!string.IsNullOrEmpty(result.Result.UserName));
            return (result == null) ? Ok(false) : Ok(!string.IsNullOrEmpty(result.UserName));

        }
        [HttpGet]
        [AllowAnonymous]
        [Route("api/ChangePassword/")]
        public async Task<IHttpActionResult> ChangePassword ([FromBody]string oldPassword, [FromBody]string newPassword)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);
            var result = await manager.ChangePasswordAsync(User.Identity.GetUserId(), oldPassword, newPassword);
            if(result.Succeeded)
            {
                return Ok();
            }
            return NotFound();
        }
    
        [HttpGet]
        [Route("api/GetUserProfile")]
        public IHttpActionResult GetUserProfile()
        {
            var name = (ClaimsIdentity)User.Identity;
            var data = name.Claims.First().Value;
            if (name != null && data !=null)
            {
                var model = db.Users.FirstOrDefault(x => x.UserName == data);
                AccountModel profile = new AccountModel()
                {
                    UserName = model.UserName,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.Email,
                    Telephone = model.Telephone,
                    Address = model.Address,
                    Image = model.Image
                };
                return Ok(profile);
            }
           else
            {
                return NotFound();
            }  
        }

        [HttpPost]
        [Route("api/ChangeProfile")]
        [ResponseType(typeof(AccountModel))]
        public async Task<IHttpActionResult> ChangeProfile([FromBody]AccountModel model)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);
            var user = await manager.FindByNameAsync(model.UserName);
            if (user != null)
            {
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.Email = model.Email;
                user.Telephone = model.Telephone;
                user.Address = model.Address;
                if (model.Image != null)
                {
                    user.Image = model.Image;
                }
                IdentityResult result = await manager.UpdateAsync(user);
                return Ok(model); 
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Route("api/AddToWishlist")]
        public IHttpActionResult AddToWishlist(WishList wishList)
        {
            if(wishList !=null)
            {
                WishList wishes = new WishList()
                {
                    ProductId = wishList.ProductId,
                    UserId = wishList.UserId
                };
                db.WishList.Add(wishes);
                db.SaveChanges();
                return Ok();
            }
            return NotFound();
        }
        [HttpGet]
        [Route("api/GetWishList/{userId}")]
        public IHttpActionResult GetWishList (string userId)
        {
            
            if (userId != null)
            {
                var userWishList = db.WishList.Where(z => z.UserId == userId)
                   .Select(y => new { y.Products, y.UserId, y.Id})
                   .Distinct()
                   .ToList();
                return Ok(userWishList);
            }
            else
            {
                return NotFound();
            }   
        }
        [HttpDelete]
        [Route("api/RemoveFromWishList/{Id}")]
        public IHttpActionResult RemoveFromWishList(int Id)
        {
            WishList wishes = db.WishList.Find(Id);
            if (wishes == null)
            {
                return NotFound();
            }

            db.WishList.Remove(wishes);
            db.SaveChanges();

            return Ok(wishes);
        }
    }
}
