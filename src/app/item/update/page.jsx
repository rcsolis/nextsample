
'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";


const UpdateItem = () =>{
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const itemId = searchParams.get("id");
    const [item, setItem] = useState({});

    useEffect(()=>{
        const getDetails = async () =>{
            const response = await fetch(`/api/item/${itemId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if(response.ok){
                const data = await response.json();
                setItem({
                    _id: data.item._id,
                    title: data.item.title,
                    content: data.item.content,
                    tag: data.item.tag
                });
                setLoading(false);
            }
        };

        if(itemId) getDetails();
    }, [itemId]);
    // Update handler
    const updateItem = async (data) => {
        try{
            const response = await fetch(`/api/item/${data._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: data.title,
                    content: data.content,
                    tag: data.tag
                }),
            });

            if(response.ok){
                const data = await response.json();
                router.push("/");
            }
        }catch(err){
            console.log("Error updating item: ", err);
            throw new Error(err);
        }
    };
    // Render
    if(!loading)
        return (
            <Form 
                formTitle="Update Item"
                defaultValues={item}
                handleFormSubmit={updateItem}
            />
        );
    else return <div>Loading...</div>
}
export default UpdateItem
