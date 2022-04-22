using System;
using System.Linq;
using System.Threading.Tasks;
using API.Constants;
using API.Data;
using API.Dtos;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

  public class BasketController : BaseApiController
  {
    private readonly StoreContext _context;

    public BasketController(StoreContext context)
    {
      _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    [HttpGet(Name = nameof(GetBasket))]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
      var basket = await RetriveBasket(GetBuyerId());
      if (basket is null) return NotFound();
      return basket.MapBasketToDto();
    }

    // api/basket?productId=3&quantity=2
    [HttpPost(Name = "AddItemToBasket")]
    public async Task<ActionResult<BasketDto>> AddItemToBasket([FromQuery] int productId, [FromQuery] int quantity)
    {
      // get basket || create basket 
      var basket = await RetriveBasket(GetBuyerId());
      if (basket is null) basket = await CreateBasket();

      // get product 
      var product = await _context.Products.FindAsync(productId);
      if (product is null) return BadRequest(new ProblemDetails { Title = "Product not found" });

      // add item 
      basket.AddItem(product, quantity);

      // save changes 
      var result = await _context.SaveChangesAsync() > 0;


      if (result)
      {
        var dto = basket.MapBasketToDto();
        return CreatedAtRoute(nameof(GetBasket), dto);
      }
      return BadRequest(new ProblemDetails { Title = "Problem saving new item to basket" });
    }



    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem([FromQuery] int productId, [FromQuery] int quantity)
    {
      // get basket 
      var basket = await RetriveBasket(GetBuyerId());
      if (basket is null) return NotFound();

      // remove item or reduce quantity
      basket.RemoveItem(productId, quantity);

      // save changes 
      var result = await _context.SaveChangesAsync() > 0;

      return result
      ? Ok()
      : BadRequest(new ProblemDetails { Title = " Problem removing item from the basket" });
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


    private async Task<Basket> CreateBasket()
    {
      var buyerId = User.Identity?.Name;
      if (string.IsNullOrEmpty(buyerId))
      {
        buyerId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
        Response.Cookies.Append(Keys.BuyerId, buyerId, cookieOptions);
      }

      var basket = new Basket { BuyerId = buyerId };
      await _context.Baskets.AddAsync(basket);

      return basket;
    }

    private string GetBuyerId()
    {
      return User.Identity?.Name ?? Request.Cookies[Keys.BuyerId];
    }
  }
}
