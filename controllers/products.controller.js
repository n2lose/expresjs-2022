const ProductModel = require('../models/product.model');
const PERPAGE = 9;

module.exports.index = async (req, res) => {
    const products = await ProductModel.find();

    let size = Math.ceil(products.length / PERPAGE);
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

    let start = (page -1) * PERPAGE;
    let end = page * PERPAGE;
    res.render('products/index', {
        products:products.slice(start, end),
        size: size,
        page: page,
        perPage: PERPAGE
    });
};

module.exports.search = async (req, res) => {
    let q = req.query.q;
    const products = await ProductModel.find();

    let matchedProducts = products.filter(product => product.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1);
    res.render('products/index', { 
        products: matchedProducts,
        perPage: PERPAGE
    });
};