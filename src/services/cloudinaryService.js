const CLOUD_NAME = "drdsehqgg";
const UPLOAD_PRESET = "portfolio_upload";

/**
 * Upload a single File to Cloudinary using an unsigned upload preset.
 * Returns the secure_url string on success.
 * @param {File} file
 * @returns {Promise<string>} secure_url
 */
export async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  // Cloudinary auto-detects the resource type from the file mime.
  // Using "auto" endpoint handles image / video / raw (PDF, etc.) in one call.
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || "Cloudinary upload failed");
  }

  const data = await response.json();
  return data.secure_url;
}

/**
 * Upload multiple Files concurrently.
 * @param {File[]} files
 * @returns {Promise<string[]>} array of secure_urls
 */
export async function uploadManyToCloudinary(files) {
  return Promise.all(files.map(uploadToCloudinary));
}