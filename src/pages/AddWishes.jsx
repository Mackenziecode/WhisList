import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addItem } from "../services/api";
import { useParams } from "react-router-dom";
import { ImageUploader } from "../components/CargarImagen";

export function AddWishes() {
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [price, setPrice] = useState("");
    const [priority, setPriority] = useState("");
    const [purchaseUrl, setPurchaseUrl] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const id = useParams()
    
    const newId = id.id
    
    const MIN_LENGTH = 20;
    const MAX_LENGTH = 200;

    const handleChange = (e) => {
    const valor = e.target.value;
    setDescription(valor);

    if (valor.length < MIN_LENGTH) {
      setError(`La descripción debe tener al menos ${MIN_LENGTH} caracteres.`);
    } else {
      setError('');
    }
    };

    const handleImageUploaded = (url) => {
        setImageUrl(url);
    };

    const navigate = useNavigate();

    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        //console.log("este es", id)//
        if (!title.trim()) {
            setError("El título es obligatorio");
            return;
        }
     
        
        setIsLoading(true);
        setError("");

        
        try {
            
            const item = {
                title: title,
                image: imageUrl || null,
                description: description,
                status: status,
                price: price,
                priority: priority,
                purchaseUrl: purchaseUrl
            }
            await addItem(newId, item)
            setSuccess(true);
            setTimeout(() => navigate(-1), 1000);

        } catch (err) {
            setError("Error al añadir producto. Inténtalo de nuevo.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-emerald-600 mb-6">Nuevo producto</h1>

            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 p-3 rounded mb-4">
                    ¡Añade tu nuevo deseo!...
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
                        Nombre del producto:
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500"
                        placeholder="Ej: Mi lista de deseos"
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

                <div className="mb-4">
                    <label 
                        htmlFor="description" 
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Descripcion:
                    </label>
                    <textarea
                        type="text"
                        rows="5"
                        id="description"
                        value={description}
                        onChange={handleChange}
                        className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 ${error ? 'border-red-500' : 'border-gray-300' }`}
                        placeholder="Ej: Este increible producto..."
                        maxLength={MAX_LENGTH}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label 
                        htmlFor="price" 
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Precio:
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label 
                        htmlFor="purchaseUrl" 
                        className="block text-gray-700 font-bold mb-2"
                    >
                        URL de compra:
                    </label>
                    <input
                        type="url"
                        id="purchaseUrl"
                        value={purchaseUrl}
                        onChange={(e) => setPurchaseUrl(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500"
                        placeholder="https://ejemplo.com/product"
                    />
                </div>

                <div className="mb-4">
                    <label 
                        htmlFor="status" 
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Estado:
                    </label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500"
                        required
                    >
                        <option value="" disabled>Seleccionar prioridad</option>
                        <option value="Available">Disponible</option>
                        <option value="To Order">Encargar</option>
                    </select>    
                </div>

                <div className="mb-4">
                    <label 
                        htmlFor="priority" 
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Priority:
                    </label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500"
                        required
                    >
                         <option value="" disabled>Seleccionar prioridad</option>
                         <option value="High">Alta</option>
                         <option value="Medium">Media</option>
                         <option value="Low">Baja</option>
                    </select>    
                </div>
                
                <button 
                    type="submit" 
                    className={`w-full bg-emerald-500 text-white font-bold py-2 px-4 rounded hover:bg-emerald-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Añadiendo...' : 'Añadir a la lista de deseos'}
                </button>
                
                <button 
                    type="button" 
                    onClick={() => navigate(-1)}
                    className="w-full mt-2 bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400"
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
} 