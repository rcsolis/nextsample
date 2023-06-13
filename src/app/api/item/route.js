import { connectToDatabase } from "@utils/database";
import Item from "@models/Item";

export const POST = async (req) => {
    try{
        const { userid, title, content, tag } = await req.json();
        const date = new Date();
        await connectToDatabase();
        const newItem = new Item({
            user: userid,
            title,
            content,
            tag,
            createdAt: date,
        });
        await newItem.save();
        return new Response(JSON.stringify({
            message: "Item created successfully",
            item: newItem,
        }),{
            status: 201,
        });
    }catch(err){
        console.log("Error creating item: ", err);
        return new Response(JSON.stringify({
            message: err.message || "Error creating item",
            item: null,
        }),{
            status: 500,
        });
    }
};


export const GET = async (req) => {
    try{
        await connectToDatabase();
        const items = await Item.find().populate("user");
        return new Response(JSON.stringify({
            message: "Items fetched successfully",
            items,
        }),{
            status: 200,
        });
    }catch(err){
        console.log("Error getting items: ", err);
        return new Response(JSON.stringify({
            message: err.message || "Error getting items",
            item: null,
        }),{
            status: 500,
        });
    }
};