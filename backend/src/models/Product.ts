import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  image: string;
  category: mongoose.Schema.Types.ObjectId; // Ensure this is ObjectId
  price: number;
  stockStatus: boolean;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true }, // Reference the Category model
  price: { type: Number, required: true },
  stockStatus: { type: Boolean, required: true },
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
