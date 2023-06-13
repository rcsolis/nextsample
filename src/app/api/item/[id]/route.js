import { connectToDatabase } from "@utils/database";
import Item from "@models/Item";
// GET (read)
export const GET = async (req, {params}) => {
    try{
        const { id } = params;
        if(!id) throw new Error("No id provided");

        await connectToDatabase();
        const item = await Item.findById(id).populate("user");
        if(!item){
            return new Response(JSON.stringify({
                message: "Item not found",
                item:null,
            }),{
                status: 404,
            });
        }
        return new Response(JSON.stringify({
            message: "Item fetched successfully",
            item,
        }),{
            status: 200,
        });
    }catch(err){
        console.log("Error getting item: ", err);
        return new Response(JSON.stringify({
            message: err.message || "Error getting item",
            item: null,
        }),{
            status: 500,
        });
    }
};

// PATCH (update)
export const PATCH = async (req, { params }) => {
    try{
        const { id } = params;
        if(!id) throw new Error("No id provided");
        const { title, content, tag } = await req.json();
        await connectToDatabase();
        const item = await Item.findById(id);
        if(!item){
            return new Response(JSON.stringify({
                message: "Item not found",
                item:null,
            }),{
                status: 404,
            });
        }
        // Update item
        item.title = title || item.title;
        item.content = content || item.content;
        item.tag = tag || item.tag;
        await item.save();
        
        return new Response(JSON.stringify({
            message: "Items updated successfully",
            item,
        }),{
            status: 200,
        });
    }catch(err){
        console.log("Error updating item: ", err);
        return new Response(JSON.stringify({
            message: err.message || "Error updating item",
            item: null,
        }),{
            status: 500,
        });
    }
};

// DELETE (delete)
export const DELETE = async (req, { params }) => {
    try{
        const { id } = params;
        if(!id) throw new Error("No id provided");
        await connectToDatabase();
        await Item.findByIdAndRemove(id);
        // Delete item
        return new Response(JSON.stringify({
            message: "Item delete successfully",
            item: id,
        }),{
            status: 200,
        });
    }catch(err){
        console.log("Error deleting item: ", err);
        return new Response(JSON.stringify({
            message: err.message || "Error deleting item",
            item: null,
        }),{
            status: 500,
        });
    }
};