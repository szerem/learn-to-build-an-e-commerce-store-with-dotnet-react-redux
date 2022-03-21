using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
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

        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasket()
        {
            var basket = await _context.Baskets
             .Include(i => i.Items)
             .ThenInclude(p => p.Product)
             .AsNoTracking()
             .FirstOrDefaultAsync(item => item.BuyerId == Request.Cookies["bayerId"]);

            if (basket is null) return NotFound();

            return basket;
        }

        [HttpPost]
        public async Task<ActionResult<Basket>> AddItemToBasket(int productId, int quantity)
        {
            // get basket 
            // create basket
            // get product 
            // add item 
            // save changes 
            return StatusCode(201);
        }


        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            // get basket 
            // remove item or reduce quantity
            // save changes 
            return Ok();
        }
    }
}
