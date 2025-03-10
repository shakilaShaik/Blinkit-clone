import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || 'default_cloud_name',
    api_key: process.env.CLOUD_API_KEY || 'default_api_key',
    api_secret: process.env.CLOUD_API_SECRET || 'default_api_secret'
})

const uploadImageCloudinary = async (image) => {
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())

    const uploadImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "Blinkit-clone" }, (error, uploadResult) => {

            return resolve(uploadResult);
        }).end(buffer)
    })

    return uploadImage
}

export default uploadImageCloudinary