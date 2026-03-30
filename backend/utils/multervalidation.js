const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
const allowedVideoTypes = ["video/mp4", "video/mov"];

const FileFilter = (req, file, cb) => {
  if (file.fieldname === "images" || file.fieldname === "aadharImages") {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid image type"), false);
    }
  } 
  else if (file.fieldname === "videos") {
    if (allowedVideoTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid video type"), false);
    }
  } 
  else if (file.fieldname === "milkLabTestImg") {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid lab test image type"), false);
    }
  } 
  else {
    cb(null, false);
  }
};

module.exports = FileFilter