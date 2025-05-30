import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWishlist } from "../services/api";
import { ImageUploader } from "../components/CargarImagen";

export function CreateWishlist() {
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    
    const navigate = useNavigate();
    
    const handleImageUploaded = (url) => {
        setImageUrl(url);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title.trim()) {
            setError("Título obligatorio");
            return;
        }
        
        setIsLoading(true);
        setError("");
        
        try {
            await createWishlist({
                title: title,
                image: imageUrl || null,
                items: [] 
            });
            
            setSuccess(true);
            setTimeout(() => navigate("/"), 1000);
            
        } catch (err) {
            setError("Error al crear la lista de deseos. Por favor, inténtelo de nuevo.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-emerald-600 mb-6">Crear nueva lista de deseos</h1>

            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 p-3 rounded mb-4">
                    ¡Lista de deseos creada con éxito! Redirigiendo...
                </div>
            )}
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
                <div className="mb-4">
                    <label 
                        htmlFor="title" 
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Título de la lista de deseos:
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500"
                        placeholder="E.g. Mi lista de deseos"
                        required
                    />
                </div>

                <ImageUploader 
                    onImageUploaded={handleImageUploaded} 
                    onError={setError} 
                />
                
                {imageUrl && (
                    <div className="mb-4">
                        <p className="text-sm text-green-600">Imagen cargada correctamente</p>
                    </div>
                )}
                
                <button 
                    type="submit" 
                    className={`w-full bg-emerald-500 text-white font-bold py-2 px-4 rounded hover:bg-emerald-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Creando...' : 'Crear lista de deseos'}
                </button>
                
                <button 
                    type="button" 
                    onClick={() => navigate("/")}
                    className="w-full mt-2 bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400"
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
} 