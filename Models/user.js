const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/relationshipsDemo")
  .then(() => {
    console.log("MONGO CONNECTION OPEN!");
  })
  .catch((err) => {
    console.log("Error, MONGO CONNECTION!!");
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  addresses: [
    {
      _id: { id: false },
      street: String,
      city: String,
      state: String,
      country: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const makeUser = async () => {
  const u = new User({
    first: "Harry",
    last: "Potter",
  });
  u.addresses.push({
    street: "123 Sesame St.",
    city: "New York",
    state: "NY",
    country: "USA",
  });
  const res = await u.save();
  console.log(res);
};

const addAddress = async (id) => {
  const user = await User.findById(id);
  user.addresses.push({
    street: "99 3rd St.",
    city: "New York",
    state: "NY",
    country: "USA",
  });
  const res = await user.save();
  console.log(res);
};

// addAddress("62f54aa2a4aa088a0542d1a6")
// node Models/user.js
// {
//   _id: new ObjectId("62f54aa2a4aa088a0542d1a6"),
//   first: 'Harry',
//   last: 'Potter',
//   addresses: [
//     {
//       street: '123 Sesame St.',
//       city: 'New York',
//       state: 'NY',
//       country: 'USA'
//     },
//     {
//       street: '99 3rd St.',
//       city: 'New York',
//       state: 'NY',
//       country: 'USA'
//     }
//   ],
//   __v: 1
// }
