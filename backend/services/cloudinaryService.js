// services/cloudinaryService.js

import cloudinary from "../config/cloudinary.js";
import ApiError from "../utils/ApiError.js";
import { CLOUDINARY_FOLDERS } from "../constants/uploadConstants.js";

/**
 * Streams a memory buffer (from Multer) to Cloudinary without
 * writing to disk. resource_type "video" is Cloudinary's bucket for
 * audio/video assets — "auto" also works but "video" gives access
 * to duration metadata used below.
 */
const uploadBuffer = (buffer, { folder, resourceType = "auto" }) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });

const uploadAudio = async (buffer) => {
  try {
    const result = await uploadBuffer(buffer, {
      folder: CLOUDINARY_FOLDERS.AUDIO,
      resourceType: "video", // Cloudinary treats audio under "video"
    });
    return {
      url: result.secure_url,
      publicId: result.public_id,
      duration: Math.round(result.duration || 0),
      format: result.format,
      bytes: result.bytes,
    };
  } catch (error) {
    throw new ApiError(502, "Failed to upload audio file.");
  }
};

const uploadImage = async (buffer, folder = CLOUDINARY_FOLDERS.COVERS) => {
  try {
    const result = await uploadBuffer(buffer, { folder, resourceType: "image" });
    return { url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    throw new ApiError(502, "Failed to upload image.");
  }
};

const deleteAsset = async (publicId, resourceType = "video") => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to delete Cloudinary asset:", error.message);
  }
};

export default { uploadAudio, uploadImage, deleteAsset };
