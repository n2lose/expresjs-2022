const { db } = require('../models/session.model');
const SessionModel = require('../models/session.model');

module.exports.addToCart = async (req, res) => {
    let productId = req.params.productId;
    let sessionId = req.signedCookies.sessionId;

    if(!sessionId) {
        res.redirect('/products');
        return;
    }
    
    let foundCartSession = await SessionModel.findById({_id: sessionId});

    if(foundCartSession) {

        if(foundCartSession.cart.length > 0) {
            // check if productId exist to update instead if add new
            let productItem = foundCartSession.cart.find(productItem => productItem.productId === productId);
            if(productItem) {  // update count number of item only
                let count = productItem.count;
                
                SessionModel.findOneAndUpdate(sessionId, {
                    $set: { "cart.$[el].count": count + 1 }
                }, { 
                    arrayFilters: [{ "el.productId": productItem.productId }],
                    new: true
                  }, (error, success) => {
                    if(error) {
                        console.log("error ============= ", error);
                    } else {
                        console.log("success ============ ", success);
                    }
                });

            } else {
                let newCartObj = { // add new items in cart
                    productId : productId,
                    count: 1
                }

                SessionModel.findOneAndUpdate(sessionId, {
                    $push: { "cart": newCartObj }
                }, (error, success) => {
                    if(error) {
                        console.log("error ============= ", error);
                    } else {
                        console.log("success ============ ", success);
                    }
                });
            }
        } else {
            let newCartObj = {
                productId : productId,
                count: 1
            }
            SessionModel.findOneAndUpdate(sessionId, {
                $set: { cart: newCartObj }
            }, (error, success) => {
                if(error) {
                    console.log("error ============= ", error);
                } else {
                    console.log("success ============ ", success);
                }
            });
        }

    } else {
        res.render('error');
    }
   
    res.redirect('/products');
}