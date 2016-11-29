var stripe = require("stripe")(
  "sk_test_ML35uwZ12PGlbABvqi8kfc8T"
);

// function validateProduct(productID, productAmount) {
//   return new Promise((resolve, reject) => {
//     // (1) does the product exist?
//     return productQueries.getSingleProduct(productID)
//     .then((product) => {
//       if (!product) return reject('Product not found');
//       // (2) does the product amount align?
//       if (productAmount !== product.amount) {
//         return reject('Incorrect Product');
//       }
//       return resolve(product);
//     })
//     .catch((err) => {
//       return reject(err);
//     });
//   });
// }

function createCharge(charge, productID, userID) {
  // return new Promise((resolve, reject) => {
  //   stripe.charges.create(charge, (err, res) => {
  //     if (err) return reject(err);
  //     // create transaction
  //     transactionQueries.createTransaction(
  //       res.id, productID, userID, (err) => {
  //       if (err) return reject(err);
  //       return resolve();
  //     });
  //   });
  // });
}

module.exports = {
  createCharge
};
