import { useState } from "react";
import { uploadImage } from "../services/cloudinaryService";

export function ImageUploader({onImageUploaded, onError}) {
   const [isUploading, setIsUploading] = useState(false);

   const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
        const url = await uploadImage(file);
        onImageUploaded(url);
    } catch (error) {
        console.error("Error uploading image:", error);
        if (onError) {
            onError("Error uploading image. Please try again.");
        }
    } finally {
        setIsUploading(false);
    }
   };

   return (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
            Image: 
        </label>
        <input 
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
        {isUploading && (
            <p className="mt-1 text-sm text-gray-500">Cargando...</p>
        )}
    </div>
   )
}
