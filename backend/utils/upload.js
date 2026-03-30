const imagekit = require("../config/imagekit");

const uploadToImageKit = async (file,folder = "/milzo") => {
  try {
    const response = await imagekit.upload({
      file: file.buffer, // multer buffer
      fileName: `${Date.now()}-${file.originalname}`,
      folder:folder
    });
    return {
    url: response.url,
    fileId: response.fileId
  };
  } catch (error) {
    console.error("ImageKit Upload Error:", error)
    throw new Error("Image and videos upload failed");
  }
};
const deleteFromImageKit = async (files) => {
  try {
    await Promise.all(
      files.map(file => imagekit.deleteFile(file.fileId))
    );
  } catch (error) {
    console.error("Error deleting files from ImageKit:", error);
  }
};

module.exports = deleteFromImageKit;

module.exports = {uploadToImageKit,deleteFromImageKit}