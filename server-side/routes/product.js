const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Mongoose = require("mongoose");

router.get("/products", (req, res, next) => {
    const products = Product.find({}, (err, products) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                data: products
            });
        }
    })

});

router.get("/product/:id", (req, res, next) => {

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


router.post("/Orders", (req, res, next) => {
    console.log(req.body);

    let newproduct = new Product({
        _id: new Mongoose.Types.ObjectId(),
        productname: req.body["productname"],
        image: req.body["image"],
        description: req.body["description"],
        amount: req.body["amount"]
    });

    newproduct.save((err) => {
        if (err) {
            res.status(400).json({
                message: "The Product was not saved",
                errorMessage: err.message
            })
        } else {
            res.status(201).json({
                message: "Product was saved successfully"
            })
        }
    })

});

router.put("/product/:id", (req, res, next) => {
    console.log(req.body);
    console.log(req.params.id);
    let updatedProduct = Product.findByIdAndUpdate(req.params.id, {
        $set: {
            productname: req.body.productname,
            description: req.body.description,
            amount: req.body.amount,
            image: req.body.image
        }
    }, (err, product) => {
        if (err) {
            res.status(400).json({
                message: "The Product was not saved",
                errorMessage: err.message
            })
        } else {
            res.status(200).json({
                message: "Product was updated successfully",
                product: product
            });
        }
    })
});
router.route("/product/:id").delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product deleted.'))
        .catch(err => res.status(400).json('Error: ' * err));
});

module.exports = router;