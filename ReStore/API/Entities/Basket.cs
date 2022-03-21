using System.Collections.Generic;
using System.Linq;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();


        public void AddItem(Product product, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (item is null)
            {
                Items.Add(new BasketItem
                {
                    Product = product,
                    Quantity = quantity
                });
            }
            else
            {
                item.Quantity += quantity;
            }
        }

        public void RemoveItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if (item is null)
            {
               return;
            }
            else
            {
                item.Quantity -= quantity;
            }
            if (item.Quantity == 0)
            {
                Items.Remove(item);
            }
        }
    }
}
