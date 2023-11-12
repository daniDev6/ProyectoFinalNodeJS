import { v2 as cloudinary } from "cloudinary";
import { API_KEY_CLOUD, API_NAME_CLOUD, API_KEY_SECRET } from "../config.js";


cloudinary.config({
    cloud_name: API_NAME_CLOUD,
    api_key: API_KEY_CLOUD,
    api_secret: API_KEY_SECRET,
    secure: true//se comunique de forma segura
});




export async function uploadCasamientoPhoto(filePath) {
    return cloudinary.uploader.upload(filePath, {
        folder: "casamientos"
    })
}
export async function uploadCumplePhoto(filePath) {
    return cloudinary.uploader.upload(filePath, {
        folder: "cumpleanios"
    })
}

export async function uploadBabyPhoto(filePath) {
    return cloudinary.uploader.upload(filePath, {
        folder: "babyShawer"
    })
}
export async function uploadHomePhoto(filePath) {
    return cloudinary.uploader.upload(filePath, {
        folder: "home"
    })
}



export async function deleteCasamientoPhoto(public_id) {
    return await cloudinary.uploader.destroy(public_id)
}

export async function deleteCumplePhoto(public_id) {
    return await cloudinary.uploader.destroy(public_id)
}

export async function deleteBabyPhoto(public_id) {
    return await cloudinary.uploader.destroy(public_id)
}

export async function deletePhoto(public_id) {
    return await cloudinary.uploader.destroy(public_id)
}