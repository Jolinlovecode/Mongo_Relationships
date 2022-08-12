const mongoose = require("mongoose");
const { Schema } = mongoose;  // const Schema = mongoose.Schema;

mongoose
  .connect("mongodb://localhost:27017/relationshipsDemo")
  .then(() => {
    console.log("MONGO CONNECTION OPEN!");
  })
  .catch((err) => {
    console.log("Error, MONGO CONNECTION!!");
    console.log(err);
  });

  const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
      type: String,
      enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
  });

  const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]   //https://mongoosejs.com/docs/populate.html
  })

  const Product = mongoose.model('Product', productSchema);
  const Farm = mongoose.model('Farm', farmSchema);

  // Product.insertMany([
  //   { name: 'Goddness Melon', price: 4.99, season: 'Summer'},
  //   { name: 'Sugar Baby Watermelon', price: 5.00, season: 'Summer'},
  //   { name: 'Asparagus', price: 3.99, season: 'Spring'}
  // ])

const makeFarm = async () => {
    const farm = new Farm({ name: 'Full Belly Farms', city: 'Guinda, CA'});
    const melon = await Product.findOne({ name: 'Goddness Melon'});
    farm.products.push(melon)
    await farm.save()
    console.log(farm);
}
// makeFarm();

const addProduct = async () => {
  const farm = await Farm.findOne({ name: 'Full Belly Farms' });
  const watermelon = await Product.findOne({ name: 'Sugar Baby Watermelon' });
  farm.products.push(watermelon);
  await farm.save();
  console.log(farm);
}
addProduct();

// Farm.findOne({ name: 'Full Belly Farms' })
//     .populate('products')
//     .then(farm => console.log(farm))