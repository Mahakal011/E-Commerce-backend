const Order = require('../models/order');
const OrderItem = require('../models/orderItem');


const createOrder = async(order) => {
    try{
        console.log(order);
        const _order = await Order.create({
            userId: order.userId,
        });
        await OrderItem.bulkCreate(order.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            orderId: _order.id
        }))
        );
        console.log('Order created successfully');
        return order;
    }
    catch(error){
        console.error('Error creating Product:', error);
        throw error;
    }
};

const getOrder = async(id) => {
    try {
        const order = await Order.findByPk(parseInt(id),
        { include: ['items']});
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    }
    catch(error){
        console.error('Error fetching Order:', error);
        throw error;
    }
};

const getAllOrder = async() => {
    try{
        const order = await Order.findAll({ include: ['items']});
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    }catch(error){
        console.error('Error fetching Order:', error);
        throw error;
    }
};

const updateOrder = async(id, orderData) => {
    try{
        const order = await Order.findByPk(id, orderData);
        if (!order) {
            throw new error('Order not found');
        }
        await order.update(orderData);
        console.log('Order updated successfully.');
        return order;
    }catch(error){
        console.error('Error updating Order:', error);
        throw error;
    }
};

const deleteOrder = async(id) => {
    try{
        const order = await Order.findByPk(id);
        if(!order){
            throw new Error('Order not found');
        }
        await order.destroy();
        console.log('Order deleted successfully.');

    }catch(error){
        console.error('Error deleting Order:', error);
        throw error;
    }

};

module.exports ={
    createOrder,
    getOrder,
    getAllOrder,
    updateOrder,
    deleteOrder
};