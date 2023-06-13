'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProfileDetail from "@components/ProfileDetail";


const Profile = () =>{
    const { data: session } = useSession();
    const [items, setItems] = useState([]);
    const router = useRouter();

    const handleEdit = (item) => {
        router.push(`/item/update?id=${item._id}`);
    }
    const handleDelete = async (item) => {
        const hasConfirmed = confirm("Are you sure you want to delete this item?");
        if(hasConfirmed){
            try{
                const response = await fetch(`/api/item/${item._id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if(response.ok){
                    const data = await response.json();
                    setItems(items.filter((item) => item._id !== data.item));
                }
            }catch(err){
                console.log("Error deleting item: ", err);
                throw new Error(err);
            }
        }
    }

    // Load at the first time
    useEffect(()=>{
        const loadData = async () =>{
            const response = await fetch(`/api/user/${session?.user?.id}/item`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setItems(data.items);
        };

        if(session?.user?.id) loadData();
    }, []);
    // Render
    return (
        <ProfileDetail 
            name="My"
            description="Welcome to my profile page!"
            data={items}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}
export default Profile