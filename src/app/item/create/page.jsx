
'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";


const CreateItem = () =>{
    const {data:session} = useSession();
    const post= {
        title: "",
        content: "",
        tag:""
    };
    const router = useRouter();
    const createItem = async (data) => {
        try{
            const response = await fetch("/api/item", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userid: session.user.id,
                    title: data.title,
                    content: data.content,
                    tag: data.tag
                }),
            });

            if(response.ok){
                const data = await response.json();
                console.log("data: ", data);
                router.push("/");
            }
        }catch(err){
            console.log("Error creating item: ", err);
            throw new Error(err);
        }
    };
    // Render
    return (
        <Form 
            formTitle="Create Item"
            defaultValues={post}
            handleFormSubmit={createItem}
        />
    );
}
export default CreateItem
