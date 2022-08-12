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

  const userSchema = new Schema({
    username: String,
    age: Number
  })

  const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }   //https://mongoosejs.com/docs/populate.html
  })

  const User = mongoose.model('User', userSchema);
  const Tweet = mongoose.model('Tweet', tweetSchema);

  // const makeTweets = async () => {
  //   // const user = new User({ username: 'chickenfan99', age: 61 });
  //   const user = await User.findOne({ username: 'chickenfan99' });
  //   const tweet2 = new Tweet({ text: 'Burger, ice cream.Yummy!', likes: 80 });
  //   tweet2.user = user;
  //   tweet2.save();
  // }

  // makeTweets()

  const findTweet = async () => {
    // const t = await Tweet.findOne({}).populate('user', 'username'); // only give username,no others like age
    const t = await Tweet.find({}).populate('user'); 
    console.log(t);
  }

  findTweet();