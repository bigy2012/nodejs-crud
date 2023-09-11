const db = require('./db');
const express = require('express')
const app = express();
const bodyParser = require('body-parser');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



app.get('/', function (req, res) {

    const product_id = req.query.product_id;

    if (req.query.product_id === '' || req.query.product_id === undefined) {
        db.query(
            'SELECT * FROM `tb_products`',
            function (err, results) {
                res.json(results)
            }
        );
    } else {

        db.query(
            'SELECT * FROM `tb_products` WHERE product_id = ' + product_id,
            function (err, results) {
                res.json(results)
            }
        );
    }
});


app.post('/post', function (req, res) {

    const getData = {
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_qty: req.body.product_qty
    };


    try {

        if (req.body.product_name !== undefined) {
            db.query(
                `INSERT INTO tb_products (product_name, product_description, product_qty, product_status) VALUES ('${getData.product_name}', '${getData.product_description}', '${getData.product_qty}', '1')`,
                function (err, results) {
                    res.json({
                        status: 'ok',
                        msg: 'Insert Successfully',
                    })
                }
            );
        }

    } catch (err) {
        res.json({
            status: 'error',
            msg: 'Insert Error',
        })
    }
});


app.put('/update', function (req, res) {

    const getData = {
        product_id: req.body.product_id,
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_qty: req.body.product_qty
    };


    try {

        if (req.body.product_name !== undefined) {
            db.query(
                `UPDATE tb_products SET product_name='${getData.product_name}',product_description='${getData.product_description}',product_qty='${getData.product_qty}' WHERE product_id = ` + getData.product_id,
                function (err, results) {
                    res.json({
                        status: 'ok',
                        msg: 'Update Successfully',
                    })
                }
            );
        }

    } catch (err) {
        res.json({
            status: 'error',
            msg: 'Update Error',
        })
    }
});


app.delete('/delete', function (req, res) {
    try {

        if (req.query.product_id !== undefined) {
            db.query(
                `DELETE FROM tb_products WHERE product_id =` + req.query.product_id,
                function (err, results) {
                    res.json({
                        status: 'ok',
                        msg: 'Update Successfully',
                    })
                }
            );
        }

    } catch (err) {
        res.json({
            status: 'error',
            msg: 'Update Error',
        })
    }

})




app.listen(8000)