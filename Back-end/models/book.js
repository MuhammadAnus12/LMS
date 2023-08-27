import { model,Schema } from "mongoose";

const bookSchema= new Schema({
    name: {type: String, require: true},
    isbn: {type: String, require: true, unique: true},
    category: {type: String, require: true},
    price: {type: Number, require: true},
    quantity: {type: Number, require: true},
    borrowedBy: {type: Schema.Types.ObjectId, ref: "users"},
    priceHistory: {type: Array, require: true, default: []},
    quantityHistory: {type: Array, require: true, default: []},

})
const Book = model("books",bookSchema)
export default Book