const { uploadToImageKit } = require("./upload");

// helper: upload multiple files
const uploadFiles = async (files, folder, uploadedFiles) => {
  const results = [];
  for (let file of files) {
    const uploaded = await uploadToImageKit(file, folder);
    uploadedFiles.push(uploaded);
    results.push({
      url: uploaded.url,
      fileId: uploaded.fileId,
    });
  }
  return results;
};
// helper: parse existing media
const parseExisting = (existing, oldMedia) => {
  if (!existing) {
    return oldMedia.map((m) => m.url);
  }
  return JSON.parse(existing);
};
// helper: build final media
const buildMedia = (oldMedia, existingUrls, newMedia) => {
  return [
    ...oldMedia.filter((m) => existingUrls.includes(m.url)),
    ...newMedia,
  ];
};

module.exports = {uploadFiles,parseExisting,buildMedia}