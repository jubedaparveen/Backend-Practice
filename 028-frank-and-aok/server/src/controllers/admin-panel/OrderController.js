const OrderModel = require('../../models/Order');


const readOrderController = async (req, res) => {
    try{ 
        const data = await OrderModel.find().populate('users');
        console.log(data);
        const filepath = `${req.protocol}://${req.get('host')}/fran-and-oak-order/`;
        res.status(200).json({message: 'View Order successfully', data });
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal server error'})
    }
};

module.exports = {
    readOrderController
}