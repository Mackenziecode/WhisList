import axios from "axios";

const CLOUD_NAME = "dvbzyltiy"
const UPLOAD_PRESET = "TestTest"

export const uploadImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData);
        return response.data.url;
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        throw error;
    }
}
