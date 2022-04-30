const ProductModel = require('../models/product.model');

module.exports.index = async (req, res) => {
    const products = await ProductModel.find();

    let perPage = 9;
    let size = Math.ceil(products.length / perPage);
    let page = parseInt (req.query.page) || 1;
    let action = req.query.action;

    if(action === 'prev') {
        if(page === 1) return;
        page = page - 1;
    } 
     
    if(action === 'next') {
        if(page === size ) return;
        page = page + 1;
    } 

    let start = (page -1) * perPage;
    let end = page * perPage;
    res.render('products/index', {
        products:products.slice(start, end),
        size: size,
        page: page
    });
}