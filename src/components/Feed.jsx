'use client';
import { useState, useEffect } from "react";
import ItemCard from "./ItemCard";


const ItemCardList = ({items, handleTagClick})=>{
    return <div className="mt-16 prompt_layout">
        {items.map((item, index)=>{
            return <ItemCard key={`${index}_${item._id}`} 
                item={item} 
                handleTagClick={handleTagClick}/>
        })}
    </div>
}

const Feed = () =>{
    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [items, setItems] = useState([]);

    const filterResults = (searchText) => {
        const results = items.filter((item)=>{
            const reg = new RegExp(searchText, 'gi');
            return reg.test(item.name) || reg.test(item.content) || reg.test(item.tag);
        });
        return results;
    }
    const handleSearch = (e) =>{
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);
        setSearchTimeout(setTimeout(()=>{
            setSearchResults(filterResults(e.target.value));           
        }, 500));
    };
    // Load at the first time
    useEffect(()=>{
        const loadData = async () =>{
            const response = await fetch('/api/item', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setItems(data.items);
            setSearchResults(data.items);
        };

        loadData();
    }, []);
    // Render
    return(
        <section className="feed">
            <form className="relative w-full flex-center">
                <input type="text" 
                    className="search_input peer" 
                    placeholder="Search for items"
                    onChange={handleSearch}
                    value={searchText}
                    required/>
            </form>
            <ItemCardList
                items={searchResults}
                handleTagClick={()=>{}}
            />
        </section>
    )
}
export default Feed