import { Link, useParams } from "react-router-dom"
import { deleteItem } from "../services/api";
import { FaClipboardList, FaTrash } from "react-icons/fa6";

export function WishCard({wish, onDelete }) {
    const {id} = useParams();

    console.log(wish)

const handleDelete = async () => {
    try {
      await deleteItem(id, wish.id);
      if (onDelete) {
        onDelete(wish.id);
      }
    } catch (error) {
      alert("Hubo un error al eliminar el ítem.", error);
    }
}
    

    return(
        <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-gray-200 bg-white aspect-square">
            
            
            

            <div className="relative h-1/2 w-full bg-cover bg-center flex-1 flex items-center justify-center">
                    {wish.image ? (
                        <img src={wish.image} alt={wish.title} className="w-full h-full object-cover" />
                        ) : (
                        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                            <FaClipboardList className="text-gray-300" size={40} />
                        </div>
                    )}

                        <button 
                            onClick={(e) => handleDelete(e, wish.id)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full z-10 hover:bg-red-600"
                            aria-label="Eliminar wishlist"
                        >
                             <FaTrash size={16} />
                        </button>

            </div>

            <div className="h-0.5 w-full bg-black"/>
            <Link to={`/wisheslist/${id}/wish/${wish.id}`}>
                <div key={wish.id} className="h-3/4 bg-gradient-to-b from-emerald-600 to-emerald-200 p-2 text-center text-sm  text-white ">
                    <h3 className="font-semibold text-2xl md:text-3xl break-words text-balance ">{wish.title}</h3>
                    <p className="text-black text-base">{wish.description}</p>
                    <p className="text-black text-base font-medium">Status: {wish.status}</p>
                </div>
                
            </Link>  
        </div>
           
      
       

    )
}