const mongoose = require('mongoose');
const plm =require('passport-local-mongoose');
mongoose.connect("mongodb://127.0.0.1/demo5");
const userSchema = mongoose.Schema({
  username : String,
  name:String,
  email:String,
  contact_number: Number,
  profile_pic: String
  
});
userSchema.plugin(plm);
module.exports  = mongoose.model("User",userSchema);
