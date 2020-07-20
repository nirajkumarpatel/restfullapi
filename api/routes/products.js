const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../product');

router.get("/", (req, res, next) => {
    Product.find()
      .exec()
      .then(docs => {
         console.log(docs);
        //   if (docs.length >= 0) {
        res.status(200).json(docs);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });   

router.post('/', (req, res, next) => {
    // console.log(typeof req.body.name)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });



    product
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    console.log(product)
    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    });
});

router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    console.log(id);
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err: error });  // 500 internal server error (configuration errror)
        });
});

// router.patch('/:productId', (req, res, next) => {
//     res.status(200).json({
//         message: 'Updated product!'
//     });
// });

router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })  //$set operator replaces the value of a field with the specified value//
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:productId', (req, res, next) => {
const id=req.params.productId;
Product.remove({_id:id})
.exec()
.then(result => { 
    res.status(200).json(result);
})
.catch(err=> {
    console.log(err);
    res.status(500).json({
error:err
    });
});
});



module.exports = router;