import mongoose from 'mongoose';

// User Schema
const UserSchema = mongoose.Schema({
  name:{
    type: String,
    require: true,
  },
  email:{
    type: String,
    require: true,
  },
  username:{
    type: String,
    require: true,
  },
  password:{
    type: String,
    require: true,
  },
});

export default mongoose.model('user', UserSchema);
