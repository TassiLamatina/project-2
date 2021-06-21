const db = require('./models')
// db.user.create({ 
//   username:"Testing",
//   password:"senha"

// }).then(createdUser => {
//   console.log(createdUser)
//   process.exit()
// })
// db.products.findOrCreate({
//   where:{
//     name: "computer"
//   }
// }).then(([product, created])=> {
//   db.user.findOne()
//   .then(foundUser=> {
//     foundUser.createProduct(product)
//     console.log(product.userId)
//     process.exit()
//   })
// })

db.user.findOne()
.then(user =>{
  user.createProduct({
    name: "laptop"
  }).then(createdProduct =>{
    console.log(createdProduct)
  })
})