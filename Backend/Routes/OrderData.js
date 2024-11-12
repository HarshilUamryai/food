const express = require("express");
const router = express.Router();
const Order = require('../models/Order');

router.post('/orderData', async (req, res) => {
    try {
        let data = req.body.order_data;
        if (!Array.isArray(data)) {
            return res.status(400).send("Invalid data format. Expected an array.");
        }

        // Initialize the order_date
        const orderDate = { order_date: req.body.order_date || new Date().toDateString() };
        data.splice(0, 0, orderDate); // Insert the order date at the beginning

        let eid = await Order.findOne({ "Email": req.body.Email });
        console.log(eid);

        if (eid === null) {
            await Order.create({
                Email: req.body.Email,
                order_data: [data]
            });
            res.json({ success: true });
        } else {
            await Order.findOneAndUpdate(
                { Email: req.body.Email },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error: " + error.message);
    }
});

module.exports = router;
