const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Mongoose = require("mongoose");

router.get("/api/product", (req, res) => {
    //return all items
    const product = Product.find({}, (err, items) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                data: items
            });
        }
    })

});

router.get("/api/product/:id", (req, res) => {

    let id = req.params.id;

    let product = Product.findById(id, (err, product) => {
        if (err) {
            res.status(400).json({
                message: "There was an error fetching the document",
                errorMessage: err.errorMessage
            })
        } else {
            res.status(200).json({
                message: "Product found",
                product: product
            })
        }
    })

})


//add an item
router.post("/api/orders", (req, res) => {
    console.log(req.body);

    let newproduct = new Product({
        _id: new Mongoose.Types.ObjectId(),
        name: req.body["name"],
        image: req.body["image"],
        description: req.body["description"],
        amount: req.body["amount"]
    });

    newproduct.save((err) => {
        if (err) {
            res.status(400).json({
                message: "The Item was not saved",
                errorMessage: err.message
            })
        } else {
            res.status(201).json({
                message: "Item was saved successfully"
            })
        }
    })

});

router.put("/api/product/:id", (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    let updatedProduct = Product.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            description: req.body.description,
            amount: req.body.amount,
            image: req.body.image
        }
    }, (err, product) => {
        if (err) {
            res.status(400).json({
                message: "The Item was not saved",
                errorMessage: err.message
            })
        } else {
            res.status(200).json({
                message: "Item was updated successfully",
                item: item
            });
        }
    })

});

router.route('/api/product/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product deleted.'))
        .catch(err => res.status(400).json('Error: ' * err));
});

module.exports = router;