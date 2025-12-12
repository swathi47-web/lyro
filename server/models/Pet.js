import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  breed: String,
  age: String,
  fee: String,
  gender: String,
  type: String,
  location: String,
  height: String,
  description: String,
  longDescription: String,
  image: String,
  isAdopted: {
    type: Boolean,
    default: false,
  }, // ✅ Add this field
});

export default mongoose.model('Pet', petSchema);













