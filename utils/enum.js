const OrderStatus = Object.freeze({
    CONFIRMED: 'CONFIRMED',
    SHIPPED: 'SHIPPED',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED'
});

// function processOrder(order) {
//     if (order.status === OrderStatus.NEW) {
//         // Process new order
//         order.status = OrderStatus.PROCESSING;
//     }
// }