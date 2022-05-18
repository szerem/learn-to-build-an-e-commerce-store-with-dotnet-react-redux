using System;
using System.Collections.Generic;
using API.Entities.OrderAggregate;

namespace API.Dtos
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public ShippingAddress Address { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public List<OrderItemDto> OrderItems { get; set; }    
        public long Subtotal { get; set; }
        public long DeliveryFee { get; set; }
        public string OrderStatus { get; set; } 
        public long Total { get; set; } 
    }
}
