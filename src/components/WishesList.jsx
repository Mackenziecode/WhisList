import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { WishCard } from "./Carta";
import { getWishlistById } from "../services/api";
import { useState, useEffect } from "react";

export function WishesList() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [wishes, setWishes] = useState([]);

    useEffect(() => {
        async function loadWishes() {
            try {
                const data = await getWishlistById(id);
                setWishes(data.items);
            } catch (err) {
                console.error(err);
            }
        }
        
        if (id) {
            loadWishes();
        }
    }, [id]);

    const handleDelete = (id) => {
        setWishes(wishes.filter((wish) => wish.id !== id));
    }

    if (!id) {
        return <h3>No hay nada</h3>;
    }
    

    return(
        <div> 
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto my-12 px-2">
                {wishes.map((wish) => {
                    return(
                        <WishCard key={wish.id} wish={wish} onDelete={handleDelete}/>
                    )
                })}

                <Link to={`/wishlist/${id}/add-wishes`} className="flex flex-col items-center bg-white rounded-3xl shadow border border-gray-200 hover:shadow-xl group overflow-hidden aspect-square">
                <div className="flex-1 flex items-center justify-center w-full">
                    <span className="text-8xl text-gray-400 group-hover:text-emerald-500">+</span>
                </div>
                </Link>
                
            </div>
            <div className="w-full flex justify-center mt-6">
                <button 
                    onClick={() => navigate("/")} 
                    className="flex items-center gap-2 bg-white text-green-800 font-bold py-2 px-6 rounded-md shadow-md hover:bg-gray-100 transition-all transform hover:scale-105"
                >
                    Todas las categorias
                </button>
            </div>    
            
        </div>    
    )

}