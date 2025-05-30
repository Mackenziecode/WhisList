import { Link } from "react-router-dom";
import { FaClipboardList, FaTrash } from "react-icons/fa";
import { deleteWishlist } from "../services/api";

export function WishesCategories({wishlists, onDelete}) {
    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            await deleteWishlist(id);
            onDelete(id);
        } catch (error) {
            console.error("Error al eliminar la wishlist:", error);
        }
    };
    
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto my-12 px-2">
            {wishlists.map((categories) => (
                <div key={categories.id} className="relative">
                    <button 
                        onClick={(e) => handleDelete(e, categories.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full z-10 hover:bg-red-600"
                        aria-label="Eliminar wishlist"
                    >
                        <FaTrash size={16} />
                    </button>
                    
                    <Link to={`/wisheslist/${categories.id}`} className="flex flex-col items-center bg-white rounded-3xl shadow border border-gray-200 hover:shadow-xl group overflow-hidden aspect-square">
                        <div className="flex-1 flex items-center justify-center w-full">
                            {categories.image ? (
                                <img src={categories.image} alt={categories.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                                    <FaClipboardList className="text-gray-300" size={40} />
                                </div>
                            )}
                        </div>
                        <div className="w-full border-b-4 border-black mb-2 group-hover:border-emerald-500"></div>
                        <h2 className="text-lg font-bold text-gray-800 text-center mb-4">{categories.title}</h2>
                    </Link>
                </div>
            ))}
            <Link to="/create-wishlist" className="flex flex-col items-center bg-white rounded-3xl shadow border border-gray-200 hover:shadow-xl group overflow-hidden aspect-square">
                <div className="flex-1 flex items-center justify-center w-full">
                    <span className="text-8xl text-gray-400 group-hover:text-emerald-500">+</span>
                </div>
            </Link>
        </div>
    );
}
