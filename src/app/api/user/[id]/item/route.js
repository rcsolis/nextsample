import { connectToDatabase } from "@utils/database";
import Item from "@models/Item";

export const GET = async (req, {params}) => {
    try{
        const { id } = params;
        if(!id) throw new Error("No user id provided");

        await connectToDatabase();
        const items = await Item.find({
            user: id,
        }).populate("user");
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