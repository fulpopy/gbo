const AWS = require("aws-sdk");
const S3 = require("../utils/configS3.js");

// dotenv.config();

AWS.config.update({
  accessKeyId: S3.ACCESS_KEY_ID,
  secretAccessKey: S3.SECRET_ACCESS_KEY,
  region: S3.REGION,
});

const s3 = new AWS.S3();

export const uploadImagesToS3 = async (imageFiles) => {
  const uploadedImageUrls = [];

  for (let file of imageFiles) {
    const params = {
      Bucket: S3.BUCKET,
      Key: `orders/${Date.now()}_${file.name}`, // Unique file key
      Body: file,
      ContentType: file.type,
    };

    try {
      const data = await s3.upload(params).promise();
      uploadedImageUrls.push(data.Location); // Add the S3 file URL to the array
    } catch (error) {
      console.error("Error uploading image to S3: ", error);
      return null;
    }
  }

  return uploadedImageUrls;
};
