import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true }, // Added image field
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
