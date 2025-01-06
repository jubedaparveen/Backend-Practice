const CartModel = require("../../models/CartModel");

const createCartController = async (req, res) => {
    try {
        const { user, product, sizes, color } = req.body;
        const cartData = await CartModel.findOne({
            user,
            product,
            sizes,
            color
        });

        if (cartData) {
            const response = await CartModel.updateOne(
                { _id: cartData._id },
                {
                    $set: {
                        quantity: cartData.quantity + 1
                    }
                }
            );

            res.status(200).json({ message: 'CartModel success', data: response });
            return;
        }

        const dataToSave = new CartModel(req.body);
        const data = await dataToSave.save();
        res.status(200).json({ message: 'Add Cart successfully', data });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

const readCartController = async (req, res) => {
    try {

        // console.log(req.params, 'readCartController-----req.params')
        const data = await CartModel.find(req.params)
            .populate('user')
            .populate('sizes')
            .populate('color')
            .populate('product')

        const filepath = `${req.protocol}://${req.get('host')}/frank-and-oak-files/`;

        res.status(200).json({ message: 'success', data, filepath });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

const deleteCartController = async (req, res) => {
    try{
        const response = await CartModel.deleteOne(req.params);
        res.status(200).json({ message: 'success', data: response });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

const updateCartQuantityController = async (req, res) => {
    try{
        const data = await CartModel.updateOne(
            req.params,
            {
                $set:req.body
            }
        );

        res.status(200).json({message: 'success', data});
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'internal server error' });
    }
}


module.exports = {
    createCartController,
    readCartController,
    deleteCartController,
    updateCartQuantityController
}