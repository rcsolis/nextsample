import ItemCard from "./ItemCard"


const ItemCardList = ({items, handleEdit, handleDelete})=>{
  return <div className="mt-10 prompt_layout">
      {items.map((item, index)=>{
        return <ItemCard key={`${index}_${item._id}`} 
          item={item}
          handleEdit={handleEdit}
          handleDelete={handleDelete} />
      })}
  </div>
}

const ProfileDetail = ({name, description, data, handleEdit, handleDelete}) =>{
  
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">
        {description}
      </p>
      <ItemCardList
        items={data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </section>
  )
}
export default ProfileDetail