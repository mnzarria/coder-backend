import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  thumbnails: { type: String, required: false },
  code: { type: String, required: true, unique: true },
  stock: { type: Number, required: true, default: 0 },
  category: { type: String, required: true },
  status: { type: String, default: "active" },
});

productsSchema.plugin(mongoosePaginate);
export const productsModel = mongoose.model("Products", productsSchema);
