using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class BasketController : BaseApiController
    {
        private readonly string _bayerIdKey = "bayerId";
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpGet(Name = nameof(GetBasket))]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetriveBasket();
            if (basket is null) return NotFound();
            return MapBasketToDto(basket);
        }

        // api/basket?productId=3&quantity=2
        [HttpPost(Name = "AddItemToBasket")]
        public async Task<ActionResult<BasketDto>> AddItemToBasket([FromQuery] int productId, [FromQuery] int quantity)
        {
            // get basket || create basket 
            var basket = await RetriveBasket();
            if (basket is null) basket = await CreateBasket();

            // get product 
            var product = await _context.Products.FindAsync(productId);
            if (product is null) return NotFound();

            // add item 
            basket.AddItem(product, quantity);

            // save changes 
            var result = await _context.SaveChangesAsync() > 0;


            if (result)
            {
                var dto = MapBasketToDto(basket);
                return CreatedAtRoute(nameof(GetBasket), dto);
            }
            return BadRequest(new ProblemDetails { Title = "Problem saving new item to basket" });
        }



        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem([FromQuery] int productId, [FromQuery] int quantity)
        {
            // get basket 
            var basket = await RetriveBasket();
            if (basket is null) return NotFound();

            // remove item or reduce quantity
            basket.RemoveItem(productId, quantity);

            // save changes 
            var result = await _context.SaveChangesAsync() > 0;

            return result
            ? Ok()
            : BadRequest(new ProblemDetails { Title = " Problem removing item from the basket" });
        }




        private async Task<Basket> RetriveBasket()
        {
            return await _context.Baskets
             .Include(i => i.Items)
             .ThenInclude(p => p.Product)
             .FirstOrDefaultAsync(item => item.BuyerId == Request.Cookies[_bayerIdKey]);
        }


        private async Task<Basket> CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append(_bayerIdKey, buyerId, cookieOptions);
            var basket = new Basket
            {
                BuyerId = buyerId
            };

            await _context.Baskets.AddAsync(basket);

            return basket;
        }

        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Brand = item.Product.Brand,
                    Type = item.Product.Type,
                    Quantity = item.Quantity,
                }).ToList()
            };
        }

        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }
    }
}
