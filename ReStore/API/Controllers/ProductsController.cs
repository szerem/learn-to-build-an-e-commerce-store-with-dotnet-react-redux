using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class ProductsController : BaseApiController
  {
    private readonly StoreContext _context;

    public ProductsController(StoreContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts([FromQuery] string orderBy, [FromQuery] string searchTerm)
    {
      var query = _context
      .Products
      .Sort(orderBy)
      .Search(searchTerm)
      .AsQueryable();

      var products = await query.ToListAsync();
      return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
      var product = await _context.Products.FindAsync(id);

      if (product is null)
        return NotFound();

      return Ok(product);
    }
  }
}
