import { Link, useNavigate, useParams } from "react-router-dom"
import { getWishlists } from "../services/api";
import { useState, useEffect } from "react";
export function WishCardDetails(){

    const navigate = useNavigate();
    const {id} = useParams();

    const [wish, setWish] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadWish = async() => {
            try {
                setLoading(true);
                const data = await getWishlists();
                //console.log(data)
                const allArticles = data.flatMap(deseo => deseo.items)
                const wishy = allArticles.find(item => item.id == id)
                setWish(wishy || {})
            } catch (err){
                //console.log(err)
            } finally {
                setLoading(false);
            }
        }
        loadWish();
    },[id])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (!wish || Object.keys(wish).length === 0) {
        return (
            <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-red-600">Wish not found</h2>
                <button onClick={()=>navigate(-1)} className="mt-4 bg-emerald-600 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-emerald-700">Go Back</button>
            </div>
        );
    }

    return(
        <div>
        <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto p-4 sm:p-6 gap-8 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-gray-200 rounded-2xl bg-gradient-to-b from-emerald-600 to-emerald-200">
            <div className="flex-1 flex flex-col gap-6 ">
            
                <div className="flex flex-col lg:flex-row gap-6 ">
                    <div className="flex-1 " >
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 mt-4 p-4 text-center text-white rounded-lg">{wish.title}</h1>
                        <p className="text-base sm:text-lg mb-4 bg-white border rounded-lg p-3"><span className="font-bold">Descripcion:</span> {wish.description}</p>
                        <p className="text-base sm:text-lg mb-4 bg-white border rounded-lg p-3"><span className="font-bold">Precio:</span> {wish.price ? `$${wish.price}` : 'No especificado'}</p>
                        <p className="text-base sm:text-lg mb-4 bg-white border rounded-lg p-3"><span className="font-bold">Prioridad:</span> {wish.priority || 'Normal'}</p>
                        <p className="text-base sm:text-lg mb-4 bg-white border rounded-lg p-3"><span className="font-bold">Estado:</span> {wish.status || 'Pendiente'}</p>
                        {wish.purchaseUrl && (
                            <p className="text-base sm:text-lg mb-4 bg-white border rounded-lg p-3">
                                <span className="font-bold">URL de la compra:</span> 
                                <a href={wish.purchaseUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2">
                                    {wish.purchaseUrl}
                                </a>
                            </p>
                        )}
                    </div>

                    <div className="flex-none w-full lg:w-1/2 h-64 sm:h-80 md:h-96 rounded-[20px] md:rounded-[20px] border border-gray-400 shadow-md bg-cover bg-center min-w-0" role="img"
                        style={{ backgroundImage: `url(${wish.image || "https://img.freepik.com/foto-gratis/arreglo-coleccion-estacionaria-moderna_23-2149309643.jpg?semt=ais_hybrid&w=740"})` }}>    
                    </div>
                    
                </div>
            </div>
        
        </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={()=>navigate(-1)} className="flex items-center gap-2 bg-white text-green-800 font-bold py-2 px-4 rounded-md shadow-md hover:bg-gray-100 transition-all transform hover:scale-105 mt-6">Volver</button>
                
                {wish.purchaseUrl ? (
                    <a 
                        href={wish.purchaseUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-red-500 transition-all transform hover:scale-105 mt-6"
                    >
                        !Comprar ahora¡
                    </a>
                ) : (
                    <button 
                        className="flex items-center gap-2 bg-gray-400 text-white font-bold py-2 px-4 rounded-md shadow-md cursor-not-allowed mt-6"
                        disabled
                    >
                        No hay enlace de compra disponible
                    </button>
                )}
            </div>
        </div>
    )
}