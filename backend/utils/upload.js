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
        // console.log("Deleting these files:", files);
      await Promise.all(
      files.map(file => {
        // console.log("Deleting fileId:", file.fileId);
        return imagekit.deleteFile(file.fileId);
      })
    );
    // console.log("Files deleted successfully");
  } catch (error) {
    console.error("Error deleting files from ImageKit:", error);
  }
};

module.exports = {uploadToImageKit,deleteFromImageKit}