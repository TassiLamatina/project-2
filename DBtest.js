const db = require('./models')
db.product.sync({force: true})

// async function addToCart() {
//     try {
//       // First, get a reference to a pet.
//       const [user, userCreated] = await db.user.findOrCreate({
//         where: {
//           userName: "Testuser",
//         }
//       })
//       // Second, get a reference to a toy.
//       const [product, productCreated] = await db.product.findOrCreate({
//         where: { 
//             name: "Test product", 
        
//          }
//       })
//       // Finally, use the "addModel" method to attach one model to another model.
//       await user.addProduct(product)
//       console.log(`${product.name} added to ${user.userName}.`);
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   addToCart()