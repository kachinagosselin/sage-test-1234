/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Products              ->  index
 * POST    /api/Products              ->  create
 * GET     /api/Products/:id          ->  show
 * PUT     /api/Products/:id          ->  update
 * DELETE  /api/Products/:id          ->  destroy
 */

 'use strict';

 import _ from 'lodash';
 import Product from './product.model';

 function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
    .spread(updated => {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
      .then(() => {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Products
export function index(req, res) {
  Product.findAsync()
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Gets a single Product from the DB
export function show(req, res) {
  console.log("Show")
  Product.findByIdAsync(req.params.id)
  .then(handleEntityNotFound(res))
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Creates a new Product in the DB
export function create(req, res) {
  Product.createAsync(req.body)
  .then(respondWithResult(res, 201))
  .catch(handleError(res));
}

// Updates an existing Product in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Product.findByIdAsync(req.params.id)
  .then(handleEntityNotFound(res))
  .then(saveUpdates(req.body))
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Deletes a Product from the DB
export function destroy(req, res) {
  Product.findByIdAsync(req.params.id)
  .then(handleEntityNotFound(res))
  .then(removeEntity(res))
  .catch(handleError(res));
}

export function charge(req, res) {
// setup stripe with test API key
var stripe = require("stripe")(
  "sk_test_ML35uwZ12PGlbABvqi8kfc8T"
  );
console.log("Product ID:" + req.params.id)
Product.findByIdAsync(req.params.id)
.then(product => {
  if (!product) {
    return res.status(404).end();
  }
  console.log("Product:" + product)

  stripe.charges.create({
    amount: product.amount,
    currency: "usd",
    card: {
      number: '4242424242424242',
      exp_month: 12,
      exp_year: 2020,
      cvc: '123'
    },
    description: "Charge for test@example.com for purchasing " + product.name +""
  }).then(function(charge) {
    console.log("Charge created");
    console.log(charge);
  }, function(err) {
    console.log(err);
  });

})
.catch(handleError(res));

}

export function stripe(req, res) {
  Product.findByIdAsync(req.params.id)
  .then(respondWithResult(res))

  // const stripeToken = req.body.stripeToken;
  // const productID = parseInt(req.body.productID);
  // const productAmount = req.body.productAmount;
  // const userID = parseInt(req.user.id);
  // // validate product
  // return routeHelpers.validateProduct(productID, productAmount)
  // .then((product) => {
  //   // create charge
  //   const charge = {
  //     amount: productAmount,
  //     currency: product.currency,
  //     card: stripeToken
  //   };
  //   routeHelpers.createCharge(charge, productID, userID);
  // })
  // .then(() => {
  //   req.flash('messages', {
  //     status: 'success',
  //     value: `Thanks for purchasing a ${req.body.productName}!`
  //   });
  //   res.redirect('/products');
  // })
  .catch(handleError(res));
}