const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { errorResponse } = require("../utils/response");

// This would use actual env vars in production
const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "dummy",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "dummy",
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME || "dummy-bucket",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, `uploads/${uuidv4()}${ext}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Basic extension check, magic bytes should be checked post-upload or via a separate stream
    if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images and PDFs are allowed."), false);
    }
  },
});

// Middleware to handle multer errors gracefully
const uploadMiddleware = (field) => {
  return (req, res, next) => {
    const uploadSingle = upload.single(field);
    uploadSingle(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return errorResponse(res, `Upload error: ${err.message}`, 400);
      } else if (err) {
        return errorResponse(res, err.message, 400);
      }
      next();
    });
  };
};

module.exports = { uploadMiddleware };
