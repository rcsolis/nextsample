'use client';
import { useState } from "react";
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";


const ItemCard = ({item, handleTagClick, handleEdit, handleDelete}) =>{
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  // Handle copy
  const handleCopy =() =>{
    setCopied(item.content);
    navigator.clipboard.writeText(item.content);
    setTimeout(()=>{
      setCopied("");
    }, 3000);
  }
  // Render
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start itemscenter gap-3 cursor-pointer">
          <Image 
            src={item.user.image}
            alt='user image'
            width={50}
            height={50}
            className="rounded-full object-contai" />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-800">{item.user.name}</h3>
            <p className="font-inter text-xs text-gray-500">{item.user.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied===item.content?
              '/assets/icons/tick.svg':'/assets/icons/copy.svg'}
            alt="copy"
            width={12}
            height={12}/>
        </div>
      </div>
      <p className="my-2 font-inter text-xs italic">
        {item.title}
      </p>
      <p className="mb-2 font-satoshi text-sm text-gray-700">
        {item.content}
      </p>
      <p className="font-inter text-xs blue_gradient cursor-pointer"
        onClick={()=> handleTagClick && handleTagClick(item.tag)}>
          #{item.tag}
      </p>
      {session?.user?.id === item.user._id &&
       pathName === "/profile" && (
        <div className="mt-3 flex gap-5 border-t border-black-100 p-3">
          <p className="font-inter text-sm green_gradient cursor-pointer"
            onClick={()=>handleEdit && handleEdit(item)}>
            Edit
          </p>
          <p className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={()=>handleDelete && handleDelete(item)}>
            Delete
          </p>
        </div>
       )}
    </div>
  )
}
export default ItemCard