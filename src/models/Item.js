import {Schema, model, models} from "mongoose";


const ItemSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: [true, "Please provide a title"],
        maxlength: [40, "Title cannot be more than 40 characters"],
    },
    content: {
        type: String,
        required: [true, "Please provide content"],
        maxlength: [200, "Content cannot be more than 200 characters"],
    },
    tag: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Item = models.Item || model("Item", ItemSchema);

export default Item;